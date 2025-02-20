import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

interface CreatePostBody {
  title: string;
  content: string;
  category: string;
  slug: string;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      console.log("No session user ID:", session);
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Debug employee lookup
    const employee = await prisma.employee.findUnique({
      where: { id: session.user.id },
    });
    
    console.log("Found employee:", employee);
    console.log("Session user ID:", session.user.id);

    if (!employee) {
      return NextResponse.json(
        { error: `Invalid author ID: ${session.user.id}` },
        { status: 400 }
      );
    }

    const body: CreatePostBody = await req.json();
    console.log("Request body:", body);
    const { title, content, category, slug } = body;

    // Validate input
    if (!title?.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }
    if (!content?.trim()) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }
    if (!['news', 'events'].includes(category)) {
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
      );
    }

    // Create the post with verified author
    try {
      const post = await prisma.post.create({
        data: {
          title: title.trim(),
          content,
          category,
          slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          author: {
            connect: { 
              id: employee.id // Use employee.id to ensure correct format
            }
          }
        },
        include: {
          author: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });
      
      console.log("Created post:", post);
      return NextResponse.json(post);
    } catch (createError) {
      console.error("Post creation failed:", createError);
      return NextResponse.json(
        { error: `Post creation failed: ${createError.message}` },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Create post error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the employee exists first
    const employee = await prisma.employee.findUnique({
      where: { id: session.user.id }
    });

    if (!employee) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 });
    }

    // Then fetch posts
    const posts = await prisma.post.findMany({
      where: {
        authorId: employee.id // Use the verified employee ID
      },
      include: {
        author: {
          select: {
            id: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Return the results, ensuring we never send null
    return NextResponse.json(posts || []);

  } catch (error) {
    // Improved error logging
    const errorDetails = {
      name: error?.name || 'Unknown',
      message: error?.message || 'No message',
      stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    };
    
    console.error("GET posts error:", errorDetails);

    return NextResponse.json(
      { error: "Failed to fetch posts", details: errorDetails.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id, ...updateData } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    const post = await prisma.post.update({
      where: { id },
      data: updateData,
      include: {
        author: {
          select: {
            email: true,
          },
        },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Update post error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    await prisma.post.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Delete post error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

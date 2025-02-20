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
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body: CreatePostBody = await req.json();
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

    // Create the post
    const post = await prisma.post.create({
      data: {
        title: title.trim(),
        content,
        category,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        authorId: session.user.id,
      },
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
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Fetch posts error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: "Internal server error" },
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

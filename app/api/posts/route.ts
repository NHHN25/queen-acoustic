import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { title, content, category, slug } = await req.json();

  // Validate input
  if (!title || !content || !category || !slug) {
    return new NextResponse("Missing required fields", { status: 400 });
  }

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        category,
        slug,
        authorId: session.user.id,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.error('Create post error:', error);
    return new NextResponse("Error creating post", { status: 500 });
  }
}

export async function GET() {
  try {
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
    console.error('Fetch posts error:', error);
    return new NextResponse("Error fetching posts", { status: 500 });
  }
}

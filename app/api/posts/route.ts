import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/posts?governorate=Baghdad
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const governorate = searchParams.get('governorate');

    const where = governorate && governorate !== 'All'
      ? { governorate }
      : {};

    const posts = await prisma.post.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            governorate: true,
          },
        },
        likes: {
          select: {
            id: true,
            userId: true,
          },
        },
        comments: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50, // Limit to 50 most recent posts
    });

    // Transform the data to include counts
    const transformedPosts = posts.map(post => ({
      id: post.id,
      content: post.content,
      image: post.image,
      governorate: post.governorate,
      userId: post.userId,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      user: post.user,
      likesCount: post.likes.length,
      commentsCount: post.comments.length,
      likes: post.likes,
    }));

    return NextResponse.json(transformedPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST /api/posts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, image, governorate, userId } = body;

    // Validate required fields
    if (!content || !governorate || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields: content, governorate, and userId are required' },
        { status: 400 }
      );
    }

    // Create the post
    const post = await prisma.post.create({
      data: {
        content,
        image: image || null,
        governorate,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            governorate: true,
          },
        },
        likes: true,
        comments: true,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}

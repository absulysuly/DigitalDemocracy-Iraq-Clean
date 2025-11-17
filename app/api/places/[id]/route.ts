import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/places/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const place = await prisma.place.findUnique({
      where: { id },
    });

    if (!place) {
      return NextResponse.json(
        { error: 'Place not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(place);
  } catch (error) {
    console.error('Error fetching place:', error);
    return NextResponse.json(
      { error: 'Failed to fetch place' },
      { status: 500 }
    );
  }
}

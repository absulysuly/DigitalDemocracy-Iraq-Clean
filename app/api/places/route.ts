import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/places?governorate=Baghdad&category=Dining
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const governorate = searchParams.get('governorate');
    const category = searchParams.get('category');

    const where: any = {};

    if (governorate && governorate !== 'All') {
      where.governorate = governorate;
    }

    if (category && category !== 'All') {
      where.category = category;
    }

    const places = await prisma.place.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(places);
  } catch (error) {
    console.error('Error fetching places:', error);
    return NextResponse.json(
      { error: 'Failed to fetch places' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/events?governorate=Baghdad&category=Culture
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

    const events = await prisma.event.findMany({
      where,
      orderBy: {
        date: 'asc', // Show upcoming events first
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

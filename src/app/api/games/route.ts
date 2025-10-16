import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const trending = searchParams.get('trending');
    const limit = parseInt(searchParams.get('limit') || '10');

    let whereClause: any = {};
    
    if (category) {
      whereClause.category = category;
    }
    
    if (trending === 'true') {
      whereClause.isTrending = true;
    }

    const games = await prisma.game.findMany({
      where: whereClause,
      include: {
        categoryRef: true
      },
      orderBy: [
        { isTrending: 'desc' },
        { playerCount: 'desc' }
      ],
      take: limit
    });

    return NextResponse.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    return NextResponse.json({ error: 'Failed to fetch games' }, { status: 500 });
  }
}

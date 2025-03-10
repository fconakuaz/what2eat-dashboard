import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const activities = await prisma.activity.findMany({
      select: { id: true, name: true, includesSteps: true }
    });

    return NextResponse.json({ activities });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching activities' },
      { status: 500 }
    );
  }
}

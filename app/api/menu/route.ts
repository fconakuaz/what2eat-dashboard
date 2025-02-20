import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = await new URL(req.url);
    const userId = await searchParams.get('userId');
    const date = await searchParams.get('date');

    if (!userId || !date) {
      return NextResponse.json(
        { error: 'El userId y la fecha son obligatorios' },
        { status: 400 }
      );
    }

    const savedMenus = await prisma.savedMenu.findMany({
      where: {
        userId,
        date: new Date(date)
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!savedMenus.length) {
      return NextResponse.json(
        { message: 'No hay menús guardados para esta fecha' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, menus: savedMenus });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, date, breakfast, snack1, lunch, snack2, dinner } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'El ID del usuario es obligatorio' },
        { status: 400 }
      );
    }

    const newMenu = await prisma.savedMenu.create({
      data: {
        userId,
        date: new Date(date),
        breakfast,
        snack1,
        lunch,
        snack2,
        dinner
      }
    });

    return NextResponse.json({ success: true, menu: newMenu });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

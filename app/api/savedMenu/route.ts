import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = await new URL(req.url);
    const email = await searchParams.get('email');
    const date = await searchParams.get('date');

    if (!email || !date) {
      return NextResponse.json(
        { error: 'El email y la fecha son obligatorios' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true }
    });

    const savedMenus = await prisma.savedMenu.findMany({
      where: {
        userId: user?.id,
        date: new Date(date)
      },
      orderBy: {
        createdAt: 'asc'
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

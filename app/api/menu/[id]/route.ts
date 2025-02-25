import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = await params?.id;
  console.log('🚩🚩🚩 params 🚩🚩🚩');
  console.log(id);
  try {
    if (!id) {
      return NextResponse.json(
        { error: 'El ID del menú es obligatorio' },
        { status: 400 }
      );
    }

    const menu = await prisma.savedMenu.findUnique({
      where: { id }
    });

    if (!menu) {
      return NextResponse.json(
        { error: 'Menú no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, menu });
  } catch (error) {
    console.error('Error al obtener el menú:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

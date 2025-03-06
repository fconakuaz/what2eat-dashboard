import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Obtener el usuario actual
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // Alternar el estado (si está activo, se desactiva y viceversa)
    const newStatus = user.status === 'ACTIVE' ? 'BANNED' : 'ACTIVE';

    // Actualizar el usuario en la BD
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { status: newStatus }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error actualizando estado del usuario:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

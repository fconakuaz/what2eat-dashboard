import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 📌 POST: Guardar alimentos seleccionados
export async function POST(req: Request) {
  try {
    const { userId, foodIds } = await req.json();

    if (!userId || !foodIds.length) {
      return NextResponse.json(
        { error: 'userId y foodIds son requeridos' },
        { status: 400 }
      );
    }

    // Eliminar registros anteriores del usuario
    await prisma.includedFoodUser.deleteMany({
      where: { userId }
    });

    // Insertar nuevos registros
    const createdRecords = await prisma.includedFoodUser.createMany({
      data: foodIds.map((foodId: string) => ({
        userId,
        foodId
      }))
    });

    return NextResponse.json(
      { success: true, createdRecords },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error al guardar alimentos:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

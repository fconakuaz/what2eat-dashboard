import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST: Guardar alimentos seleccionados
export async function POST(req: Request) {
  try {
    const { userId, foodIds } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'userId es requerido' },
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

// GET: Obtener alimentos incluidos por userId
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'El userId es obligatorio' },
        { status: 400 }
      );
    }

    // Consultar los alimentos incluidos del usuario
    const includedFoods = await prisma.includedFoodUser.findMany({
      where: { userId },
      include: { food: true } // Incluir detalles del alimento
    });

    // Formatear respuesta
    return NextResponse.json({
      includeFoods: includedFoods.map(({ food }) => ({
        id: food.id,
        name: food.name
      }))
    });
  } catch (error) {
    console.error('Error al obtener alimentos incluidos:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

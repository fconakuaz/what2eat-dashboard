import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 📌 GET: Obtener lista de alimentos agrupados por categoría
export async function GET() {
  try {
    const foods = await prisma.food.findMany();

    // Agrupar alimentos por categoría
    const groupedFoods = foods.reduce(
      (acc, food) => {
        if (food.category === null) {
          return acc;
        }
        if (!acc[food.category]) {
          acc[food.category] = [];
        }
        acc[food.category].push({ id: food.id, name: food.name });
        return acc;
      },
      {} as Record<string, { id: string; name: string }[]>
    );

    return NextResponse.json({ foods: groupedFoods });
  } catch (error) {
    console.error('Error al obtener alimentos:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

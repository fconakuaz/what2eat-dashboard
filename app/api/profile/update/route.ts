import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      email,
      gender,
      birthDate,
      dietaryPreference,
      physicalActivity,
      metricUnit,
      height,
      weight,
      goal
    } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email es obligatorio' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          gender,
          birthDate,
          dietaryPreference,
          physicalActivity,
          metricUnit,
          height,
          weight,
          goal,
          updatedAt: new Date()
        }
      });

      return NextResponse.json({ success: true, updatedUser });
    } else {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('❌ Error en la API de update-profile:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

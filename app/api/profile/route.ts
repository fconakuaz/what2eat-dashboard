import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
    // include: { afflictions: true, healthIndicators: true }
  });

  console.log('🟢🟢🟢 user 🟢🟢🟢');
  console.log(user);

  if (!user) {
    return NextResponse.json(
      { error: 'Usuario no encontrado' },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}

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
    console.log('🔵🔵🔵 body 🔵🔵🔵');
    console.log(body);

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
          goal
        }
      });
      return NextResponse.json({ success: true, updatedUser });
    }
  } catch (error) {
    console.error('❌ Error en la API de update-profile:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

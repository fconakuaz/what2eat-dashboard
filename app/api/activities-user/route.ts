import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 📌 GET: Obtener registros de actividad
export async function GET() {
  try {
    const activities = await prisma.activityUser.findMany({
      include: { activity: true }, // 🔹 Incluir nombre de la actividad
      orderBy: { startDateTime: 'desc' }
    });

    return NextResponse.json({
      activities: activities.map((a) => ({
        id: a.id,
        date: a.startDateTime.toISOString().split('T')[0], // Formato YYYY-MM-DD
        activityId: a.activityId,
        activityName: a.activity.name, // 🔹 Nombre de la actividad
        steps: a.steps ?? null,
        caloriesBurned: a.caloriesBurned ?? null,
        distanceMeters: a.distanceMeters ?? null,
        activeMinutes: a.activeMinutes ?? null
      }))
    });
  } catch (error) {
    console.error('Error al obtener actividades:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// 📌 POST: Agregar un registro de actividad
export async function POST(req: Request) {
  try {
    // 📌 Verificar si el body es válido
    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        { error: 'El body de la solicitud está vacío' },
        { status: 400 }
      );
    }

    const {
      userId,
      activityId,
      date,
      steps,
      caloriesBurned,
      distanceMeters,
      activeMinutes
    } = body;

    // 📌 Validar datos requeridos
    if (!userId || !activityId || !date) {
      return NextResponse.json(
        { error: 'userId, activityId y date son requeridos' },
        { status: 400 }
      );
    }

    // 📌 Crear el registro en ActivityUser
    const activityUser = await prisma.activityUser.create({
      data: {
        userId,
        activityId,
        steps: steps ?? null,
        caloriesBurned: caloriesBurned ?? null,
        distanceMeters: distanceMeters ?? null,
        activeMinutes: activeMinutes ?? null,
        startDateTime: new Date(date)
      }
    });

    return NextResponse.json({ success: true, activityUser }, { status: 201 });
  } catch (error) {
    console.error('Error al agregar actividad:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

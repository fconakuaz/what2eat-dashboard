import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 📌 GET: Obtener registros de actividad

export async function GET() {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7); // 🔹 Obtener fecha hace 7 días

    const activities = await prisma.activityUser.findMany({
      where: {
        startDateTime: {
          gte: sevenDaysAgo // 🔹 Filtrar registros últimos 7 días
        }
      },
      include: { activity: true }, // 🔹 Incluir nombre de la actividad
      orderBy: { startDateTime: 'asc' }
    });

    // 🔹 Agrupar por fecha y sumar valores
    const groupedActivities = activities.reduce(
      (acc, activity) => {
        const date = activity.startDateTime.toISOString().split('T')[0]; // 🔹 Formato YYYY-MM-DD

        if (!acc[date]) {
          acc[date] = {
            date,
            activityId: activity.activityId,
            activityName: activity.activity.name,
            steps: 0,
            caloriesBurned: 0,
            distanceMeters: 0,
            activeMinutes: 0
          };
        }

        acc[date].steps += activity.steps ?? 0;
        acc[date].caloriesBurned += activity.caloriesBurned ?? 0;
        acc[date].distanceMeters += activity.distanceMeters ?? 0;
        acc[date].activeMinutes += activity.activeMinutes ?? 0;

        return acc;
      },
      {} as Record<
        string,
        {
          date: string;
          activityId: string;
          activityName: string;
          steps: number;
          caloriesBurned: number;
          distanceMeters: number;
          activeMinutes: number;
        }
      >
    );

    // 🔹 Convertir objeto en array ordenado
    const result = Object.values(groupedActivities).sort((a, b) =>
      a.date.localeCompare(b.date)
    );

    return NextResponse.json({ activities: result });
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

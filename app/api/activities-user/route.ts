import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Obtener registros de actividad

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const userId = searchParams.get('user')?.toString();

    if (!userId) {
      return NextResponse.json(
        { error: 'El user de la solicitud está vacío' },
        { status: 400 }
      );
    }

    const limit = 7;
    const offset = (page - 1) * limit;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Obtener todos los registros de los últimos 7 días
    const activities = await prisma.activityUser.findMany({
      where: { startDateTime: { gte: sevenDaysAgo }, userId },
      include: { activity: true, user: true },
      orderBy: { startDateTime: 'desc' }
    });

    //Agrupar por fecha y sumar valores
    const groupedActivities = activities.reduce(
      (acc, activity) => {
        const date = activity.startDateTime.toISOString().split('T')[0];

        if (!acc[date]) {
          acc[date] = {
            date,
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
          steps: number;
          caloriesBurned: number;
          distanceMeters: number;
          activeMinutes: number;
        }
      >
    );

    //Convertir objeto en array y paginar
    const result = Object.values(groupedActivities)
      .sort((a, b) => b.date.localeCompare(a.date)) // Orden descendente por fecha
      .slice(offset, offset + limit); // Aplicar paginación

    //Obtener total de páginas
    const totalPages = Math.ceil(Object.keys(groupedActivities).length / limit);

    const resp = {
      group: result,
      all: activities
    };

    return NextResponse.json({ activities: resp, totalPages });
  } catch (error) {
    console.error('Error al obtener actividades:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// POST: Agregar un registro de actividad
export async function POST(req: Request) {
  try {
    // Verificar si el body es válido
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
      startDateTime,
      steps,
      caloriesBurned,
      distanceMeters,
      activeMinutes
    } = body;

    // Validar datos requeridos
    if (!userId || !activityId || !startDateTime) {
      return NextResponse.json(
        { error: 'userId, activityId y date son requeridos' },
        { status: 400 }
      );
    }

    // Crear el registro en ActivityUser
    const activityUser = await prisma.activityUser.create({
      data: {
        userId,
        activityId,
        steps: steps ?? null,
        caloriesBurned: caloriesBurned ?? null,
        distanceMeters: distanceMeters ?? null,
        activeMinutes: activeMinutes ?? null,
        startDateTime: new Date(startDateTime)
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

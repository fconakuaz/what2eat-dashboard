import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Get all users

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = 5;

    const totalUsers = await prisma.user.count();
    const users = await prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, // Ocultar en frontend, pero necesario para actualizar
        name: true,
        image: true,
        email: true,
        role: true,
        country: true,
        createdAt: true,
        updatedAt: true,
        status: true
      }
    });

    return NextResponse.json({
      users,
      totalPages: Math.ceil(totalUsers / pageSize)
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Create a new user
export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      password,
      gender,
      country,
      physicalActivity,
      dietaryPreference
    } = await req.json();

    // Validate gender input
    const validGenders = ['MALE', 'FEMALE', 'OTHER'];
    if (!validGenders.includes(gender)) {
      return NextResponse.json({ error: 'Invalid gender' }, { status: 400 });
    }

    // Validate physical activity level
    const validActivityLevels = [
      'SEDENTARY',
      'LIGHT',
      'MODERATE',
      'ACTIVE',
      'VERY_ACTIVE'
    ];
    if (!validActivityLevels.includes(physicalActivity)) {
      return NextResponse.json(
        { error: 'Invalid physical activity level' },
        { status: 400 }
      );
    }

    // Validate dietary preference
    const validDietaryPreferences = [
      'VEGAN',
      'VEGETARIAN',
      'GLUTEN_FREE',
      'KETO',
      'PALEO',
      'HALAL',
      'KOSHER',
      'NONE'
    ];
    if (!validDietaryPreferences.includes(dietaryPreference)) {
      return NextResponse.json(
        { error: 'Invalid dietary preference' },
        { status: 400 }
      );
    }

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        image: 'placeholder-user.jpg',
        email,
        birthDate: new Date(),
        gender, // Must match enum values
        country,
        state: 'Veracruz',
        physicalActivity,
        dietaryPreference: dietaryPreference || 'NONE',
        status: 'ACTIVE', // Default user status
        role: 'USER' // Default user role
      }
    });

    // Create authentication record (password-based)
    const newAuth = await prisma.auth.create({
      data: {
        userId: newUser.id,
        authType: 'EMAIL',
        passwordHash: password, // Hash this before storing in production
        isVerified: false
      }
    });

    return NextResponse.json({ user: newUser, auth: newAuth });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

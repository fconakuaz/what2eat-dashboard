import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Get all users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: { Auth: true } // Includes authentication info if needed
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// Create a new user
export async function POST(req: Request) {
  try {
    const {
      firstName,
      lastName,
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
        firstName,
        lastName,
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

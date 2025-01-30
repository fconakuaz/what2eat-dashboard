import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Obtener todos los usuarios
export async function GET() {
  const usuarios = await prisma.usuario.findMany();
  return NextResponse.json(usuarios);
}

// Crear un nuevo usuario
export async function POST(req: Request) {
  const { nombre, apellido, email, passwordHash } = await req.json();

  const nuevoUsuario = await prisma.usuario.create({
    data: {
      nombre,
      apellido,
      email,
      passwordHash,
      fechaNacimiento: new Date(),
      genero: 'masculino',
      pais: 'México',
      estado: 'CDMX',
      actividadFisica: 3
    }
  });

  return NextResponse.json(nuevoUsuario);
}

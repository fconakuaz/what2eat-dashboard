import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.usuario.create({
    data: {
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan@example.com',
      passwordHash: 'hashed_password',
      fechaNacimiento: new Date('1985-06-15'),
      genero: 'masculino',
      pais: 'México',
      estado: 'CDMX',
      actividadFisica: 3
    }
  });

  console.log('✅ Seeder ejecutado con éxito');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

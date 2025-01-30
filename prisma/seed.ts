import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Ejecutando el seeder...');

  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash('passwordSeguro123', 10);

  // Crear usuario
  const usuario = await prisma.usuario.create({
    data: {
      nombre: 'Paco',
      apellido: 'López',
      email: 'paco@example.com',
      passwordHash: hashedPassword,
      fechaNacimiento: new Date('1982-03-15'),
      genero: 'Masculino',
      pais: 'México',
      estado: 'Veracruz',
      actividadFisica: 3, // Ejemplo: 1 = Sedentario, 2 = Moderado, 3 = Activo

      Padecimientos: {
        create: [
          { padecimiento: { create: { nombre: 'Diabetes' } } },
          { padecimiento: { create: { nombre: 'Hipertensión' } } }
        ]
      },
      AlimentosIncluir: {
        create: [
          { alimento: { create: { nombre: 'Tomate' } } },
          { alimento: { create: { nombre: 'Lechuga' } } }
        ]
      },
      AlimentosExcluir: {
        create: [
          { alimento: { create: { nombre: 'Gluten' } } },
          { alimento: { create: { nombre: 'Mariscos' } } }
        ]
      },
      Menus: {
        create: [
          {
            nombre: 'Menú Saludable',
            items: ''
          }
        ]
      },
      Indicadores: {
        create: [
          {
            peso: 110,
            altura: 180,
            imc: 0
          }
        ]
      }
    }
  });

  console.log('✅ Usuario creado:', usuario);
}

main()
  .catch((error) => {
    console.error('❌ Error al ejecutar el seeder:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

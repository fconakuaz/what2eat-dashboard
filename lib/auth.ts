import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user }) {
      try {
        if (!user.email) throw new Error('Google no proporcionó un email');

        let existingUser = await prisma.user.findUnique({
          where: { email: user.email }
        });

        if (existingUser?.status === 'BANNED') {
          throw new Error('User banned');
          return false;
        }

        if (!existingUser && user.name) {
          existingUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name ?? 'Usuario sin nombre',
              image: user.image ?? 'placeholder-user.jpg'
            }
          });
          await prisma.auth.create({
            data: {
              userId: existingUser.id,
              authType: 'GOOGLE',
              googleId: user.id,
              isVerified: true
            }
          });
        } else {
          await prisma.auth.update({
            where: { userId: existingUser?.id },
            data: {
              googleId: user.id,
              updatedAt: new Date()
            }
          });
        }
        return true;
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        return false;
      }
    }
  }
});

import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string
    })
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        if (!user.email) throw new Error('Google no proporcionó un email');

        let existingUser = await prisma.user.findUnique({
          where: { email: user.email }
        });

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
    },
    async session({ session, token }) {
      if (session?.user && token.email) {
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    }
  },
  pages: {
    signIn: '/login'
  }
});

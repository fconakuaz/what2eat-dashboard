import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (session?.user && token.email) {
        session.user.email = token.email;
        session.user.name = token.name; // Aseguramos que nombre y email estén presentes
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
    signIn: '/login' // Redirige al login si no está autenticado
  }
});

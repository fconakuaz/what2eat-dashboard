import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from 'next-auth/react';
import SessionSync from './components/auth/SessionSync';

export const metadata = {
  title: 'What2Eat',
  description: 'Eat Smart'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen w-full flex-col">
        <SessionProvider>
          {' '}
          {/* ✅ Envolvemos con SessionProvider de NextAuth */}
          <SessionSync />{' '}
          {/* 🔹 Componente que sincroniza la sesión con Zustand */}
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
      <Analytics />
    </html>
  );
}

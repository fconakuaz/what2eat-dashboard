import './calendar.css';
import '@mantine/dates/styles.css';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from 'next-auth/react';
import SessionSync from './components/auth/SessionSync';

export const metadata = {
  title: 'What2Eat - Eat Smart',
  description:
    'Crea menús personalizados con IA generativa con los alimentos que más te gusten y necesitas.',
  facebook: {
    appId: '1260364538842027'
  },
  openGraph: {
    title: 'What2Eat - Eat Smart',
    description:
      'Crea menús personalizados con IA generativa con los alimentos que más te gusten y necesitas',
    url: 'https://what2eat-dashboard.vercel.app',
    siteName: 'What2Eat',
    images: [
      {
        url: 'https://what2eat-dashboard.vercel.app/dashboard.webp',
        width: 1200,
        height: 630,
        alt: 'Imagen promocional de What2Eat'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tuusuario',
    title: 'What2Eat - Eat Smart',
    description:
      'Crea menús personalizados con IA generativa con los alimentos que más te gusten y necesitas',
    images: ['https://what2eat-dashboard.vercel.app/dashboard.webp']
  }
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
          <SessionSync />
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
      <Analytics />
    </html>
  );
}

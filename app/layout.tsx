import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from 'next-auth/react';
import SessionSync from './components/auth/SessionSync';

export const metadata = {
  title: '🍎 What2Eat',
  description: 'Eat Smart',
  openGraph: {
    title: '🍎 What2Eat',
    description: 'Eat Smart',
    url: 'https://what2eat-dashboard.vercel.app',
    siteName: 'What2Eat',
    images: [
      {
        url: 'https://tuwebapp.com/dashboard.webp',
        width: 1200,
        height: 630,
        alt: 'Imagen promocional de What2Eat'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@fco_naku',
    title: '🍎 What2Eat',
    description: 'Eat Smart',
    images: ['https://tuwebapp.com/dashboard.webp']
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

import './globals.css';

import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'What2Eat',
  description: 'Eat Smart'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen w-full flex-col">{children}</body>
      <Analytics />
    </html>
  );
}

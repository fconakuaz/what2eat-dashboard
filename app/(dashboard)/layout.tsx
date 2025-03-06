import { Analytics } from '@vercel/analytics/react';
import { User } from './user';
import Providers from './providers';
import { SearchInput } from './search';
import { ToggleTheme } from './toggle-theme';
import { ToggleLanguage } from 'app/components/header/ToggleLanguage';
import { DesktopNav } from 'app/components/layout/DesktopNav';
import { MobileNav } from 'app/components/layout/MobileNav';
import { useProfileStore } from 'app/store/profileStore';
import { auth } from '@/lib/auth';

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log('🚩🚩🚩 session 🚩🚩🚩');
  console.log(session);
  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        {session && <DesktopNav />}
        <div
          className={`flex flex-col sm:gap-4 sm:py-4 pl-0 ${session?.user ? 'sm:pl-14' : 'sm:pl-0'}`}
        >
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileNav />
            <h1 className="text-xl sm:text-2xl  ">
              What<span className="font-normal">2</span>
              Eat
            </h1>
            <SearchInput />
            <ToggleTheme />
            <ToggleLanguage />
            {session && <User />}
          </header>
          <main className="min-h-auto grid flex-1 items-start gap-2 p-1 sm:px-2 sm:py-0 md:gap-4 ">
            {children}
          </main>
        </div>
        <Analytics />
      </main>
    </Providers>
  );
}

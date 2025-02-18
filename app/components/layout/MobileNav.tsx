'use client';
import { FC } from 'react';
import Link from 'next/link';
import {
  NotebookPen,
  LineChart,
  PanelLeft,
  Settings,
  CalendarCheck2
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useProfileStore } from 'app/store/profileStore';

export const MobileNav: FC = (): any => {
  const { profile } = useProfileStore();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          style={{ display: !profile?.userActive ? 'none' : '' }}
          size="icon"
          variant="outline"
          className="sm:hidden"
        >
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="http://localhost:3000"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-transparent text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            {/* <VercelLogo className="h-3 w-3 transition-all group-hover:scale-110" /> */}
            <img src="apple-touch-icon.png" alt="logo" />
            <span className="sr-only">What2Eat</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-4 px-2.5 text-foreground"
          >
            <NotebookPen className="h-5 w-5" />
            Menú diario
          </Link>
          <Link
            href="/history"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <CalendarCheck2 className="h-5 w-5" />
            Historial
          </Link>
          <Link
            href="/stats"
            className="flex items-center gap-4 px-2.5  text-muted-foreground hover:text-foreground"
          >
            <LineChart className="h-5 w-5" />
            Estadísticas
          </Link>

          <Link
            href="/settings"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Settings className="h-5 w-5" />
            Configuración
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

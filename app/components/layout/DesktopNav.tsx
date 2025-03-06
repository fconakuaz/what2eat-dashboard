'use client';
import { NavItem } from 'app/(dashboard)/nav-item';
import {
  Activity,
  ActivityIcon,
  CalendarCheck2,
  LineChart,
  NotebookPen,
  Settings,
  Users,
  Weight,
  WeightIcon
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import Link from 'next/link';
import { FC } from 'react';
import { useProfileStore } from 'app/store/profileStore';

export const DesktopNav: FC = (): any => {
  const { profile } = useProfileStore();
  const { role } = profile;

  return (
    <aside
      // style={{ display: !profile?.userActive ? 'none' : 'block' }}
      className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex"
    >
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="http://localhost:3000"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-transparent text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          {/* <VercelLogo className="h-3 w-3 transition-all group-hover:scale-110" /> */}
          <img src="/apple-touch-icon.png" alt="logo" />
          <span className="sr-only">What2Eat</span>
        </Link>

        <NavItem href="/" label="Dashboard">
          <NotebookPen className="h-5 w-5" />
        </NavItem>

        <NavItem href="/history" label="Historial">
          <CalendarCheck2 className="h-5 w-5" />
        </NavItem>

        <NavItem href="/stats" label="Estadísticas">
          <LineChart className="h-5 w-5" />
        </NavItem>

        <NavItem href="/activity" label="Actividad física">
          <ActivityIcon className="h-5 w-5" />
        </NavItem>

        {role === 'ADMIN' && (
          <NavItem href="/users" label="Usuarios">
            <Users className="h-5 w-5" />
          </NavItem>
        )}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/settings"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};

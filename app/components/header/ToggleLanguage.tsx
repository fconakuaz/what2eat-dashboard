'use client';
import { Loader } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useLanguageStore } from 'app/store/languajeStore';
import { useEffect, useState } from 'react';

export function ToggleLanguage() {
  const [hydrated, setHydrated] = useState(false);
  const locale = useLanguageStore((state) => state.locale);
  const setLocale = useLanguageStore((state) => state.setLocale);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <form className="r-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="">
              <Loader className="animate-spin h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </form>
    );
  }

  return (
    <form className="r-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="">
            <span className="uppercase font-normal">{locale}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setLocale('en')}>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLocale('es')}>
            Español
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </form>
  );
}

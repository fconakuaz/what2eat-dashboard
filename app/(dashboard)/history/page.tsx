import { Info } from 'lucide-react';

import { CalendarHistory } from '@/components/calendarHistory';

export default async function HistoryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="w-full h-16 p-4 text-2xl text-center md:text-left">
        📆 Mis menús guardados
      </header>

      <div className="flex flex-1 md:flex-row gap-4 pt-2 flex-col  ">
        {/* LEFT */}
        <div className="flex h-full items-start justify-center p-0">
          <CalendarHistory />
        </div>

        {/* RIGHT */}
        <div className="md:w-3/4  w-full rounded-lg p-4 border">
          {' '}
          <div className="flex h-full w-full items-start justify-start p-6">
            <p className="text-muted-foreground flex flex-row">
              <Info size={25} className="mr-2" /> Haz clic en una día del
              calendario para mostrar el menú de ese día...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

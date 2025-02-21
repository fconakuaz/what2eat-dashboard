import { Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable';
import { CalendarHistory } from '@/components/calendarHistory';

export default async function HistoryPage(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  // const { products, newOffset, totalProducts } = await getProducts(
  //   search,
  //   Number(offset)
  // );
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[calc(100vh-88px)]  rounded-lg border md:min-w-[450px]"
    >
      <ResizablePanel defaultSize={25} minSize={18}>
        <div className="flex h-full items-start justify-center p-0">
          <CalendarHistory />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full w-full items-start justify-center p-6">
          <p className="text-muted-foreground">
            <Info className="mb-2" /> Haz clic en 'Crear menú del día' para
            mostrar el menú de hoy...
          </p>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

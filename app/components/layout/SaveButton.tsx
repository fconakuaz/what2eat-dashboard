import { Button } from '@/components/ui/button';
import { useMenuStore } from 'app/store/menuStore';
import { Bookmark } from 'lucide-react';

export default function SaveButton() {
  const { idMenu, breakfast, saving, saveDailyMenu } = useMenuStore();

  if (breakfast === null) {
    return;
  }

  return (
    <Button
      size="sm"
      data-testid="save-menu-button"
      variant={idMenu === null ? 'secondary' : 'ghost'}
      className="h-8 gap-1 ml-4"
      onClick={() => saveDailyMenu()}
      disabled={idMenu !== null}
    >
      <Bookmark className="h-4 w-4" />
      <span className="sm:not-sr-only sm:whitespace-nowrap">
        {saving
          ? 'Guardando...'
          : idMenu === null
            ? 'Guardar '
            : 'Menú guardado'}
      </span>
    </Button>
  );
}

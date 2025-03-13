import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { useIsMobile } from '@/components/hooks/use-mobile';
import { FC, useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Check, Plus } from 'lucide-react';
import { useFoodStore } from 'app/store/foodUserStore';
import { Ingredient, useIncludeFoodStore } from 'app/store/includeFoodStore';
import { useTranslations } from 'next-intl';

interface Props {
  data: any;
  typeDrawer: string;
}

export const DrawerFoodSelection: FC<Props> = ({ data, typeDrawer }) => {
  const isMobile = useIsMobile();
  const { foods, fetchFoods, saveSelectedFoods } = useFoodStore();
  const { toggleIncludeFoodSelection } = useIncludeFoodStore();
  const t = useTranslations('Food');

  const [open, setOpen] = useState(false); // Estado para abrir/cerrar el modal o drawer

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleSave = () => {
    saveSelectedFoods();
    setOpen(false); // Cierra el modal o drawer después de guardar
  };

  const handleFoodSelection = (food: Ingredient) => {
    if (typeDrawer === 'include') {
      toggleIncludeFoodSelection(food);
    }
  };

  const content = (
    <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
      {Object.entries(foods).map(([category, items]) => (
        <div key={category}>
          <h3 className="font-semibold text-xl mb-3"> {t(category)}</h3>
          <div className="flex flex-wrap gap-2 mb-12 pt-1">
            {items.map((food) => {
              const isSelected = data.some(
                (f: { id: string; state: boolean }) =>
                  f.id === food.id && f.state === true
              );
              return (
                <Badge
                  key={food.id}
                  variant={isSelected ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => handleFoodSelection(food)}
                >
                  {isSelected ? (
                    <Check className="w-3 h-3 mr-1" />
                  ) : (
                    <Plus className="w-3 h-3 mr-1" />
                  )}
                  {t(food.name)}
                </Badge>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setOpen(true)}>
            <Plus className="w-3 h-3 mr-0" /> Agregar
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Seleccionar Alimentos</DialogTitle>
          </DialogHeader>
          {content}
          <Button onClick={handleSave} className="mt-4">
            Guardar Selección
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          <Plus className="w-3 h-3 mr-0" /> Agregar
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-3">
        <DrawerHeader>
          <DrawerTitle>Seleccionar Alimentos</DrawerTitle>
        </DrawerHeader>
        {content}
        <Button onClick={handleSave} className="mt-4">
          Guardar Selección
        </Button>
      </DrawerContent>
    </Drawer>
  );
};

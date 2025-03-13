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
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { useIsMobile } from '@/components/hooks/use-mobile';
import { useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Check, Plus } from 'lucide-react';
import { useIncludeFoodStore } from 'app/store/foodUserStore';

export const DrawerFoodSelection = () => {
  const isMobile = useIsMobile();
  const {
    foods,
    selectedFoods,
    fetchFoods,
    toggleFoodSelection,
    saveSelectedFoods
  } = useIncludeFoodStore();

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleSave = () => {
    saveSelectedFoods();
  };

  const content = (
    <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
      {Object.entries(foods).map(([category, items]) => (
        <div key={category}>
          <h3 className="font-semibold text-md mb-2">{category}</h3>
          <div className="flex flex-wrap gap-2">
            {items.map((food) => {
              const isSelected = selectedFoods.some((f) => f.id === food.id);
              return (
                <Badge
                  key={food.id}
                  variant={isSelected ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleFoodSelection(food)}
                >
                  {isSelected ? (
                    <Check className="w-3 h-3 mr-1" />
                  ) : (
                    <Plus className="w-3 h-3 mr-1" />
                  )}
                  {food.name}
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
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
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
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
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

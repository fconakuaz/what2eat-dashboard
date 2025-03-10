import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { useIsMobile } from '@/components/hooks/use-mobile';
import { useState } from 'react';
import { Asterisk } from '../common/Asterisk';
import { ProfileForm } from './ProfileForm';
import { Dumbbell } from 'lucide-react';

export const DrawerActivity = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className={`h-8 gap-1  `}>
            <Dumbbell className={`h-3.5 w-3.5`} />
            <span className={`sm:not-sr-only sm:whitespace-nowrap`}>
              Agregar actividad
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar actividad</DialogTitle>
            <DialogDescription>
              Ingresa la información de tu actividad, los campos son
              obligatorios están marcados con un (*).
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="sm" className={`h-8 gap-1  `}>
          <Dumbbell className={`h-3.5 w-3.5`} />
          <span className={`sm:not-sr-only sm:whitespace-nowrap`}>
            Agregar actividad
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-3">
        <DrawerHeader className="text-left my-5">
          <DrawerTitle>Agregar actividad</DrawerTitle>
          <DrawerDescription>
            Ingresa la información de tu actividad, los campos son obligatorios
            están marcados con un (<Asterisk />)
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

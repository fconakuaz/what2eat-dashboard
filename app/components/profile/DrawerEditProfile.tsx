import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Asterisk } from '../common/Asterisk';
import { Edit2Icon } from 'lucide-react';
import { useActivityStore } from 'app/store/activityStore';
import { FormEditProfile } from './FormEditProfile';
import { useTranslations } from 'next-intl';
import { DialogClose } from '@radix-ui/react-dialog';

export const DrawerEditProfile = () => {
  const { open, setOpen } = useActivityStore();
  const isMobile = useIsMobile();
  const tc = useTranslations('Common');

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Edit2Icon className="w-3 h-3 mr-2" /> {tc('Edit')}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar perfil</DialogTitle>
            <DialogDescription>
              Modifique la información necesaria de su perfil, los campos son
              obligatorios están marcados con un (<Asterisk />)
            </DialogDescription>
          </DialogHeader>
          <FormEditProfile />
          <DialogFooter className="pt-2">
            <DialogClose asChild>
              <Button variant="outline" className="w-full">
                Cancelar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Edit2Icon className="w-3 h-3 mr-2" /> {tc('Edit')}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-3">
        <DrawerHeader className="text-left my-5">
          <DrawerTitle>Editar perfil</DrawerTitle>
          <DrawerDescription>
            Modifique la información necesaria de su perfil, los campos son
            obligatorios están marcados con un (<Asterisk />)
          </DrawerDescription>
        </DrawerHeader>
        <FormEditProfile className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

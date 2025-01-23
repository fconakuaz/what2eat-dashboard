import {
  ContactRound,
  Cross,
  Dumbbell,
  Edit2Icon,
  PersonStanding,
  Ruler,
  Salad,
  Weight
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Asegúrate de tener este componente disponible.
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { MyProperty } from './MyProperty';

type CardProps = React.ComponentProps<typeof Card>;

export function MyPreferences({ className, ...props }: CardProps) {
  return (
    <Card className={cn('w-full', className)} {...props}>
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="flex items-center space-x-2">
          <Avatar className="w-11 h-11">
            <AvatarImage src="placeholder-user.jpg" alt="User Avatar" />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none text-muted-foreground">
              Francisco Nakú
            </p>
            <p className="text-sm font-medium leading-none text-muted-foreground">
              Acosta Zárate
            </p>
          </div>
        </div>
        <div className="flex items-center  ">
          <Button variant="outline">
            <Edit2Icon className="w-3 h-3 mr-2" /> Editar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="gap-1">
        <MyProperty
          icon={<Ruler className="h-4 w-4 text-sky-500 mr-2" />}
          name="Altura"
          value="1.78 m"
        />
        <MyProperty
          icon={<Weight className="h-4 w-4 text-sky-500 mr-2" />}
          name="Peso"
          value="107 kg"
        />
        <MyProperty
          icon={<ContactRound className="h-4 w-4 text-sky-500 mr-2" />}
          name="Edad"
          value="41 años"
        />
        <MyProperty
          icon={<PersonStanding className="h-4 w-4 text-sky-500 mr-2" />}
          name="Género"
          value="Masculino"
        />
        <MyProperty
          icon={<Salad className="h-4 w-4 text-sky-500 mr-2" />}
          name="Alimentación"
          value="Omnívora"
        />
        <MyProperty
          icon={<Dumbbell className="h-4 w-4 text-sky-500 mr-2" />}
          name="Programa"
          value="Bajar de peso"
        />
        <MyProperty
          icon={<Cross className="h-4 w-4 text-sky-500 mr-2" />}
          name="Padecimientos"
          value="Diabetes y Colesterol."
        />
      </CardContent>
    </Card>
  );
}

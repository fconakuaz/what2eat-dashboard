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
import { cn, convertCmToMeters, convertKgToString } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MyProperty } from './MyProperty';
import { useProfileStore } from 'app/store/profileStore';
import { useTranslations } from 'next-intl';
import { useAuthStore } from 'app/store/authStore';

type CardProps = React.ComponentProps<typeof Card>;

export function MyPreferences({ className, ...props }: CardProps) {
  const tp = useTranslations('Profile');
  const tc = useTranslations('Common');

  const { profile } = useProfileStore();
  const { user } = useAuthStore();

  const classNameIcon = 'h-4 w-4 text-sky-500 mr-2';
  const {
    image,
    firstName,
    lastName,
    age,
    country,
    gender,
    physicalActivity,
    state
    // height,
    // weight
  } = profile;
  return (
    <Card className={cn('w-full', className)} {...props}>
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="flex items-center space-x-2">
          <Avatar className="w-11 h-11">
            <AvatarImage src={user?.image} alt="User Avatar" />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none text-muted-foreground">
              {user?.name}
            </p>
          </div>
        </div>
        <div className="flex items-center  ">
          <Button variant="outline">
            <Edit2Icon className="w-3 h-3 mr-2" /> {tc('Edit')}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="gap-1">
        <MyProperty
          icon={<Ruler className={classNameIcon} />}
          name="Altura"
          value={convertCmToMeters(178)} //"1.78 m"
        />
        <MyProperty
          icon={<Weight className={classNameIcon} />}
          name="Peso"
          value={convertKgToString(107)}
        />
        <MyProperty
          icon={<ContactRound className={classNameIcon} />}
          name="Edad"
          value={`${age} ${tp('age')}`}
        />
        <MyProperty
          icon={<PersonStanding className={classNameIcon} />}
          name="Género"
          value="Masculino"
        />
        <MyProperty
          icon={<Salad className={classNameIcon} />}
          name="Alimentación"
          value="Omnívora"
        />
        <MyProperty
          icon={<Dumbbell className={classNameIcon} />}
          name="Programa"
          value="Bajar de peso"
        />
        <MyProperty
          icon={<Cross className={classNameIcon} />}
          name="Padecimientos"
          value="Diabetes y Colesterol."
        />
      </CardContent>
    </Card>
  );
}

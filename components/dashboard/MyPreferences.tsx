import {
  ContactRound,
  Cross,
  Dumbbell,
  Edit2Icon,
  Goal,
  PersonStanding,
  Ruler,
  Salad,
  Weight
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn, convertCmToMeters, convertKgToString } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MyProperty } from './MyProperty';
import { useProfileStore } from 'app/store/profileStore';
import { useTranslations } from 'next-intl';
import { useAuthStore } from 'app/store/authStore';
import { LoadingBlock, LoadingLabels } from './LoadingLabels';
import { DrawerEditProfile } from '../../app/components/profile/DrawerEditProfile';

type CardProps = React.ComponentProps<typeof Card>;

export function MyPreferences({ className, ...props }: CardProps) {
  const tp = useTranslations('Profile');

  const { profile } = useProfileStore();
  const { user } = useAuthStore();

  const classNameIcon = 'h-4 w-4 text-sky-500 mr-2';

  return (
    <Card className={cn('w-full', className)} {...props}>
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="flex items-center space-x-2">
          <Avatar className="w-11 h-11">
            <AvatarImage src={user?.image} alt="User Avatar" />
            <AvatarFallback>{user?.name}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none text-muted-foreground">
              {user?.name}
            </p>
          </div>
        </div>
        <div className="flex items-center  ">
          <DrawerEditProfile />
        </div>
      </CardHeader>
      <CardContent className="gap-1">
        <MyProperty
          icon={<Ruler className={classNameIcon} />}
          name={tp('height')}
          value={
            profile?.height
              ? `${profile?.height} ${profile?.metricUnit === 'imperial' ? 'ft' : 'm'}`
              : LoadingBlock
          }
        />
        <MyProperty
          icon={<Weight className={classNameIcon} />}
          name={tp('weight')}
          value={
            profile?.weight
              ? `${profile?.weight} ${profile?.metricUnit === 'imperial' ? 'lb' : 'kg'}`
              : LoadingBlock
          }
        />
        <MyProperty
          icon={<ContactRound className={classNameIcon} />}
          name={tp('age')}
          value={profile?.age ? `${profile?.age} ${tp('years')}` : LoadingBlock}
        />
        <MyProperty
          icon={<PersonStanding className={classNameIcon} />}
          name={tp('gender')}
          value={<LoadingLabels tk="Profile" value={profile?.gender} />}
        />
        <MyProperty
          icon={<Salad className={classNameIcon} />}
          name={tp('dietaryPreference')}
          value={
            <LoadingLabels tk="Profile" value={profile?.dietaryPreference} />
          }
        />
        <MyProperty
          icon={<Goal className={classNameIcon} />}
          name={tp('goal')}
          value={<LoadingLabels tk="Profile" value={profile?.goal} />}
        />
        <MyProperty
          icon={<Dumbbell className={classNameIcon} />}
          name={tp('physicalActivity')}
          value={
            <LoadingLabels tk="Profile" value={profile?.physicalActivity} />
          }
        />
        {/* <MyProperty
          icon={<Cross className={classNameIcon} />}
          name={tp('afflictions')}
          value="Diabetes y Colesterol."
        /> */}
      </CardContent>
    </Card>
  );
}

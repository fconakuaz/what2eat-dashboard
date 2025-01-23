import { BellRing, Check, Edit2Icon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Asegúrate de tener este componente disponible.
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Switch } from '../ui/switch';

const notifications = [
  {
    title: 'Your call has been confirmed.',
    description: '1 hour ago'
  },
  {
    title: 'You have a new message!',
    description: '1 hour ago'
  },
  {
    title: 'Your subscription is expiring soon!',
    description: '2 hours ago'
  }
];

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
      <CardContent className="grid gap-4">
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end"></CardFooter>
    </Card>
  );
}

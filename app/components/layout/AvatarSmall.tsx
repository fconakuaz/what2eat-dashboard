import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FC } from 'react';

interface Props {
  src: string;
  name: string;
  email: string;
  alt?: string;
}

export const AvatarSmall: FC<Props> = ({
  src,
  name,
  email,
  alt = 'Avatar'
}) => {
  return (
    <div className="flex flex-row justify-start items-center">
      <Avatar className="mr-2 w-8 h-8">
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback className="text-xs">
          {name?.substring(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-start items-start">
        <span className="text-md mb-0 leading-tight">{name}</span>
        <span className="text-sm mt-0 leading-none">{email}</span>
      </div>
    </div>
  );
};

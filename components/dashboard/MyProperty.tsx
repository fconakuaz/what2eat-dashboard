import { FC, ReactNode } from 'react';

interface Props {
  name: string;
  value: string | ReactNode;
  icon: ReactNode;
}

export const MyProperty: FC<Props> = ({ name, value, icon }) => {
  return (
    <div className="mb-1 flex flex-row items-center space-x-2">
      {icon}
      <div className="flex flex-row items-center space-x-1">
        <p className="text-sm font-medium">{name}</p>
        <span className="text-muted-foreground flex items-center">{value}</span>
      </div>
    </div>
  );
};

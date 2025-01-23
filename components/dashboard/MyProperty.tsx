import { FC } from 'react';

interface Props {
  name: string;
  value: string;
  icon: any;
}

export const MyProperty: FC<Props> = ({ name, value, icon }): any => {
  return (
    <div className="mb-1 flex flex-row items-start ">
      {icon}
      <p className="text-sm font-medium  ">
        {name} <span className="text-muted-foreground ">{value}</span>
      </p>
    </div>
  );
};

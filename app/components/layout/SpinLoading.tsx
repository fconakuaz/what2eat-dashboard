import { Loader } from 'lucide-react';
import { FC } from 'react';

export const SpinLoading: FC = (): any => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-100px)]">
      <Loader className="w-10 h-10 text-primary animate-spin" />
    </div>
  );
};

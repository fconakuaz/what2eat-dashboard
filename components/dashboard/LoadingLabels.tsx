import { useTranslations } from 'next-intl';
import { FC, ReactNode } from 'react';
import { Skeleton } from '../ui/skeleton';

interface Props {
  tk: string;
  value: string | null | undefined;
}

export const LoadingBlock = (
  <Skeleton className="h-4 ml-1 w-[120px] flex flex-row" />
);

export const LoadingLabels: FC<Props> = ({ tk, value }): string | ReactNode => {
  if (value === null || value === undefined) {
    return LoadingBlock;
  }
  const t = useTranslations(tk);
  return <>{t(value)}</>;
};

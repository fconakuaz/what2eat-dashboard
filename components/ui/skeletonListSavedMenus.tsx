import { Skeleton } from './skeleton';

export const SkeletonListSavedMenus = (): any => {
  const SkeletonButton = () => (
    <Skeleton className="h-[40px] w-full rounded-lg" />
  );
  return (
    <>
      <SkeletonButton />
      <SkeletonButton />
      <SkeletonButton />
      <SkeletonButton />
      <SkeletonButton />
      <SkeletonButton />
    </>
  );
};

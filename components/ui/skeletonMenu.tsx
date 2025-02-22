import { Skeleton } from './skeleton';

export const SkeletonMenu = (): any => {
  return (
    <>
      <div className="flex flex-col p-0 pt-10 sm:p-8 space-y-3 w-full">
        <div className="flex space-x-3 mb-5">
          <Skeleton className="h-[105px] w-1/5 rounded-xl" />
          <Skeleton className="h-[105px] w-1/5 rounded-xl" />
          <Skeleton className="h-[105px] w-1/5 rounded-xl" />
          <Skeleton className="h-[105px] w-1/5 rounded-xl" />
          <Skeleton className="h-[105px] w-1/5 rounded-xl" />
        </div>
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[105px] mb-5 w-full rounded-xl" />
          <div className="space-y-2 pb-10">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />

            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />

            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    </>
  );
};

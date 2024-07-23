import { Skeleton } from "../ui/skeleton";

const SkeletonCardOrderWait = () => {
  return (
    <Skeleton className="flex flex-col space-y-3 w-full bg-white/70 py-6 px-8">
      <Skeleton className="h-[25px] w-[250px] rounded-xl" />
      <div className="max-w-4xl w-full gap-16 mx-auto space-y-4 ">
        <div className="px-3 py-4 rounded-lg bg-white/80 shadow w-full flex items-stretch gap-2 ">
          <div className="w-1/2 space-y-4 text-sm border">
            <div>
              <Skeleton className="w-52 h-5 rounded-sm" />
              <Skeleton className="w-52 h-5 rounded-sm" />
            </div>
            <div className="space-y-4">
              <Skeleton className="w-52 h-5 rounded-sm" />
              <Skeleton className="w-52 h-5 rounded-sm" />
              <Skeleton className="w-52 h-5 rounded-sm" />
              <Skeleton className="w-52 h-5 rounded-sm" />

              <div className="space-y-1">
                <Skeleton className="w-52 h-5 rounded-sm" />
                <Skeleton className="w-52 h-5 rounded-sm" />
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col justify-between border">
            <div className="w-full space-y-1 ">
              <Skeleton className="w-52 h-5 rounded-sm" />
              <Skeleton className="w-52 h-5 rounded-sm" />
            </div>
            <div className="w-full space-y-3">
              <div className="flex flex-col ">
                <Skeleton className="w-52 h-5 rounded-sm" />
                <Skeleton className="w-52 h-5 rounded-sm" />
              </div>
              <Skeleton className="w-52 h-5 rounded-sm" />
            </div>
          </div>
        </div>
        <div className="px-3 py-4 rounded-lg bg-white/80 shadow w-full flex items-stretch gap-2">
          <div className="w-1/2 space-y-4 text-sm">
            <div>
              <Skeleton className="w-52 h-5 rounded-sm" />
              <Skeleton className="w-52 h-5 rounded-sm" />
            </div>
            <div className="space-y-4">
              <Skeleton className="w-52 h-5 rounded-sm" />
              <Skeleton className="w-52 h-5 rounded-sm" />
              <Skeleton className="w-52 h-5 rounded-sm" />
              <Skeleton className="w-52 h-5 rounded-sm" />

              <div className="space-y-1">
                <Skeleton className="w-52 h-5 rounded-sm" />
                <Skeleton className="w-52 h-5 rounded-sm" />
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col justify-between">
            <div className="w-full space-y-1 ">
              <Skeleton className="w-52 h-5 rounded-sm" />
              <Skeleton className="w-52 h-5 rounded-sm" />
            </div>
            <div className="w-full space-y-3">
              <div className="flex flex-col">
                <Skeleton className="w-52 h-5 rounded-sm" />
                <Skeleton className="w-52 h-5 rounded-sm" />
              </div>
              <Skeleton className="w-52 h-5 rounded-sm" />
            </div>
          </div>
        </div>
        <div className="px-3 py-4 rounded-lg bg-white/80 shadow w-full flex items-stretch gap-2">
          <div className="w-1/2 space-y-4 text-sm">
            <div>
              <Skeleton className="w-52 h-5 rounded-sm" />
              <Skeleton className="w-52 h-5 rounded-sm" />
            </div>
            <div className="space-y-4">
              <Skeleton className="w-52 h-5 rounded-sm" />
              <Skeleton className="w-52 h-5 rounded-sm" />
              <Skeleton className="w-52 h-5 rounded-sm" />
              <Skeleton className="w-52 h-5 rounded-sm" />

              <div className="space-y-1">
                <Skeleton className="w-52 h-5 rounded-sm" />
                <Skeleton className="w-52 h-5 rounded-sm" />
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col justify-between">
            <div className="w-full space-y-1 ">
              <Skeleton className="w-52 h-5 rounded-sm" />
              <Skeleton className="w-52 h-5 rounded-sm" />
            </div>
            <div className="w-full space-y-3">
              <div className="flex flex-col">
                <Skeleton className="w-52 h-5 rounded-sm" />
                <Skeleton className="w-52 h-5 rounded-sm" />
              </div>
              <Skeleton className="w-52 h-5 rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    </Skeleton>
  );
};

export default SkeletonCardOrderWait;

// A single placeholder card shaped like a real project card, with a pulsing gray animation
export function ProjectCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-surface overflow-hidden animate-pulse">
      <div className="w-full h-40 bg-surface-hover" />
      <div className="p-6 flex flex-col gap-3">
        <div className="h-5 w-3/4 bg-surface-hover rounded" />
        <div className="h-3 w-full bg-surface-hover rounded" />
        <div className="h-3 w-5/6 bg-surface-hover rounded" />
        <div className="flex gap-2 mt-2">
          <div className="h-6 w-16 bg-surface-hover rounded-full" />
          <div className="h-6 w-16 bg-surface-hover rounded-full" />
        </div>
      </div>
    </div>
  );
}
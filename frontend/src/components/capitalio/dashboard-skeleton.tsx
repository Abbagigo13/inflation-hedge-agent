import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4 pb-8 md:p-8 animate-pulse">
      {/* Top Row Cards */}
      <div className="grid min-w-0 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-lg border border-border bg-card p-4 h-48 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-24 bg-muted-foreground/20" />
              <Skeleton className="h-8 w-8 rounded-lg bg-muted-foreground/20" />
            </div>
            <Skeleton className="h-10 w-32 bg-muted-foreground/20" />
            <Skeleton className="h-full w-full rounded-md bg-muted-foreground/10" />
          </div>
        ))}
      </div>

      {/* Middle Row Charts */}
      <div className="grid min-w-0 gap-3 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-lg border border-border bg-card p-4 h-[400px] flex flex-col gap-4">
          <Skeleton className="h-6 w-48 bg-muted-foreground/20" />
          <Skeleton className="h-full w-full rounded-md bg-muted-foreground/10" />
        </div>
        <div className="rounded-lg border border-border bg-card p-4 h-[400px] flex flex-col items-center justify-center gap-4">
          <Skeleton className="h-48 w-48 rounded-full bg-muted-foreground/20" />
          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-full bg-muted-foreground/20" />
            <Skeleton className="h-4 w-full bg-muted-foreground/20" />
          </div>
        </div>
      </div>
    </div>
  )
}
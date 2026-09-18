interface DashboardHeaderProps {
  jobCount: number;
}

export function DashboardHeader({ jobCount }: DashboardHeaderProps) {
  return (
    <header className="border-b pb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-foreground" />
            Factory Operations
          </div>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Production Control
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Monitor production jobs, identify delays, and keep upcoming work
            on schedule.
          </p>
        </div>

        <div className="shrink-0 rounded-md border bg-white px-3 py-2 text-sm">
          <span className="font-semibold text-foreground">{jobCount}</span>{" "}
          <span className="text-muted-foreground">active records</span>
        </div>
      </div>
    </header>
  );
}

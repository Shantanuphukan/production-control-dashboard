interface DashboardHeaderProps {
  jobCount: number;
}

export function DashboardHeader({ jobCount }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-2 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          Factory Operations
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Production Control
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Monitor production jobs, identify delays, and keep upcoming work on
          schedule.
        </p>
      </div>

      <div className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{jobCount}</span>{" "}
        active records
      </div>
    </header>
  );
}
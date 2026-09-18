import type { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  description: string;
  active?: boolean;
  onClick?: () => void;
}

export function SummaryCard({
  label,
  value,
  icon: Icon,
  description,
  active = false,
  onClick,
}: SummaryCardProps) {
  const isInteractive = Boolean(onClick);

  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">
            {label}
          </p>

          <p className="mt-2 text-3xl font-semibold tracking-tight">
            {value.toLocaleString("en-IN")}
          </p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {description}
          </p>
        </div>

        <div
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border bg-muted/40"
        >
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </>
  );

  if (!isInteractive) {
    return (
      <article className="rounded-lg border bg-white p-5">
        {content}
      </article>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`w-full rounded-lg border bg-white p-5 text-left transition-colors hover:bg-muted/20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
        active
          ? "border-foreground bg-muted/20"
          : "border-border"
      }`}
    >
      {content}
    </button>
  );
}


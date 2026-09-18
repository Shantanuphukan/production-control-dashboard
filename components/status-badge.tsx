import type { JobStatus } from "@/types/job";

interface StatusBadgeProps {
  status: JobStatus;
}

const statusStyles: Record<JobStatus, string> = {
  Pending: "border-slate-200 bg-slate-50 text-slate-700",
  "In Progress": "border-blue-200 bg-blue-50 text-blue-700",
  Delayed: "border-red-200 bg-red-50 text-red-700",
  Completed: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const statusIndicators: Record<JobStatus, string> = {
  Pending: "bg-slate-500",
  "In Progress": "bg-blue-600",
  Delayed: "bg-red-600",
  Completed: "bg-emerald-600",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${statusIndicators[status]}`}
      />

      {status}
    </span>
  );
}


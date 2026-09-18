import type { JobStatus } from "@/types/job";

interface StatusBadgeProps {
  status: JobStatus;
}

const statusStyles: Record<JobStatus, string> = {
  Pending: "border-slate-200 bg-slate-50 text-slate-700",
  "In Progress": "border-blue-200 bg-blue-50 text-blue-700",
  Delayed: "border-red-200 bg-red-50 text-red-700",
  Completed: "border-green-200 bg-green-50 text-green-700",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
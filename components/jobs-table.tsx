import { ChevronRight } from "lucide-react";

import type { Job } from "@/types/job";
import { StatusBadge } from "@/components/status-badge";

interface JobsTableProps {
  jobs: Job[];
  onJobSelect: (job: Job) => void;
}

function formatDueDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function JobsTable({ jobs, onJobSelect }: JobsTableProps) {
  if (jobs.length === 0) {
    return (
      <div className="rounded-lg border bg-white px-6 py-16 text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border bg-muted/40">
          <span className="text-sm font-semibold text-muted-foreground">
            —
          </span>
        </div>

        <h3 className="mt-4 text-sm font-semibold">No jobs found</h3>

        <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
          No production jobs match the current search and status filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] text-sm">
          <thead className="border-b bg-muted/40">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium text-muted-foreground">
                Job ID
              </th>

              <th className="px-4 py-3 font-medium text-muted-foreground">
                Product
              </th>

              <th className="px-4 py-3 font-medium text-muted-foreground">
                Customer
              </th>

              <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                Quantity
              </th>

              <th className="px-4 py-3 font-medium text-muted-foreground">
                Due date
              </th>

              <th className="px-4 py-3 font-medium text-muted-foreground">
                Status
              </th>

              <th className="px-4 py-3 font-medium text-muted-foreground">
                Machine
              </th>

              <th className="w-10 px-2 py-3" aria-hidden="true" />
            </tr>
          </thead>

          <tbody className="divide-y">
            {jobs.map((job) => (
              <tr
                key={job.id}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${job.id}`}
                onClick={() => onJobSelect(job)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onJobSelect(job);
                  }
                }}
                className="cursor-pointer transition-colors hover:bg-muted/30 focus:bg-muted/30 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ring"
              >
                <td className="whitespace-nowrap px-4 py-4">
                  <span className="font-mono text-xs font-semibold">
                    {job.id}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <div className="font-medium text-foreground">
                    {job.productName}
                  </div>
                </td>

                <td className="px-4 py-4 text-muted-foreground">
                  {job.customer}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-right font-medium tabular-nums">
                  {job.quantity.toLocaleString("en-IN")}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                  {formatDueDate(job.dueDate)}
                </td>

                <td className="whitespace-nowrap px-4 py-4">
                  <StatusBadge status={job.status} />
                </td>

                <td className="whitespace-nowrap px-4 py-4">
                  <span className="inline-flex items-center rounded-md border bg-muted/20 px-2 py-1 text-xs font-medium text-muted-foreground">
                    {job.machine}
                  </span>
                </td>

                <td className="px-2 py-4 text-right">
                  <ChevronRight
                    aria-hidden="true"
                    className="h-4 w-4 text-muted-foreground"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


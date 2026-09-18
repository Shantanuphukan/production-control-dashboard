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
        <h3 className="text-sm font-semibold">No jobs found</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Try changing your search or status filter.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="border-b bg-muted/30">
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
            </tr>
          </thead>

          <tbody className="divide-y">
            {jobs.map((job) => (
              <tr
                key={job.id}
                tabIndex={0}
                role="button"
                onClick={() => onJobSelect(job)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onJobSelect(job);
                  }
                }}
                className="cursor-pointer transition-colors hover:bg-muted/30 focus:bg-muted/30 focus:outline-none"
              >
                <td className="px-4 py-4 font-medium">{job.id}</td>

                <td className="px-4 py-4">
                  <div className="font-medium">{job.productName}</div>
                </td>

                <td className="px-4 py-4 text-muted-foreground">
                  {job.customer}
                </td>

                <td className="px-4 py-4 text-right font-medium">
                  {job.quantity.toLocaleString("en-IN")}
                </td>

                <td className="whitespace-nowrap px-4 py-4">
                  {formatDueDate(job.dueDate)}
                </td>

                <td className="px-4 py-4">
                  <StatusBadge status={job.status} />
                </td>

                <td className="px-4 py-4 text-muted-foreground">
                  {job.machine}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
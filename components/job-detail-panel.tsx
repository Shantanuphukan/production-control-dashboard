"use client";

import type { Job, JobStatus } from "@/types/job";
import { StatusBadge } from "@/components/status-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface JobDetailPanelProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange: (status: JobStatus) => void;
}

function formatDueDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function JobDetailPanel({
  job,
  open,
  onOpenChange,
  onStatusChange,
}: JobDetailPanelProps) {
  if (!job) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader className="border-b pb-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-semibold text-muted-foreground">
              {job.id}
            </span>

            <StatusBadge status={job.status} />
          </div>

          <SheetTitle className="text-xl leading-tight">
            {job.productName}
          </SheetTitle>

          <SheetDescription className="leading-6">
            Review production information and update the current job status.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-7 px-4 pb-8">
          <section className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold">Job information</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Current production assignment and delivery details.
              </p>
            </div>

            <div className="divide-y rounded-lg border">
              <div className="grid grid-cols-2 gap-4 p-4">
                <div>
                  <p className="text-xs text-muted-foreground">Customer</p>
                  <p className="mt-1 text-sm font-medium">{job.customer}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Quantity</p>
                  <p className="mt-1 text-sm font-medium tabular-nums">
                    {job.quantity.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4">
                <div>
                  <p className="text-xs text-muted-foreground">Due date</p>
                  <p className="mt-1 text-sm font-medium">
                    {formatDueDate(job.dueDate)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Assigned machine
                  </p>
                  <p className="mt-1 text-sm font-medium">{job.machine}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold">Production status</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Update the current state of this production job.
              </p>
            </div>

            <div className="space-y-3">
              <Select
                value={job.status}
                onValueChange={(value) =>
                  onStatusChange(value as JobStatus)
                }
              >
                <SelectTrigger
                  aria-label={`Update status for ${job.id}`}
                  className="h-10"
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Delayed">Delayed</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <p className="text-xs leading-5 text-muted-foreground">
                This demo stores status changes in the current browser
                session. A production version would persist this through an
                API.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold">Notes & issues</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Operational notes associated with this job.
              </p>
            </div>

            <div className="rounded-lg border bg-muted/20 p-4">
              <p className="text-sm leading-6 text-muted-foreground">
                {job.notes || "No notes or issues have been reported."}
              </p>
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}


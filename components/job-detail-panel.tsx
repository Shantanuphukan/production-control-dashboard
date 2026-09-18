"use client";

import type { Job, JobStatus } from "@/types/job";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/status-badge";

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
        <SheetHeader>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              {job.id}
            </span>

            <StatusBadge status={job.status} />
          </div>

          <SheetTitle className="text-xl">
            {job.productName}
          </SheetTitle>

          <SheetDescription>
            Production job details and current operational status.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 px-4 pb-6">
          <section className="space-y-3">
            <h3 className="text-sm font-semibold">Job information</h3>

            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              <div>
                <p className="text-xs text-muted-foreground">Customer</p>
                <p className="mt-1 text-sm font-medium">{job.customer}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Quantity</p>
                <p className="mt-1 text-sm font-medium">
                  {job.quantity.toLocaleString("en-IN")}
                </p>
              </div>

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
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold">Update status</h3>

            <Select
              value={job.status}
              onValueChange={(value) =>
                onStatusChange(value as JobStatus)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Delayed">Delayed</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <p className="text-xs text-muted-foreground">
              Changes are stored locally for this demo.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold">Notes & issues</h3>

            <div className="rounded-md border bg-muted/20 p-4">
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
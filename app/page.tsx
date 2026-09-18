"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Factory,
  TriangleAlert,
} from "lucide-react";

import { jobs as initialJobs } from "@/data/jobs";
import type { Job, JobStatus } from "@/types/job";

import { DashboardHeader } from "@/components/dashboard-header";
import { JobDetailPanel } from "@/components/job-detail-panel";
import {
  JobsToolbar,
  type SortField,
} from "@/components/jobs-toolbar";
import { JobsTable } from "@/components/jobs-table";
import { SummaryCard } from "@/components/summary-card";

const DUE_SOON_DAYS = 3;

type KpiFilter = "All" | "Delayed" | "Due Soon" | "Completed";

function getStartOfToday() {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return today;
}

function isDueSoon(date: string) {
  const today = getStartOfToday();
  const dueDate = new Date(`${date}T00:00:00`);

  const difference =
    dueDate.getTime() - today.getTime();

  const daysUntilDue =
    difference / (1000 * 60 * 60 * 24);

  return (
    daysUntilDue >= 0 &&
    daysUntilDue <= DUE_SOON_DAYS
  );
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  const [search, setSearch] = useState("");

  const [status, setStatus] =
    useState<JobStatus | "All">("All");

  const [sortBy, setSortBy] =
    useState<SortField>("dueDate");

  const [sortDirection, setSortDirection] =
    useState<"asc" | "desc">("asc");

  const [activeKpi, setActiveKpi] =
    useState<KpiFilter>("All");

  const [selectedJob, setSelectedJob] =
    useState<Job | null>(null);

  const [panelOpen, setPanelOpen] =
    useState(false);

  const filteredJobs = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    const result = jobs.filter((job) => {
      const matchesSearch =
        normalizedSearch === "" ||
        job.id.toLowerCase().includes(normalizedSearch) ||
        job.productName
          .toLowerCase()
          .includes(normalizedSearch) ||
        job.customer
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        status === "All" ||
        job.status === status;

      const matchesKpi =
        activeKpi === "All" ||
        (activeKpi === "Delayed" &&
          job.status === "Delayed") ||
        (activeKpi === "Completed" &&
          job.status === "Completed") ||
        (activeKpi === "Due Soon" &&
          job.status !== "Completed" &&
          isDueSoon(job.dueDate));

      return (
        matchesSearch &&
        matchesStatus &&
        matchesKpi
      );
    });

    return [...result].sort((a, b) => {
      const comparison =
        sortBy === "dueDate"
          ? a.dueDate.localeCompare(b.dueDate)
          : a.quantity - b.quantity;

      return sortDirection === "asc"
        ? comparison
        : -comparison;
    });
  }, [
    jobs,
    search,
    status,
    sortBy,
    sortDirection,
    activeKpi,
  ]);

  const totalJobs = jobs.length;

  const delayedJobs = jobs.filter(
    (job) => job.status === "Delayed",
  ).length;

  const completedJobs = jobs.filter(
    (job) => job.status === "Completed",
  ).length;

  const dueSoonJobs = jobs.filter(
    (job) =>
      job.status !== "Completed" &&
      isDueSoon(job.dueDate),
  ).length;

  function handleJobSelect(job: Job) {
    setSelectedJob(job);
    setPanelOpen(true);
  }

  function handleStatusChange(
    newStatus: JobStatus,
  ) {
    if (!selectedJob) {
      return;
    }

    setJobs((currentJobs) =>
      currentJobs.map((job) =>
        job.id === selectedJob.id
          ? {
              ...job,
              status: newStatus,
            }
          : job,
      ),
    );

    setSelectedJob((currentJob) =>
      currentJob
        ? {
            ...currentJob,
            status: newStatus,
          }
        : currentJob,
    );
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setActiveKpi("All");
  }

  function handleStatusFilterChange(
    value: JobStatus | "All",
  ) {
    setStatus(value);
    setActiveKpi("All");
  }

  function handleKpiClick(
    filter: KpiFilter,
  ) {
    setSearch("");
    setStatus("All");
    setActiveKpi(filter);
  }

  function clearFilters() {
    setSearch("");
    setStatus("All");
    setActiveKpi("All");
  }

  return (
    <main className="min-h-screen bg-muted/20">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <DashboardHeader
          jobCount={totalJobs}
        />

        <section
          aria-label="Production summary"
          className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <SummaryCard
            label="Total jobs"
            value={totalJobs}
            icon={Factory}
            description="All production jobs"
            active={activeKpi === "All"}
            onClick={() =>
              handleKpiClick("All")
            }
          />

          <SummaryCard
            label="Delayed"
            value={delayedJobs}
            icon={TriangleAlert}
            description="Jobs requiring attention"
            active={activeKpi === "Delayed"}
            onClick={() =>
              handleKpiClick("Delayed")
            }
          />

          <SummaryCard
            label="Due soon"
            value={dueSoonJobs}
            icon={Clock3}
            description="Due within the next 3 days"
            active={activeKpi === "Due Soon"}
            onClick={() =>
              handleKpiClick("Due Soon")
            }
          />

          <SummaryCard
            label="Completed"
            value={completedJobs}
            icon={CheckCircle2}
            description="Finished production jobs"
            active={activeKpi === "Completed"}
            onClick={() =>
              handleKpiClick("Completed")
            }
          />
        </section>

        <section className="mt-8">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                Production jobs
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Select a job to view details and update its status.
              </p>
            </div>

            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {filteredJobs.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">
                {totalJobs}
              </span>
            </p>
          </div>

          <JobsToolbar
            search={search}
            status={status}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSearchChange={handleSearchChange}
            onStatusChange={
              handleStatusFilterChange
            }
            onSortByChange={setSortBy}
            onSortDirectionChange={
              setSortDirection
            }
          />

          <div className="mt-4">
            <JobsTable
              jobs={filteredJobs}
              onJobSelect={handleJobSelect}
            />
          </div>

          {filteredJobs.length === 0 && (
            <div className="mt-3 flex justify-center">
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-medium underline underline-offset-4 hover:no-underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>

      <JobDetailPanel
        job={selectedJob}
        open={panelOpen}
        onOpenChange={setPanelOpen}
        onStatusChange={handleStatusChange}
      />
    </main>
  );
}


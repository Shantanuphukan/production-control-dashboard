"use client";

import { ArrowDown, ArrowUp, Search } from "lucide-react";

import type { JobStatus } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortField = "dueDate" | "quantity";

interface JobsToolbarProps {
  search: string;
  status: JobStatus | "All";
  sortBy: SortField;
  sortDirection: "asc" | "desc";
  onSearchChange: (value: string) => void;
  onStatusChange: (value: JobStatus | "All") => void;
  onSortByChange: (value: SortField) => void;
  onSortDirectionChange: (value: "asc" | "desc") => void;
}

export function JobsToolbar({
  search,
  status,
  sortBy,
  sortDirection,
  onSearchChange,
  onStatusChange,
  onSortByChange,
  onSortDirectionChange,
}: JobsToolbarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-white p-4 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by job ID, product, or customer..."
          className="pl-9"
        />
      </div>

      <Select
        value={status}
        onValueChange={(value) =>
          onStatusChange(value as JobStatus | "All")
        }
      >
        <SelectTrigger className="w-full lg:w-[170px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="All">All statuses</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="In Progress">In Progress</SelectItem>
          <SelectItem value="Delayed">Delayed</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={sortBy}
        onValueChange={(value) => onSortByChange(value as SortField)}
      >
        <SelectTrigger className="w-full lg:w-[150px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="dueDate">Due date</SelectItem>
          <SelectItem value="quantity">Quantity</SelectItem>
        </SelectContent>
      </Select>

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() =>
          onSortDirectionChange(sortDirection === "asc" ? "desc" : "asc")
        }
        aria-label={
          sortDirection === "asc"
            ? "Sort descending"
            : "Sort ascending"
        }
      >
        {sortDirection === "asc" ? (
          <ArrowUp className="h-4 w-4" />
        ) : (
          <ArrowDown className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
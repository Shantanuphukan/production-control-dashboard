# Production Control Dashboard

A responsive factory operations dashboard for monitoring production jobs, identifying delays, and keeping upcoming work on schedule.

The dashboard provides a focused operational view for a factory manager, with summary KPIs, searchable and filterable production jobs, sorting, and an interactive job detail panel.

## Features

* Production job overview with:

  * Job ID
  * Product name
  * Customer
  * Quantity
  * Due date
  * Status
  * Assigned machine
* Search by:

  * Job ID
  * Product name
  * Customer
* Filter jobs by status
* Sort by due date or quantity
* Ascending and descending sort direction
* Interactive KPI cards:

  * Total jobs
  * Delayed jobs
  * Jobs due soon
  * Completed jobs
* Click a job to open a detail side panel
* Update job status from the detail panel
* Empty state when no jobs match the selected filters
* Clear filters action
* Responsive layout for desktop, tablet, and mobile screens
* Local mock production data with client-side state management

## Tech Stack

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* lucide-react

## Project Structure

```text
production-control-dashboard/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── dashboard-header.tsx
│   ├── job-detail-panel.tsx
│   ├── jobs-table.tsx
│   ├── jobs-toolbar.tsx
│   ├── status-badge.tsx
│   ├── summary-card.tsx
│   └── ui/
│
├── data/
│   └── jobs.ts
│
├── types/
│   └── job.ts
│
├── public/
│
└── README.md
```

## Component Structure

The dashboard is split into focused components so that presentation and interaction logic remain easy to maintain.

### `DashboardHeader`

Displays the dashboard identity, operational context, and total record count.

### `SummaryCard`

Reusable KPI card component used for the four production summary metrics. KPI cards can also act as quick filters for the production table.

### `JobsToolbar`

Handles search, status filtering, sorting field selection, and sort direction.

### `JobsTable`

Responsible for rendering the production job list, including status badges, machine information, due dates, and keyboard-accessible job selection.

### `StatusBadge`

Provides consistent visual treatment for the four job statuses.

### `JobDetailPanel`

Displays detailed information for a selected production job and provides a simple status update control.

## Data & State Handling

The current version uses local mock data from:

```text
data/jobs.ts
```

Job data is stored in a typed `Job` interface and uses a dedicated `JobStatus` union type.

Dashboard interaction state is managed with React state:

* Search query
* Status filter
* Sort field
* Sort direction
* Active KPI filter
* Selected job
* Detail panel visibility
* Current job status updates

Derived table data is calculated with `useMemo` so filtering and sorting remain separate from the original mock dataset.

### KPI Filtering

The KPI cards act as quick table filters.

* **Total jobs** displays the complete production list.
* **Delayed** displays delayed jobs.
* **Due soon** displays non-completed jobs due today through the next three days.
* **Completed** displays completed jobs.

Using the search field or status filter clears the active KPI selection to keep filtering behavior predictable.

## Running Locally

### 1. Clone the repository

```bash
git clone <repository-url>
cd production-control-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the local development URL shown in the terminal.

### 4. Create a production build

```bash
npm run build
```

## Assumptions

* Production data is represented using local mock data because no backend or database was required.
* Job status changes are stored only in the current browser session and are not persisted to a server.
* "Due soon" is defined as jobs due today through the next three calendar days.
* Completed jobs are excluded from the "Due soon" metric.
* Dates are interpreted using the user's local browser date.
* Authentication and user roles are outside the scope of this dashboard.

## Future Improvements

If this were extended into a production application, the next improvements would include:

* Connect jobs to a backend API
* Persist status changes
* Add loading and API error states
* Add pagination for larger production datasets
* Add machine-level production views
* Add production capacity and utilization metrics
* Add historical job status tracking
* Add notifications for delayed and approaching jobs
* Add role-based access control
* Add automated API/data refresh

## Validation

The application has been validated with:

* Production build
* Job search
* Status filtering
* Due date and quantity sorting
* KPI filtering
* Job detail panel
* Status updates
* Empty-state handling
* Clear filters
* Responsive layouts

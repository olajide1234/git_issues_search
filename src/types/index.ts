export interface GlobalFilters {
  owner: string;
  repo: string;
  milestone: string | number;
  state: string;
  assignee: string;
  creator: string;
  mentioned: string;
  labels: string;
  sort: string;
  direction: string;
  per_page: number;
  page: number;
}

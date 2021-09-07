export interface Issue {
  id: number;
  node_id: string;
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  number: number;
  state: string;
  title: string;
  body: string;
  user: User;
  labels: Array<Label>;
  assignee: User | null;
  assignees: Array<User>;
  milestone: Milestone | null;
  locked: boolean;
  active_lock_reason: string | null;
  comments: number;
  pull_request?: PullRequest;
  closed_at: string | null;
  created_at: string;
  updated_at: string | null;
  author_association: string;
  performed_via_github_app?: null;
}

export interface Label {
  id: number;
  node_id: string;
  url: string;
  name: string;
  description: string;
  color: string;
  default: boolean;
}

export interface Milestone {
  url: string;
  html_url: string;
  labels_url: string;
  id: number;
  node_id: string;
  number: number;
  state: string;
  title: string;
  description: string;
  creator: User;
  open_issues: number;
  closed_issues: number;
  created_at: string;
  updated_at: string;
  closed_at: string;
  due_on: string;
}

interface PullRequest {
  url: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
}

export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

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

export type DropdownfilterGroup = Array<DropdownfilterType>;

export interface DropdownfilterType {
  id: string | number;
  primaryText: string;
  secondaryText?: string;
  name: keyof GlobalFilters;
}

export type FilterArgType = string | number;

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ResultsTable from "./index";

const issues = [
  {
    id: 1,
    node_id: "MDU6SXNzdWUx",
    url: "https://api.github.com/repos/octocat/Hello-World/issues/1347",
    repository_url: "https://api.github.com/repos/octocat/Hello-World",
    labels_url:
      "https://api.github.com/repos/octocat/Hello-World/issues/1347/labels{/name}",
    comments_url:
      "https://api.github.com/repos/octocat/Hello-World/issues/1347/comments",
    events_url:
      "https://api.github.com/repos/octocat/Hello-World/issues/1347/events",
    html_url: "https://github.com/octocat/Hello-World/issues/1347",
    number: 1347,
    state: "open",
    title: "Found a lovely bug",
    body: "I'm having a problem with this.",
    user: {
      login: "octocat",
      id: 1,
      node_id: "MDQ6VXNlcjE=",
      avatar_url: "https://github.com/images/error/octocat_happy.gif",
      gravatar_id: "",
      url: "https://api.github.com/users/octocat",
      html_url: "https://github.com/octocat",
      followers_url: "https://api.github.com/users/octocat/followers",
      following_url:
        "https://api.github.com/users/octocat/following{/other_user}",
      gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/octocat/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
      organizations_url: "https://api.github.com/users/octocat/orgs",
      repos_url: "https://api.github.com/users/octocat/repos",
      events_url: "https://api.github.com/users/octocat/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/octocat/received_events",
      type: "User",
      site_admin: false,
    },
    labels: [
      {
        id: 208045946,
        node_id: "MDU6TGFiZWwyMDgwNDU5NDY=",
        url: "https://api.github.com/repos/octocat/Hello-World/labels/bug",
        name: "bug",
        description: "Something isn't working",
        color: "f29513",
        default: true,
      },
    ],
    assignee: {
      login: "octocatlove",
      id: 1,
      node_id: "MDQ6VXNlcjE=",
      avatar_url: "https://github.com/images/error/octocat_happy.gif",
      gravatar_id: "",
      url: "https://api.github.com/users/octocat",
      html_url: "https://github.com/octocat",
      followers_url: "https://api.github.com/users/octocat/followers",
      following_url:
        "https://api.github.com/users/octocat/following{/other_user}",
      gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/octocat/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
      organizations_url: "https://api.github.com/users/octocat/orgs",
      repos_url: "https://api.github.com/users/octocat/repos",
      events_url: "https://api.github.com/users/octocat/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/octocat/received_events",
      type: "User",
      site_admin: false,
    },
    assignees: [
      {
        login: "octocatlover",
        id: 1,
        node_id: "MDQ6VXNlcjE=",
        avatar_url: "https://github.com/images/error/octocat_happy.gif",
        gravatar_id: "",
        url: "https://api.github.com/users/octocat",
        html_url: "https://github.com/octocat",
        followers_url: "https://api.github.com/users/octocat/followers",
        following_url:
          "https://api.github.com/users/octocat/following{/other_user}",
        gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
        organizations_url: "https://api.github.com/users/octocat/orgs",
        repos_url: "https://api.github.com/users/octocat/repos",
        events_url: "https://api.github.com/users/octocat/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/octocat/received_events",
        type: "User",
        site_admin: false,
      },
    ],
    milestone: {
      url: "https://api.github.com/repos/octocat/Hello-World/milestones/1",
      html_url: "https://github.com/octocat/Hello-World/milestones/v1.0",
      labels_url:
        "https://api.github.com/repos/octocat/Hello-World/milestones/1/labels",
      id: 1002604,
      node_id: "MDk6TWlsZXN0b25lMTAwMjYwNA==",
      number: 1,
      state: "open",
      title: "v1.0.99",
      description: "Tracking milestone for version 1.0",
      creator: {
        login: "octocat",
        id: 1,
        node_id: "MDQ6VXNlcjE=",
        avatar_url: "https://github.com/images/error/octocat_happy.gif",
        gravatar_id: "",
        url: "https://api.github.com/users/octocat",
        html_url: "https://github.com/octocat",
        followers_url: "https://api.github.com/users/octocat/followers",
        following_url:
          "https://api.github.com/users/octocat/following{/other_user}",
        gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
        organizations_url: "https://api.github.com/users/octocat/orgs",
        repos_url: "https://api.github.com/users/octocat/repos",
        events_url: "https://api.github.com/users/octocat/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/octocat/received_events",
        type: "User",
        site_admin: false,
      },
      open_issues: 4,
      closed_issues: 8,
      created_at: "2011-04-10T20:09:31Z",
      updated_at: "2014-03-03T18:58:10Z",
      closed_at: "2013-02-12T13:22:01Z",
      due_on: "2012-10-09T23:39:01Z",
    },
    locked: true,
    active_lock_reason: "too heated",
    comments: 0,
    pull_request: {
      url: "https://api.github.com/repos/octocat/Hello-World/pulls/1347",
      html_url: "https://github.com/octocat/Hello-World/pull/1347",
      diff_url: "https://github.com/octocat/Hello-World/pull/1347.diff",
      patch_url: "https://github.com/octocat/Hello-World/pull/1347.patch",
    },
    closed_at: null,
    created_at: "2011-04-22T13:33:48Z",
    updated_at: "2011-04-22T13:33:48Z",
    author_association: "COLLABORATOR",
  },
];
test("renders the table", () => {
  render(
    <ResultsTable
      currentPage={2}
      issues={issues}
      repoDetails={{
        owner: "microsoft",
        repo: "typescript",
      }}
      error={false}
      onSubmit={(f) => f}
    />
  );
  expect(screen.getByRole("table")).toBeInTheDocument();

  expect(
    screen.getByRole("columnheader", {
      name: "Milestones",
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("columnheader", {
      name: "State",
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("columnheader", {
      name: "Assignee",
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("columnheader", {
      name: "Creator",
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("columnheader", {
      name: "Mentioned",
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("columnheader", {
      name: "Labels",
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("heading", {
      name: "Sort",
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("row", {
      name: "Found a lovely bug bug #1347 | Status: open | Opened by: octocat | Opened on: Friday, 22 April 2011",
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("link", {
      name: "Found a lovely bug",
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("navigation", {
      name: "Pagination",
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("link", {
      name: "Previous Page",
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("link", {
      name: "Next Page",
    })
  ).toBeInTheDocument();
});

test("navigates table to next page", () => {
  const onSubmitMockHandler = jest.fn();

  render(
    <ResultsTable
      currentPage={2}
      issues={issues}
      repoDetails={{
        owner: "microsoft",
        repo: "typescript",
      }}
      error={false}
      onSubmit={onSubmitMockHandler}
    />
  );

  const nextPage = screen.getByRole("link", {
    name: "Next Page",
  });
  fireEvent.click(nextPage);

  expect(onSubmitMockHandler).toHaveBeenCalledWith({page: 3});
  onSubmitMockHandler.mockReset()
});

test("render error message", () => {
  render(
    <ResultsTable
      currentPage={2}
      issues={issues}
      repoDetails={{
        owner: "microsoft",
        repo: "typescript",
      }}
      error={true}
      onSubmit={f => f}
    />
  );

  expect(
    screen.getByText("Ooops! An error occured. Please try later")
  ).toBeInTheDocument();
});

test("render empty issues message", () => {
  render(
    <ResultsTable
      currentPage={2}
      issues={[]}
      repoDetails={{
        owner: "microsoft",
        repo: "typescript",
      }}
      error={false}
      onSubmit={(f) => f}
    />
  );

  expect(
    screen.getByText("There are no results matching your filters")
  ).toBeInTheDocument();
});

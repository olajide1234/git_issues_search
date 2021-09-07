import {
  filterDataHandler,
  issueDataHandler,
  getAssigneesCommand,
  getLabelsCommand,
  getMilestonesCommand,
  getIssuesCommand,
} from "./dataHandler";

import {
  mockMilestone,
  mockAssignee,
  mockLabels,
  mockIssues,
} from "./mockData";

import getMilestone from "../server/routes/getMilestones";
import getIssues from "../server/routes/getIssues";
import getAssignees from "../server/routes/getAssignees";
import getLabels from "../server/routes/getLabels";

jest.mock("../server/routes/getMilestones");
jest.mock("../server/routes/getIssues");
jest.mock("../server/routes/getAssignees");
jest.mock("../server/routes/getLabels");

const mockedGetMilestone = getMilestone as jest.Mock<any>;
const mockedGetIssues = getIssues as jest.Mock<any>;
const mockedGetAssignees = getAssignees as jest.Mock<any>;
const mockedGetLabels = getLabels as jest.Mock<any>;

afterEach(() => {
  jest.clearAllMocks();
});

test("gets assignees filter", async () => {
  mockedGetAssignees.mockImplementation(() => Promise.resolve(mockAssignee));
  expect(
    await filterDataHandler(
      getAssigneesCommand({ owner: "testowner", repo: "testrepo" })
    )
  ).toEqual([{ id: "octocat", name: "assignee", primaryText: "octocat" }]);
});

test("gets milestone filter", async () => {
  mockedGetMilestone.mockImplementation(() => Promise.resolve(mockMilestone));
  expect(
    await filterDataHandler(
      getMilestonesCommand({ owner: "testowner", repo: "testrepo" })
    )
  ).toEqual([{ id: 1, name: "milestone", primaryText: "v1.0" }]);
});

test("gets labels filter", async () => {
  mockedGetLabels.mockImplementation(() => Promise.resolve(mockLabels));
  expect(
    await filterDataHandler(
      getLabelsCommand({ owner: "testowner", repo: "testrepo" })
    )
  ).toEqual([
    { id: "bug", name: "labels", primaryText: "bug" },
    { id: "enhancement", name: "labels", primaryText: "enhancement" },
  ]);
});

test("gets issues", async () => {
  mockedGetIssues.mockImplementation(() => Promise.resolve(mockIssues));
  expect(
    await issueDataHandler(
      getIssuesCommand({
        owner: "",
        repo: "",
        milestone: "",
        state: "open",
        assignee: "",
        creator: "",
        mentioned: "",
        labels: "",
        sort: "",
        direction: "",
        per_page: 10,
        page: 1,
      })
    )
  ).toEqual([
    {
      active_lock_reason: "too heated",
      assignee: {
        avatar_url: "https://github.com/images/error/octocat_happy.gif",
        events_url: "https://api.github.com/users/octocat/events{/privacy}",
        followers_url: "https://api.github.com/users/octocat/followers",
        following_url:
          "https://api.github.com/users/octocat/following{/other_user}",
        gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
        gravatar_id: "",
        html_url: "https://github.com/octocat",
        id: 1,
        login: "octocat",
        node_id: "MDQ6VXNlcjE=",
        organizations_url: "https://api.github.com/users/octocat/orgs",
        received_events_url:
          "https://api.github.com/users/octocat/received_events",
        repos_url: "https://api.github.com/users/octocat/repos",
        site_admin: false,
        starred_url:
          "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
        type: "User",
        url: "https://api.github.com/users/octocat",
      },
      assignees: [
        {
          avatar_url: "https://github.com/images/error/octocat_happy.gif",
          events_url: "https://api.github.com/users/octocat/events{/privacy}",
          followers_url: "https://api.github.com/users/octocat/followers",
          following_url:
            "https://api.github.com/users/octocat/following{/other_user}",
          gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
          gravatar_id: "",
          html_url: "https://github.com/octocat",
          id: 1,
          login: "octocat",
          node_id: "MDQ6VXNlcjE=",
          organizations_url: "https://api.github.com/users/octocat/orgs",
          received_events_url:
            "https://api.github.com/users/octocat/received_events",
          repos_url: "https://api.github.com/users/octocat/repos",
          site_admin: false,
          starred_url:
            "https://api.github.com/users/octocat/starred{/owner}{/repo}",
          subscriptions_url:
            "https://api.github.com/users/octocat/subscriptions",
          type: "User",
          url: "https://api.github.com/users/octocat",
        },
      ],
      author_association: "COLLABORATOR",
      body: "I'm having a problem with this.",
      closed_at: null,
      comments: 0,
      comments_url:
        "https://api.github.com/repos/octocat/Hello-World/issues/1347/comments",
      created_at: "2011-04-22T13:33:48Z",
      events_url:
        "https://api.github.com/repos/octocat/Hello-World/issues/1347/events",
      html_url: "https://github.com/octocat/Hello-World/issues/1347",
      id: 1,
      labels: [
        {
          color: "f29513",
          default: true,
          description: "Something isn't working",
          id: 208045946,
          name: "bug",
          node_id: "MDU6TGFiZWwyMDgwNDU5NDY=",
          url: "https://api.github.com/repos/octocat/Hello-World/labels/bug",
        },
      ],
      labels_url:
        "https://api.github.com/repos/octocat/Hello-World/issues/1347/labels{/name}",
      locked: true,
      milestone: {
        closed_at: "2013-02-12T13:22:01Z",
        closed_issues: 8,
        created_at: "2011-04-10T20:09:31Z",
        creator: {
          avatar_url: "https://github.com/images/error/octocat_happy.gif",
          events_url: "https://api.github.com/users/octocat/events{/privacy}",
          followers_url: "https://api.github.com/users/octocat/followers",
          following_url:
            "https://api.github.com/users/octocat/following{/other_user}",
          gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
          gravatar_id: "",
          html_url: "https://github.com/octocat",
          id: 1,
          login: "octocat",
          node_id: "MDQ6VXNlcjE=",
          organizations_url: "https://api.github.com/users/octocat/orgs",
          received_events_url:
            "https://api.github.com/users/octocat/received_events",
          repos_url: "https://api.github.com/users/octocat/repos",
          site_admin: false,
          starred_url:
            "https://api.github.com/users/octocat/starred{/owner}{/repo}",
          subscriptions_url:
            "https://api.github.com/users/octocat/subscriptions",
          type: "User",
          url: "https://api.github.com/users/octocat",
        },
        description: "Tracking milestone for version 1.0",
        due_on: "2012-10-09T23:39:01Z",
        html_url: "https://github.com/octocat/Hello-World/milestones/v1.0",
        id: 1002604,
        labels_url:
          "https://api.github.com/repos/octocat/Hello-World/milestones/1/labels",
        node_id: "MDk6TWlsZXN0b25lMTAwMjYwNA==",
        number: 1,
        open_issues: 4,
        state: "open",
        title: "v1.0",
        updated_at: "2014-03-03T18:58:10Z",
        url: "https://api.github.com/repos/octocat/Hello-World/milestones/1",
      },
      node_id: "MDU6SXNzdWUx",
      number: 1347,
      pull_request: {
        diff_url: "https://github.com/octocat/Hello-World/pull/1347.diff",
        html_url: "https://github.com/octocat/Hello-World/pull/1347",
        patch_url: "https://github.com/octocat/Hello-World/pull/1347.patch",
        url: "https://api.github.com/repos/octocat/Hello-World/pulls/1347",
      },
      repository_url: "https://api.github.com/repos/octocat/Hello-World",
      state: "open",
      title: "Found a bug",
      updated_at: "2011-04-22T13:33:48Z",
      url: "https://api.github.com/repos/octocat/Hello-World/issues/1347",
      user: {
        avatar_url: "https://github.com/images/error/octocat_happy.gif",
        events_url: "https://api.github.com/users/octocat/events{/privacy}",
        followers_url: "https://api.github.com/users/octocat/followers",
        following_url:
          "https://api.github.com/users/octocat/following{/other_user}",
        gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
        gravatar_id: "",
        html_url: "https://github.com/octocat",
        id: 1,
        login: "octocat",
        node_id: "MDQ6VXNlcjE=",
        organizations_url: "https://api.github.com/users/octocat/orgs",
        received_events_url:
          "https://api.github.com/users/octocat/received_events",
        repos_url: "https://api.github.com/users/octocat/repos",
        site_admin: false,
        starred_url:
          "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
        type: "User",
        url: "https://api.github.com/users/octocat",
      },
    },
  ]);
});

test("handle get assignees filter error", async () => {
  const consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
  mockedGetAssignees.mockImplementation(() => Promise.reject("Error"));

  await filterDataHandler(
    getAssigneesCommand({ owner: "testowner", repo: "testrepo" })
  );
  expect(consoleSpy).toHaveBeenCalledWith("Error getting assignees filter");
});

test("handle get milestone filter error", async () => {
  const consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
  mockedGetMilestone.mockImplementation(() => Promise.reject("Error"));

  await filterDataHandler(
    getMilestonesCommand({ owner: "testowner", repo: "testrepo" })
  );
  expect(consoleSpy).toHaveBeenCalledWith("Error getting milestone filters");
});

test("handle get labels filter error", async () => {
  const consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
  mockedGetLabels.mockImplementation(() => Promise.reject("Error"));

  await filterDataHandler(
    getLabelsCommand({ owner: "testowner", repo: "testrepo" })
  );
  expect(consoleSpy).toHaveBeenCalledWith("Error getting label filters");
});
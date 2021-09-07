import { apiUrlBase } from "../../constants";
import type { User } from "../../types";

async function getAssignees({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}): Promise<Array<User>> {
  const fetchUrl = `${apiUrlBase}/repos/${owner}/${repo}/assignees?per_page=100`;
  console.log('hitting server')
  // const response = await fetch(fetchUrl, {
  //   method: "GET", 
  //   mode: "cors", 
  //   cache: "no-cache", 
  //   credentials: "same-origin", 
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  return [
    {
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
  ];
}

export default getAssignees;

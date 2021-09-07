import { apiUrlBase } from "../../constants";

import type { Milestone } from "../../types";

async function getMilestones({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}): Promise<Array<Milestone>> {
  const fetchUrl = `${apiUrlBase}/repos/${owner}/${repo}/milestones?per_page=100`;
  const response = await fetch(fetchUrl, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export default getMilestones;

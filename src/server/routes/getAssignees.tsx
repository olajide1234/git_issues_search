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

export default getAssignees;

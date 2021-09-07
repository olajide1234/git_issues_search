import { apiUrlBase } from "../../constants";

import type { GlobalFilters, Issue } from "../../types";

async function getIssues(value: GlobalFilters): Promise<Array<Issue>> {
  const fullParameters = getFullParameters(value);
  const fetchUrl = `${apiUrlBase}/repos/${value.owner}/${value.repo}/issues?${fullParameters}`;
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

export default getIssues;

function getFullParameters(input: GlobalFilters) {
  let string: string = "";
  for (const [key, value] of Object.entries(input)) {
    if (value && !["repo", "owner"].includes(key)) {
      string = string + `&${key}=${value}`;
    }
  }
  return string;
}

import { apiUrlBase } from "../../constants";

import type { Label } from "../../types";

async function getLabels({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}): Promise<Array<Label> | undefined> {
  try {
      const fetchUrl = `${apiUrlBase}/repos/${owner}/${repo}/labels?per_page=100`;
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
  } catch (error) {
    console.warn("Error getting labels from API");
  }
}

export default getLabels;

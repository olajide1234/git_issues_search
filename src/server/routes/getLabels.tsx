import { apiUrlBase } from "../../constants";

import type { Label } from "../../types";

async function getLabels({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}): Promise<Array<Label>> {
  const fetchUrl = `${apiUrlBase}/repos/${owner}/${repo}/labels?per_page=100`;
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
      id: 208045946,
      node_id: "MDU6TGFiZWwyMDgwNDU5NDY=",
      url: "https://api.github.com/repos/octocat/Hello-World/labels/bug",
      name: "bug",
      description: "Something isn't working",
      color: "f29513",
      default: true,
    },
    {
      id: 208045947,
      node_id: "MDU6TGFiZWwyMDgwNDU5NDc=",
      url: "https://api.github.com/repos/octocat/Hello-World/labels/enhancement",
      name: "enhancement",
      description: "New feature or request",
      color: "a2eeef",
      default: false,
    },
  ];
}

export default getLabels;

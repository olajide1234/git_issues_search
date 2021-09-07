import React from "react";
import { render, screen } from "@testing-library/react";
import IssueLabel from "./index";

test("renders the header", () => {
  render(
    <IssueLabel
      labels={[
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
          id: 2080459455,
          node_id: "MDU6TGFiZWwyMDgwDFFGTY=",
          url: "https://api.github.com/repos/octocat/Hello-World-HERE/labels/bug",
          name: "health",
          description: "Something isn't working",
          color: "f29513",
          default: true,
        },
      ]}
    />
  );
  const bugText = screen.getByText("bug");
  const healthText = screen.getByText("health");
  expect(bugText).toBeInTheDocument();
  expect(healthText).toBeInTheDocument();
});

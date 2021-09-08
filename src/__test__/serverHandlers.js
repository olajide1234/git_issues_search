import { rest } from "msw"; // msw supports graphql too!
// import { apiUrlBase } from "../constants";

import {
  mockMilestone,
  mockAssignee,
  mockLabels,
  mockIssues,
} from "./mockData";

const handlers = [
  rest.get("https://api.github.com/repos/testowner/testrepo/assignees", async (req, res, ctx) => {
    return res(ctx.json(mockAssignee));
  }),

  rest.get("https://api.github.com/repos/testowner/testrepo/issues", async (req, res, ctx) => {
    return res(ctx.json(mockIssues));
  }),

  rest.get("https://api.github.com/repos/testowner/testrepo/labels", async (req, res, ctx) => {
    return res(ctx.json(mockLabels));
  }),

  rest.get("https://api.github.com/repos/testowner/testrepo/milestones", async (req, res, ctx) => {
    return res(ctx.json(mockMilestone));
  }),
];

export { handlers };

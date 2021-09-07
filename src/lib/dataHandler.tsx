import getMilestone from "../server/routes/getMilestones";
import getIssues from "../server/routes/getIssues";
import getAssignees from "../server/routes/getAssignees";
import getLabels from "../server/routes/getLabels";

import type { GlobalFilters } from "../types";
import type { DropdownfilterGroup } from "../types";

type FilterArgumentType = Pick<GlobalFilters, "owner" | "repo">;

class DataHandlers {
  execute(command: any) {
    const data = command.execute(command.value);
    return data;
  }
}

export const dataHandler = new DataHandlers()

export const getAssigneesCommand = function (value: FilterArgumentType) {
  const { owner, repo } = value;
  return { execute: getParsedAssignees, value: { owner, repo } };
};

async function getParsedAssignees(value: FilterArgumentType) {
  const assignees = await getAssignees(value);
  const parsedAssignees: DropdownfilterGroup = [];
  assignees.forEach((assignee) => {
    parsedAssignees.push({
      id: assignee.login,
      primaryText: assignee.login,
      name: "assignee",
    });
  });
  return parsedAssignees;
}

export const getMilestonesCommand = function (value: FilterArgumentType) {
  const { owner, repo } = value;
  return { execute: getParsedMilestones, value: { owner, repo } };
};

async function getParsedMilestones(value: FilterArgumentType) {
  const milestones = await getMilestone(value);
  const parsedMilestones: DropdownfilterGroup = [];
  milestones.forEach((milestone) => {
    parsedMilestones.push({
      id: milestone.number,
      primaryText: milestone.title,
      name: "milestone",
    });
  });
  return parsedMilestones;
}

export const getLabelsCommand = function (value: FilterArgumentType) {
  const { owner, repo } = value;
  return { execute: getParsedLabels, value: { owner, repo } };
};

async function getParsedLabels(value: FilterArgumentType) {
  const labels = await getLabels(value);
  const parsedLabels: DropdownfilterGroup = [];
  labels.forEach((label) => {
    parsedLabels.push({
      id: label.name,
      primaryText: label.name,
      name: "labels",
    });
  });
  return parsedLabels;
}

export const getIssuesCommand = function (value: GlobalFilters) {
  return { execute: getIssues, value };
};

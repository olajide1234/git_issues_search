import getMilestone from "../server/routes/getMilestones";
import getIssues from "../server/routes/getIssues";
import getAssignees from "../server/routes/getAssignees";
import getLabels from "../server/routes/getLabels";

import type { DropdownfilterGroup, Issue, GlobalFilters } from "../types";

type FilterArgumentType = Pick<GlobalFilters, "owner" | "repo">;

export const filterDataHandler = async function (command: {
  execute: (
    value: FilterArgumentType
  ) => Promise<DropdownfilterGroup | undefined>;
  value: FilterArgumentType;
}) {
  const data = await command.execute(command.value);
  return data;
};

export const issueDataHandler = async function (command: {
  execute: (value: GlobalFilters) => Promise<Issue[]>;
  value: GlobalFilters;
}) {
  const data = await command.execute(command.value);
  return data;
};

export const getAssigneesCommand = function (value: FilterArgumentType) {
  const { owner, repo } = value;
  return { execute: getParsedAssignees, value: { owner, repo } };
};

async function getParsedAssignees(value: FilterArgumentType) {
  try {
    const assignees = await getAssignees(value);
    const parsedAssignees: DropdownfilterGroup = assignees.map((assignee) => ({
      id: assignee.login,
      primaryText: assignee.login,
      name: "assignee",
    }));
    return parsedAssignees;
  } catch (error) {
    console.warn("Error getting assignees filter");
  }
}

export const getMilestonesCommand = function (value: FilterArgumentType) {
  const { owner, repo } = value;
  return { execute: getParsedMilestones, value: { owner, repo } };
};

async function getParsedMilestones(value: FilterArgumentType) {
  try {
    const milestones = await getMilestone(value);
    const parsedMilestones: DropdownfilterGroup = milestones.map(
      (milestone) => ({
        id: milestone.number,
        primaryText: milestone.title,
        name: "milestone",
      })
    );
    return parsedMilestones;
  } catch (error) {
    console.warn("Error getting milestone filters");
  }
}

export const getLabelsCommand = function (value: FilterArgumentType) {
  const { owner, repo } = value;
  return { execute: getParsedLabels, value: { owner, repo } };
};

async function getParsedLabels(value: FilterArgumentType) {
  try {
    const labels = await getLabels(value);
    const parsedLabels: DropdownfilterGroup = labels.map((label) => ({
        id: label.name,
        primaryText: label.name,
        name: "labels",
      }));
    return parsedLabels;
  } catch (error) {
    console.warn("Error getting label filters");
  }
}

export const getIssuesCommand = function (value: GlobalFilters) {
  return { execute: getIssues, value };
};

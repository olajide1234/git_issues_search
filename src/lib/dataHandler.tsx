import getMilestone from "../server/routes/getMilestones";
import getIssues from "../server/routes/getIssues";
import getAssignees from "../server/routes/getAssignees";
import getLabels from "../server/routes/getLabels";

import type { DropdownfilterGroup, Issue, GlobalFilters } from "../types";

type FilterArgument = Pick<GlobalFilters, "owner" | "repo">;
type GetFilterCommand = {
  execute: (value: FilterArgument) => Promise<DropdownfilterGroup | undefined>;
  value: {
    owner: string;
    repo: string;
  };
};
type GetIssuesCommand = {
  execute: (value: GlobalFilters) => Promise<Issue[] | undefined>;
  value: GlobalFilters;
};

export const filterDataHandler = async function (command: {
  execute: (value: FilterArgument) => Promise<DropdownfilterGroup | undefined>;
  value: FilterArgument;
}): Promise<DropdownfilterGroup | undefined> {
  try {
    const data = await command.execute(command.value);
    return data;
  } catch (error) {
    // Log error to monitoring tool
  }
};

export const issueDataHandler = async function (command: {
  execute: (value: GlobalFilters) => Promise<Issue[] | undefined>;
  value: GlobalFilters;
}): Promise<Issue[] | undefined> {
  try {
    const data = await command.execute(command.value);
    return data;
  } catch (error) {
    // Log error to monitoring tool
  }
};

export const getAssigneesCommand = function (
  value: FilterArgument
): GetFilterCommand {
  const { owner, repo } = value;
  return { execute: getParsedAssignees, value: { owner, repo } };
};

async function getParsedAssignees(
  value: FilterArgument
): Promise<DropdownfilterGroup | undefined> {
  try {
    const assignees = await getAssignees(value);
    if (assignees) {
      const parsedAssignees: DropdownfilterGroup = assignees.map(
        (assignee) => ({
          id: assignee.login,
          primaryText: assignee.login,
          name: "assignee",
        })
      );
      return parsedAssignees;
    } 
  } catch (error) {
    console.warn("Error getting assignees filter");
  }
}

export const getMilestonesCommand = function (
  value: FilterArgument
): GetFilterCommand {
  const { owner, repo } = value;
  return { execute: getParsedMilestones, value: { owner, repo } };
};

async function getParsedMilestones(
  value: FilterArgument
): Promise<DropdownfilterGroup | undefined> {
  try {
    const milestones = await getMilestone(value);
    if (milestones) {
      const parsedMilestones: DropdownfilterGroup = milestones.map(
        (milestone) => ({
          id: milestone.number,
          primaryText: milestone.title,
          name: "milestone",
        })
      );
      return parsedMilestones;
    } 
  } catch (error) {
    console.warn("Error getting milestone filters");
  }
}

export const getLabelsCommand = function (
  value: FilterArgument
): GetFilterCommand {
  const { owner, repo } = value;
  return { execute: getParsedLabels, value: { owner, repo } };
};

async function getParsedLabels(
  value: FilterArgument
): Promise<DropdownfilterGroup | undefined> {
  try {
    const labels = await getLabels(value);
    if (labels) {
      const parsedLabels: DropdownfilterGroup = labels.map((label) => ({
        id: label.name,
        primaryText: label.name,
        name: "labels",
      }));
      return parsedLabels;
    } 
  } catch (error) {
    console.warn("Error getting label filters");
  }
}

export const getIssuesCommand = function (
  value: GlobalFilters
): GetIssuesCommand {
  return { execute: getIssues, value };
};

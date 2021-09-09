import getMilestone from "../server/routes/getMilestones";
import getIssues from "../server/routes/getIssues";
import getAssignees from "../server/routes/getAssignees";
import getLabels from "../server/routes/getLabels";

import type {
  DropdownfilterGroup,
  FilterArgument,
  GlobalFilters,
  GetFilterCommand,
  GetIssuesCommand,
  GetAssigneeFilterCommand,
  Issue,
  ParsedUsers
} from "../types";


// Command design pattern


async function filterDataHandler(
  command: GetFilterCommand
): Promise<DropdownfilterGroup | undefined>;

async function filterDataHandler(
  command: GetAssigneeFilterCommand
): Promise<ParsedUsers | undefined>;
async function filterDataHandler(
  command: GetFilterCommand | GetAssigneeFilterCommand
): Promise<ParsedUsers | DropdownfilterGroup | undefined> {
  try {
    const data = await command.execute(command.value);
    return data;
  } catch (error) {
    // Log error to monitoring tool
  }
};

export { filterDataHandler };

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
): GetAssigneeFilterCommand {
  const { owner, repo } = value;
  return { execute: getParsedAssignees, value: { owner, repo } };
};

async function getParsedAssignees(
  value: FilterArgument
): Promise<ParsedUsers | undefined> {
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
      const parsedCreators: DropdownfilterGroup = assignees.map((assignee) => ({
        id: assignee.login,
        primaryText: assignee.login,
        name: "creator",
      }));
      const parsedMentioned: DropdownfilterGroup = assignees.map(
        (assignee) => ({
          id: assignee.login,
          primaryText: assignee.login,
          name: "mentioned",
        })
      );
      return { parsedAssignees, parsedCreators, parsedMentioned };
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

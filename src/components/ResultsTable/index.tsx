import React, { Fragment, useEffect, useState } from "react";
import { Box, Pagination, Spinner } from "@primer/components";

import type { FC } from "react";
import type { DropdownfilterGroup, Issue, GlobalFilters } from "../../types";

import DropdownHeader from "../DropdownHeader";
import TableRow from "../TableRow";
import {
  filterDataHandler,
  getAssigneesCommand,
  getMilestonesCommand,
  getLabelsCommand,
} from "../../lib/dataHandler";

import "./index.scss";

interface ResultsTableProp {
  currentPage: number;
  error: boolean;
  issues: Array<Issue>;
  loading: boolean;
  onSubmit: (inputs: Partial<GlobalFilters>) => void;
  repoDetails: { owner: string; repo: string };
}
const ResultsTable: FC<ResultsTableProp> = ({
  currentPage,
  error,
  issues,
  loading,
  onSubmit,
  repoDetails,
}) => {
  const [milestones, setMilestones] = useState<DropdownfilterGroup>([]);
  const [assignees, setAssignees] = useState<DropdownfilterGroup>([]);
  const [labels, setLabels] = useState<DropdownfilterGroup>([]);

  const handleItemClick = (input: Partial<GlobalFilters>) => onSubmit(input);

  const HandlePageChange = (
    e: React.MouseEvent<Element, MouseEvent>,
    number: number
  ) => {
    e.preventDefault();
    handleItemClick({ page: number });
  };
  const isResultEmptyOrErrorOrLoading = loading || issues.length < 1 || error;

  useEffect(() => {
    async function fetchFilters(): Promise<void> {
      try {
        // TODO: We can load this data non-sequentially or let each component load its data so they dont block UI
        const milestonesData = await filterDataHandler(
          getMilestonesCommand({
            owner: repoDetails.owner,
            repo: repoDetails.repo,
          })
        );
        const assigneesData = await filterDataHandler(
          getAssigneesCommand({
            owner: repoDetails.owner,
            repo: repoDetails.repo,
          })
        );
        const labelsData = await filterDataHandler(
          getLabelsCommand({ owner: repoDetails.owner, repo: repoDetails.repo })
        );
        milestonesData && setMilestones(milestonesData);
        assigneesData && setAssignees(assigneesData);
        labelsData && setLabels(labelsData);
      } catch (error) {
        console.warn("Unable to fetch filters");
      }
    }
    fetchFilters();
  }, [repoDetails.owner, repoDetails.repo]);

  // TODO: implement search functionality for all dropdowns
  return (
    <Fragment>
      <Box
        m={3}
        p={3}
        borderColor="border.primary"
        borderWidth={1}
        borderStyle="solid"
      >
        <table className="tableBody">
          <thead>
            <tr>
              <td>
                <div className="tableHeader">
                  <div className="tableHeader">
                    <span className="headerItem hideable">
                      <DropdownHeader
                        clickHandler={handleItemClick}
                        content={milestones}
                        name="Milestones"
                      />
                    </span>
                    <span className="headerItem">
                      <DropdownHeader
                        clickHandler={handleItemClick}
                        content={[
                          { id: "open", primaryText: "Open", name: "state" },
                          {
                            id: "closed",
                            primaryText: "Closed",
                            name: "state",
                          },
                          { id: "all", primaryText: "All", name: "state" },
                        ]}
                        name="State"
                      />
                    </span>
                    <span className="headerItem">
                      <DropdownHeader
                        clickHandler={handleItemClick}
                        content={assignees}
                        name="Assignee"
                      />
                    </span>
                    <span className="headerItem hideable">
                      <DropdownHeader
                        clickHandler={handleItemClick}
                        content={assignees}
                        name="Creator"
                      />
                    </span>
                    <span className="headerItem hideable">
                      <DropdownHeader
                        clickHandler={handleItemClick}
                        content={assignees}
                        name="Mentioned"
                      />
                    </span>
                    <span className="headerItem">
                      <DropdownHeader
                        clickHandler={handleItemClick}
                        content={labels}
                        name="Labels"
                      />
                    </span>
                  </div>
                  <div>
                    <span className="headerItem">
                      <DropdownHeader
                        clickHandler={handleItemClick}
                        content={[
                          {
                            id: "created",
                            primaryText: "Created",
                            name: "sort",
                          },
                          {
                            id: "updated",
                            primaryText: "Updated",
                            name: "sort",
                          },
                          {
                            id: "comments",
                            primaryText: "Comments",
                            name: "sort",
                          },
                        ]}
                        name="Sort"
                        align="right"
                        width="150px"
                      />
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            {isResultEmptyOrErrorOrLoading ? (
              loading ? (
                <tr>
                  <td>
                    <p className="notifText">
                      <Spinner data-testid="spinner" size="medium" />
                    </p>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td>
                    <p className="notifText">
                      {error
                        ? "Ooops! An error occured. Please try later"
                        : "There are no results matching your filters"}
                    </p>
                  </td>
                </tr>
              )
            ) : (
              <TableRow issues={issues} />
            )}
          </tbody>
        </table>
      </Box>
      {isResultEmptyOrErrorOrLoading ? null : (
        <Pagination
          pageCount={300}
          currentPage={currentPage}
          onPageChange={HandlePageChange}
          showPages={false}
        />
      )}
    </Fragment>
  );
};

export default ResultsTable;

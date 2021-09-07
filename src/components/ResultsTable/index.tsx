import React, { Fragment, useEffect, useState } from "react";
import { Box, Pagination, Spinner } from "@primer/components";

import type { FC } from "react";
import type { DropdownfilterGroup, Issue, GlobalFilters } from "../../types";

import DropdownHeader from "../DropdownHeader";
import TableRow from "../TableRow";
import {
  dataHandler,
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
      console.log("ffe insude");
      try {
        // TODO: We can load this data non-sequentially or let each component load its data so they dont block UI
        const milestonesData = await dataHandler.execute(
          getMilestonesCommand(repoDetails)
        );
        const assigneesData = await dataHandler.execute(
          getAssigneesCommand(repoDetails)
        );
        const labelsData = await dataHandler.execute(
          getLabelsCommand(repoDetails)
        );
        milestonesData && setMilestones(milestonesData);
        assigneesData && setAssignees(assigneesData);
        labelsData && setLabels(labelsData);
      } catch (error) {
        console.log("Unable to fetch filters");
      }
    }
    fetchFilters();
  }, [repoDetails]);

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
          <tbody>
            <tr>
              <div className="tableRow">
                <div>
                  <th>
                    <DropdownHeader
                      clickHandler={handleItemClick}
                      content={milestones}
                      name="Milestones"
                    />
                  </th>
                  <th>
                    <DropdownHeader
                      clickHandler={handleItemClick}
                      content={[
                        { id: "open", primaryText: "Open", name: "state" },
                        { id: "closed", primaryText: "Closed", name: "state" },
                        { id: "all", primaryText: "All", name: "state" },
                      ]}
                      name="State"
                    />
                  </th>
                  <th>
                    <DropdownHeader
                      clickHandler={handleItemClick}
                      content={assignees}
                      name="Assignee"
                    />
                  </th>
                  <th>
                    <DropdownHeader
                      clickHandler={handleItemClick}
                      content={assignees}
                      name="Creator"
                    />
                  </th>
                  <th>
                    <DropdownHeader
                      clickHandler={handleItemClick}
                      content={assignees}
                      name="Mentioned"
                    />
                  </th>
                  <th>
                    <DropdownHeader
                      clickHandler={handleItemClick}
                      content={labels}
                      name="Labels"
                    />
                  </th>
                </div>
                <div>
                  <DropdownHeader
                    clickHandler={handleItemClick}
                    content={[
                      { id: "created", primaryText: "Created", name: "sort" },
                      { id: "updated", primaryText: "Updated", name: "sort" },
                      { id: "comments", primaryText: "Comments", name: "sort" },
                    ]}
                    name="Sort"
                    align="right"
                    width="150px"
                  />
                </div>
              </div>
            </tr>
            {isResultEmptyOrErrorOrLoading ? (
              loading ? (
                <tr>
                  <td>
                    <p className="notifText">
                      <Spinner size="medium" />
                    </p>
                  </td>
                </tr>
              ) : (
                <tr>
                  <p className="notifText">
                    {error
                      ? "Ooops! An error occured. Please try later"
                      : "There are no results matching your filters"}
                  </p>
                </tr>
              )
            ) : (
              <TableRow issues={issues} />
            )}
          </tbody>
        </table>
      </Box>
      <Pagination
        pageCount={300}
        currentPage={currentPage}
        onPageChange={HandlePageChange}
        showPages={false}
      />
    </Fragment>
  );
};

export default ResultsTable;

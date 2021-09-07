import React, { Fragment, useEffect, useState } from "react";
import { Box, Pagination } from "@primer/components";

import type { FC } from "react";
import type { DropdownfilterGroup, Issue, GlobalFilters } from "../../types";

import DropdownHeader from "../DropdownHeader";
import TableRow from "../TableRow";

import "./index.scss";

interface ResultsTableProp {
  currentPage: number;
  error: boolean;
  issues: Array<Issue>;
  onSubmit: (inputs: Partial<GlobalFilters>) => void;
  repoDetails: { owner: string; repo: string };
}
const ResultsTable: FC<ResultsTableProp> = ({
  currentPage,
  error,
  issues,
  onSubmit,
  repoDetails,
}) => {
  const [milestones, setMilestones] = useState<DropdownfilterGroup>([
    {
      id: "test",
      primaryText: "testyin",
      name: "milestone",
    },
  ]);
  const [assignees, setAssignees] = useState<DropdownfilterGroup>([
    { id: "tesst", primaryText: "jij", name: "assignee" },
  ]);
  const [labels, setLabels] = useState<DropdownfilterGroup>([
    {
      id: "test",
      primaryText: "testing",
      name: "labels",
    },
  ]);

  const handleItemClick = (input: Partial<GlobalFilters>) => onSubmit(input);

  const HandlePageChange = (
    e: React.MouseEvent<Element, MouseEvent>,
    number: number
  ) => {
    e.preventDefault();
    handleItemClick({ page: number });
  };
  const isResultEmptyOrError = issues.length < 1 || error;

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
          {isResultEmptyOrError ? (
            <tr>
              <p className="notifText">
                {error
                  ? "Ooops! An error occured. Please try later"
                  : "There are no results matching your filters"}
              </p>
            </tr>
          ) : (
            <TableRow issues={issues} />
          )}
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

import React, { Fragment, useEffect, useState, useCallback } from "react";
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
  activeFilter: GlobalFilters;
  currentPage: number;
  error: boolean;
  data: Array<Issue>;
  loading: boolean;
  onSubmit: (inputs: Partial<GlobalFilters>) => void;
}
const ResultsTable: FC<ResultsTableProp> = ({
  activeFilter,
  currentPage,
  error,
  data,
  loading,
  onSubmit,
}) => {
  const [milestones, setMilestones] = useState<DropdownfilterGroup>([]);
  const [assignees, setAssignees] = useState<DropdownfilterGroup>([]);
  const [labels, setLabels] = useState<DropdownfilterGroup>([]);

  const stateOptions: DropdownfilterGroup = [
    { id: "open", primaryText: "Open", name: "state" },
    {
      id: "closed",
      primaryText: "Closed",
      name: "state",
    },
    { id: "all", primaryText: "All", name: "state" },
  ];

  const sortOptions: DropdownfilterGroup = [
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
  ];

  const memoizedHandleItemClick = useCallback(
    (input: Partial<GlobalFilters>): void => onSubmit(input),
    [onSubmit]
  );

  const HandlePageChange = (
    e: React.MouseEvent<Element, MouseEvent>,
    number: number
  ): void => {
    e.preventDefault();
    memoizedHandleItemClick({ page: number });
  };
  const isResultEmptyOrErrorOrLoading = loading || data.length < 1 || error;

  useEffect(() => {
    async function fetchFilters(): Promise<void> {
      try {
        // TODO: We can try to load all the data before setting state so that Dropdown does not render multimple times
        const milestonesData = await filterDataHandler(
          getMilestonesCommand({
            owner: activeFilter.owner,
            repo: activeFilter.repo,
          })
        );
        milestonesData && setMilestones(milestonesData);

        const assigneesData = await filterDataHandler(
          getAssigneesCommand({
            owner: activeFilter.owner,
            repo: activeFilter.repo,
          })
        );
        assigneesData && setAssignees(assigneesData);

        const labelsData = await filterDataHandler(
          getLabelsCommand({
            owner: activeFilter.owner,
            repo: activeFilter.repo,
          })
        );
        labelsData && setLabels(labelsData);
      } catch (error) {
        // Log error to monitoring tool
      }
    }
    fetchFilters();
  }, [activeFilter?.owner, activeFilter?.repo]);
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
        <table className="table">
          <thead>
            <tr>
              <td>
                <div className="table__header">
                  <div className="table__header">
                    <span className="table__item table__item--hideable">
                      {milestones && (
                        <DropdownHeader
                          activeFilter={activeFilter}
                          clickHandler={memoizedHandleItemClick}
                          content={milestones}
                          name="Milestones"
                        />
                      )}
                    </span>
                    <span className="table__item">
                      <DropdownHeader
                        activeFilter={activeFilter}
                        clickHandler={memoizedHandleItemClick}
                        content={stateOptions}
                        name="State"
                      />
                    </span>
                    <span className="table__item">
                      {assignees && (
                        <DropdownHeader
                          activeFilter={activeFilter}
                          clickHandler={memoizedHandleItemClick}
                          content={assignees}
                          name="Assignee"
                        />
                      )}
                    </span>
                    <span className="table__item table__item--hideable">
                      {assignees && (
                        <DropdownHeader
                          activeFilter={activeFilter}
                          clickHandler={memoizedHandleItemClick}
                          content={assignees}
                          name="Creator"
                        />
                      )}
                    </span>
                    <span className="table__item table__item--hideable">
                      {assignees && (
                        <DropdownHeader
                          activeFilter={activeFilter}
                          clickHandler={memoizedHandleItemClick}
                          content={assignees}
                          name="Mentioned"
                        />
                      )}
                    </span>
                    <span className="table__item">
                      {labels && (
                        <DropdownHeader
                          activeFilter={activeFilter}
                          clickHandler={memoizedHandleItemClick}
                          content={labels}
                          name="Labels"
                        />
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="table__item">
                      <DropdownHeader
                        activeFilter={activeFilter}
                        clickHandler={memoizedHandleItemClick}
                        content={sortOptions}
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
                    <p className="table__notifText">
                      <Spinner data-testid="spinner" size="medium" />
                    </p>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td>
                    <p className="table__notifText">
                      {error
                        ? "Ooops! An error occured. Please try later"
                        : "There are no results matching your filters"}
                    </p>
                  </td>
                </tr>
              )
            ) : (
              <TableRow data={data} />
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

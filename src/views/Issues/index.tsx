import React, { Fragment, useState,  useEffect, useRef } from "react";
import { Box, Pagehead } from "@primer/components";

import type { FC } from "react";
import type { GlobalFilters, Issue } from "../../types";

import { dataHandler, getIssuesCommand } from "../../lib/dataHandler";
import PageHeader from "../../components/PageHeader";
import RepoSearchForm from "../../components/RepoSearchForm";
import ResultsTable from "../../components/ResultsTable";

import "./index.scss";

const Issues: FC = () => {
  const [globalFilters, setGlobalFilters] = useState<GlobalFilters>({
    owner: "",
    repo: "",
    milestone: "",
    state: "open",
    assignee: "",
    creator: "",
    mentioned: "",
    labels: "",
    sort: "",
    direction: "",
    per_page: 10,
    page: 1,
  });
  const [issues, setIssues] = useState<Array<Issue>>([]);
  const [error, setError] = useState(false);
  const didMount = useRef(false);

  // alternatively, we can use useReducer and useContext to avoid function plumbing
  const handleSearchSubmit = async (
    searchInput: Partial<GlobalFilters>
  ): Promise<void> => {
    setGlobalFilters((prevState) => ({ ...prevState, ...searchInput }));
  };

  useEffect(() => {
    async function fetchIssues(): Promise<void> {
      try {
        console.log("fetching");
        const response = await dataHandler.execute(
          getIssuesCommand(globalFilters)
        );
        if (Array.isArray(response)) {
          setIssues(response);
          error && setError(false);
        } else {
          throw new Error("Response is not an array");
        }
      } catch (error) {
        console.log("Error fetching issues");
        // setLoading(false);
        setError(true);
      }
    };

    if (didMount.current) fetchIssues();
    else didMount.current = true;
  }, [error, globalFilters]);

  const isRepoInfoSet =
    Boolean(globalFilters.owner) && Boolean(globalFilters.repo);

  return (
    <Fragment>
      <PageHeader />

      <Box display="grid" gridGap={3}>
        <Box
          m={3}
          p={3}
          borderColor="border.primary"
          borderWidth={1}
          borderStyle="solid"
        >
          <Pagehead className="pageHeadText">
            👋 Search, filter and view Github issues from any repository
          </Pagehead>
          <RepoSearchForm onSubmit={handleSearchSubmit} />
        </Box>
        {isRepoInfoSet ? (
          <ResultsTable
            currentPage={globalFilters.page}
            issues={issues}
            repoDetails={{
              owner: globalFilters.owner,
              repo: globalFilters.repo,
            }}
            error={error}
            onSubmit={handleSearchSubmit}
          />
        ) : null}
      </Box>
    </Fragment>
  );
};

export default Issues;

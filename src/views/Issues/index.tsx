import React, { Fragment, useState } from "react";
import { Box, Pagehead } from "@primer/components";

import type { FC } from "react";
import type { GlobalFilters } from "../../types";

import PageHeader from "../../components/PageHeader";
import RepoSearchForm from "../../components/RepoSearchForm";

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

  // alternatively, we can use useReducer and useContext to avoid function plumbing
  const handleSearchSubmit = async (
    searchInput: Partial<GlobalFilters>
  ): Promise<void> => {
    setGlobalFilters((prevState) => ({ ...prevState, ...searchInput }));
  };

  
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
      </Box>
    </Fragment>
  );
};

export default Issues;

import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Box, Pagehead } from "@primer/components";

import type { FC } from "react";
import type { GlobalFilters, Issue, GetIssuesCommand } from "../../types";

import { issueDataHandler } from "../../lib/dataHandler";
import PageHeader from "../../components/PageHeader";
import RepoSearchForm from "../../components/RepoSearchForm";
import ResultsTable from "../../components/ResultsTable";

import "./index.scss";

interface HomeProps {
  pageTitle: string;
  dataCommand: (value: GlobalFilters) => GetIssuesCommand;
}

const Home: FC<HomeProps> = ({ dataCommand, pageTitle }) => {
  // We can also lift the filter state and its change function up if there are going to be different types of filters, but for now both envisaged uses support same filter, no need to optimize prematurely
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

  const [data, setData] = useState<Array<Issue>>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const didMount = useRef(false);

  // alternatively, we can use useReducer and useContext to avoid passing callbacks down
  const memoizedHandleSearchSubmit = useCallback(
    async (searchInput: Partial<GlobalFilters>): Promise<void> => {
      setGlobalFilters((prevState) => ({ ...prevState, ...searchInput }));
    },
    []
  );

  useEffect(() => {
    async function fetchData(): Promise<void> {
      setLoading(true);
      try {
        const response = await issueDataHandler(dataCommand(globalFilters));
        if (Array.isArray(response)) {
          setData(response);
          setLoading(false);
          error && setError(false);
        } else {
          setError(true);
          setLoading(false);
          throw new Error("Response is not an array");
        }
      } catch (error) {
        console.warn("Error fetching issues");
      }
    }

    if (didMount.current) fetchData();
    else didMount.current = true;
  }, [dataCommand, error, globalFilters]);

  const isRepoInfoSet =
    Boolean(globalFilters.owner) && Boolean(globalFilters.repo);
  return (
    <Fragment>
      <PageHeader />

      <Box className="contentBox" display="grid" gridGap={3}>
        <Box
          m={3}
          p={3}
          borderColor="border.primary"
          borderWidth={1}
          borderStyle="solid"
        >
          <Pagehead className="contentBox__text">
            {pageTitle}
          </Pagehead>
          <RepoSearchForm onSubmit={memoizedHandleSearchSubmit} />
        </Box>
        {isRepoInfoSet ? (
          <ResultsTable
            activeFilter={globalFilters}
            currentPage={globalFilters.page}
            error={error}
            data={data}
            loading={loading}
            onSubmit={memoizedHandleSearchSubmit}
          />
        ) : null}
      </Box>
    </Fragment>
  );
};

export default Home;

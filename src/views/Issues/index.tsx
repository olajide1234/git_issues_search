import React, { Fragment } from "react";
import { Box, Pagehead } from "@primer/components";

import type { FC } from "react";

import PageHeader from "../../components/PageHeader";

import "./index.scss";

const Issues: FC = () => {

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
        </Box>
      </Box>
    </Fragment>
  );
};

export default Issues;

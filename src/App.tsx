import React from "react";
import { ThemeProvider } from "@primer/components";

import Home from "./views/Home";
import { getIssuesCommand } from "./lib/dataHandler";

import "./App.scss";

function App() {
  return (
    <ThemeProvider>
      {/* Just pass in a new title and getcommand to view pull requests (which is also a type of issue) only e.g
      <Home
        pageTitle={
          "👋 Search, filter and view Github pull requests from any repository"
        }
        dataCommand={getPullRequestCommand}
      /> */}
      <Home
        pageTitle={
          "👋 Search, filter and view Github issues from any repository"
        }
        dataCommand={getIssuesCommand}
      />
    </ThemeProvider>
  );
}

export default App;

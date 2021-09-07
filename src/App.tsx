import React from "react";
import { ThemeProvider } from "@primer/components";

import Issues from "./views/Issues";

import "./App.scss";

function App() {
  return (
    <ThemeProvider>
      <Issues />
    </ThemeProvider>
  );
}

export default App;

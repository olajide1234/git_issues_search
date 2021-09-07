import React from "react";
import { render, screen } from "@testing-library/react";
import Issues from "./index";

test("renders the header", () => {
  render(<Issues />);
  const headerText = screen.getByText(/IssueHub/i);
  const headerSubText = screen.getByText(/by Fus/i);
  expect(headerText).toBeInTheDocument();
  expect(headerSubText).toBeInTheDocument();
});

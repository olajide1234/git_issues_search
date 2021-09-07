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

test("renders the welcome text", () => {
  render(<Issues />);
  const welcomeText = screen.getByText(
    "👋 Search, filter and view Github issues from any repository"
  );
  expect(welcomeText).toBeInTheDocument();
});

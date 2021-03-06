import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the welcome text", () => {
  render(<App />);
  const welcomeText = screen.getByText(
    "👋 Search, filter and view Github issues from any repository"
  );
  expect(welcomeText).toBeInTheDocument();
});

test("contains search form", () => {
  render(<App />);
  const formField = screen.getByText("Repository owner");
  expect(formField).toBeInTheDocument();
});

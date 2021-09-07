import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import RepoSearchForm from "./index";

// We can setup global instance of react component for each test, instead of duplicating setup
test("renders the search form", () => {
  render(<RepoSearchForm onSubmit={(f) => f} />);
  const repoOwnerForm = screen.getByRole("textbox", {
    name: "Repository owner",
  });
  const repoNameForm = screen.getByRole("textbox", {
    name: "Repository name",
  });
  const submitButton = screen.getByRole("button", { name: "Search" });

  expect(repoOwnerForm).toBeInTheDocument();
  expect(repoNameForm).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test("submits search form", () => {
  let onSubmitMock = jest.fn();

  render(<RepoSearchForm onSubmit={onSubmitMock} />);
  const repoOwnerForm = screen.getByRole("textbox", {
    name: "Repository owner",
  });
  const repoNameForm = screen.getByRole("textbox", {
    name: "Repository name",
  });
  const submitButton = screen.getByRole("button", { name: "Search" });

  fireEvent.change(repoOwnerForm, { target: { value: "microsoft" } });
  fireEvent.change(repoNameForm, { target: { value: "typescript" } });
  fireEvent.click(submitButton);

  expect(onSubmitMock).toHaveBeenCalledWith({
    owner: "microsoft",
    repo: "typescript",
  });

  onSubmitMock.mockReset();
});

test("throw a validation error for repo owner", () => {
  const windowSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

  render(<RepoSearchForm onSubmit={(f) => f} />);
  const repoOwnerForm = screen.getByRole("textbox", {
    name: "Repository owner",
  });
  const repoNameForm = screen.getByRole("textbox", {
    name: "Repository name",
  });
  const submitButton = screen.getByRole("button", { name: "Search" });

  fireEvent.change(repoOwnerForm, { target: { value: "" } });
  fireEvent.change(repoNameForm, { target: { value: "typescript" } });
  fireEvent.click(submitButton);

  expect(windowSpy).toHaveBeenCalledWith(
    "Repository owner and name must be filled out"
  );

  windowSpy.mockRestore();
});

test("throw a validation error for repo name", () => {
  const windowSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

  render(<RepoSearchForm onSubmit={(f) => f} />);
  const repoOwnerForm = screen.getByRole("textbox", {
    name: "Repository owner",
  });
  const repoNameForm = screen.getByRole("textbox", {
    name: "Repository name",
  });
  const submitButton = screen.getByRole("button", { name: "Search" });

  fireEvent.change(repoOwnerForm, { target: { value: "microsoft" } });
  fireEvent.change(repoNameForm, { target: { value: "" } });
  fireEvent.click(submitButton);

  expect(windowSpy).toHaveBeenCalledWith(
    "Repository owner and name must be filled out"
  );

  windowSpy.mockRestore();
});

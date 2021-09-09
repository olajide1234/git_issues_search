import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import { getIssuesCommand } from "../../lib/dataHandler";
import { server, rest } from "../../__test__/server";

test("renders the header", () => {
  render(
    <Home
      pageTitle={"Sample"}
      dataCommand={getIssuesCommand}
    />
  );
  const headerText = screen.getByText(/IssueHub/i);
  const headerSubText = screen.getByText(/by Fus/i);
  expect(headerText).toBeInTheDocument();
  expect(headerSubText).toBeInTheDocument();
});

test("renders the welcome text", () => {
  render(
    <Home
      pageTitle={"Sample header"}
      dataCommand={getIssuesCommand}
    />
  );
  const welcomeText = screen.getByText(
    "Sample header"
  );
  expect(welcomeText).toBeInTheDocument();
});

test("fetches data for table", async () => {
  render(
    <Home
      pageTitle={"👋 Search, filter and view Github issues from any repository"}
      dataCommand={getIssuesCommand}
    />
  );

  const repoOwnerForm = screen.getByRole("textbox", {
    name: "Repository owner",
  });
  const repoNameForm = screen.getByRole("textbox", {
    name: "Repository name",
  });
  const submitButton = screen.getByRole("button", { name: "Search" });

  fireEvent.change(repoOwnerForm, { target: { value: "testowner" } });
  fireEvent.change(repoNameForm, { target: { value: "testrepo" } });
  fireEvent.click(submitButton);

  await screen.findByText("Found a lovely bug");
  expect(screen.getByText("Found a lovely bug")).toBeInTheDocument();
});

test("handles data fetch error", async () => {
  server.use(
    rest.get(
      "https://api.github.com/repos/testowner/testrepo/issues",
      async (req, res, ctx) => {
        return res(ctx.json("Error"), ctx.status(500));
      }
    )
  );

  render(
    <Home
      pageTitle={"👋 Search, filter and view Github issues from any repository"}
      dataCommand={getIssuesCommand}
    />
  );
  const repoOwnerForm = screen.getByRole("textbox", {
    name: "Repository owner",
  });
  const repoNameForm = screen.getByRole("textbox", {
    name: "Repository name",
  });
  const submitButton = screen.getByRole("button", { name: "Search" });

  fireEvent.change(repoOwnerForm, { target: { value: "testowner" } });
  fireEvent.change(repoNameForm, { target: { value: "testrepo" } });
  fireEvent.click(submitButton);

  await screen.findByText("Ooops! An error occured. Please try later");

  expect(
    screen.getByText("Ooops! An error occured. Please try later")
  ).toBeInTheDocument();
});

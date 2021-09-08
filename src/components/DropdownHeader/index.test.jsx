import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import DropdownHeader from "./index";

const activeFilter = {
  owner: "testowner",
  repo: "testrepo",
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
};

// We can setup global instance of react component for each test, instead of duplicating setup
test("renders the dropdown", () => {
  render(
    <DropdownHeader
      activeFilter={activeFilter}
      clickHandler={(f) => f}
      content={[
        { id: "open", primaryText: "Open", name: "state" },
        { id: "closed", primaryText: "Closed", name: "state" },
        { id: "all", primaryText: "All", name: "state" },
      ]}
      name="State"
    />
  );
  const title = screen.getByRole("heading", { name: "State" });
  const resetItem = screen.getByRole("menuitemcheckbox", {
    name: "RESET FILTER",
  });
  const openItem = screen.getByRole("menuitemcheckbox", { name: "Open" });
  const closeItem = screen.getByRole("menuitemcheckbox", { name: "Closed" });
  const allItem = screen.getByRole("menuitemcheckbox", { name: "All" });

  expect(title).toBeInTheDocument();
  expect(resetItem).toBeInTheDocument();
  expect(openItem).toBeInTheDocument();
  expect(closeItem).toBeInTheDocument();
  expect(allItem).toBeInTheDocument();
});

test("handles item click", () => {
  const onItemSubmitMock = jest.fn();

  render(
    <DropdownHeader
      activeFilter={activeFilter}
      clickHandler={onItemSubmitMock}
      content={[
        { id: "open", primaryText: "Open", name: "state" },
        { id: "closed", primaryText: "Closed", name: "state" },
        { id: "all", primaryText: "All", name: "state" },
      ]}
      name="State"
    />
  );

  const openItem = screen.getByRole("menuitemcheckbox", { name: "Open" });
  fireEvent.click(openItem);

  expect(onItemSubmitMock).toHaveBeenCalledWith({
    state: "open",
  });

  onItemSubmitMock.mockReset();
});

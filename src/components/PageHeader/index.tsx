import React from "react";
import type { FC } from "react";
import { Avatar, Header } from "@primer/components";

const PageHeader: FC = () => {
  return (
    <Header>
      <Header.Item>
        <Header.Link href="#" fontSize={2}>
          <span>IssueHub</span>
        </Header.Link>
      </Header.Item>
      <Header.Item full>by Fus</Header.Item>
      <Header.Item mr={0}>
        <Avatar
          src="https://github.com/octocat.png"
          size={20}
          square
          alt="@octocat"
        />
      </Header.Item>
    </Header>
  );
};

export default PageHeader;

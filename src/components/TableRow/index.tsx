import React, { Fragment } from "react";
import { Link } from "@primer/components";

import type { FC } from "react";
import type { Issue } from "../../types";

import IssueLabel from "../IssueLabel";

import "./index.scss";

interface TableRowProps {
  issues: Array<Issue>;
}

const TableRow: FC<TableRowProps> = ({ issues }) => {
  return (
    <Fragment>
      {issues.map((issue) => (
        <tr key={issue.id}>
          <div className="rowContent">
            <td>
              <span>
                <span className="rowTitle">
                  <Link href={issue.html_url}>{issue.title}</Link>
                  <span>
                    <IssueLabel labels={issue.labels} />
                  </span>
                </span>
              </span>
              <span>
                <span className="rowData">#{issue.number}</span> |
                <span className="rowData">Status: {issue.state}</span> |
                <span className="rowData">Opened by: {issue.user.login}</span> |
                <span className="rowData">
                  Opened on: &nbsp;
                  {new Date(issue.created_at).toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </span>
            </td>
          </div>
        </tr>
      ))}
    </Fragment>
  );
};

export default TableRow;

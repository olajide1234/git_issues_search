import React, { Fragment, useMemo } from "react";
import { Link } from "@primer/components";

import type { FC } from "react";
import type { Issue } from "../../types";

import IssueLabel from "../IssueLabel";

import "./index.scss";

interface TableRowProps {
  issues: Array<Issue>;
}

const TableRow: FC<TableRowProps> = ({ issues }) => {
  const dropDownComponent = useMemo(() => {
    return (
      <Fragment>
        {issues.map((issue) => (
          <tr key={issue.id}>
            <td>
              <div className="rowContent">
                <span>
                  <span className="rowContent__title">
                    <Link href={issue.html_url}>{issue.title}</Link>
                    <span>
                      <IssueLabel labels={issue.labels} />
                    </span>
                  </span>
                </span>
                <span className="rowContent__details">
                  <span className="rowContent__data">#{issue.number}</span>
                  <span className="rowContent__data">Status: {issue.state}</span>
                  <span className="rowContent__data">Opened by: {issue.user.login}</span>
                  <span className="rowContent__data">
                    Opened on: &nbsp;
                    {new Date(issue.created_at).toLocaleDateString(undefined, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </span>
              </div>
            </td>
          </tr>
        ))}
      </Fragment>
    );
  }, [issues]);

  return dropDownComponent;
};

export default TableRow;

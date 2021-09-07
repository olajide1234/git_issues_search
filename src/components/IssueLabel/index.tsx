import React, { Fragment } from "react";
import type { FC } from "react";

import { Label } from "@primer/components";

interface IssueLabelProps {
  labels: Array<{
    id: number;
    node_id: string;
    url: string;
    name: string;
    description: string;
    color: string;
    default: boolean;
  }>;
}

const IssueLabel: FC<IssueLabelProps> = ({ labels }) => {
  return (
    <Fragment>
      {labels.map((label, i) => (
        <Label
          key={i}
          variant="medium"
          sx={{ bg: label.color, color: "#24292E", m: 1 }}
        >
          {label.name}
        </Label>
      ))}
    </Fragment>
  );
};

export default IssueLabel;

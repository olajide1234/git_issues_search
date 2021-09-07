import React from "react";
import { SelectMenu, Text } from "@primer/components";

import type { FC } from "react";
import type { DropdownfilterGroup, GlobalFilters } from "../../types";

import "./index.scss";

interface DropdownHeaderProps {
  clickHandler: (param: Partial<GlobalFilters>) => void;
  content: DropdownfilterGroup;
  name: string;
  align?: "left" | "right" | undefined;
  width?: string | number;
}
const DropdownHeader: FC<DropdownHeaderProps> = ({
  clickHandler,
  content,
  name,
  align,
  width,
}) => {
  const handleItemClick = (param: Partial<GlobalFilters>) =>
    clickHandler(param);

  const updatedContent = [
    { id: "", name: content[0]?.name, primaryText: "RESET FILTER" },
    ...content,
  ];
  return (
    <SelectMenu css>
      <Text as="summary" className="title">
        {name}
        <span className="dropdownIcon"></span>
      </Text>
      <SelectMenu.Modal
        align={align ? align : undefined}
        width={width ? width : "300px"}
      >
        <SelectMenu.Header>{name}</SelectMenu.Header>
        <SelectMenu.List>
          {updatedContent.map((item, i) => (
            <SelectMenu.Item
              key={i}
              onClick={() => handleItemClick({ [item.name]: item.id })}
            >
              {item.primaryText} {item?.secondaryText}
            </SelectMenu.Item>
          ))}
        </SelectMenu.List>
      </SelectMenu.Modal>
    </SelectMenu>
  );
};

export default DropdownHeader;

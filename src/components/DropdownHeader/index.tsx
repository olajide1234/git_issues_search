import React, { useMemo } from "react";
import { SelectMenu, Text } from "@primer/components";

import type { FC } from "react";
import type { DropdownfilterGroup, GlobalFilters } from "../../types";

import "./index.scss";

interface DropdownHeaderProps {
  activeFilter: GlobalFilters;
  clickHandler: (param: Partial<GlobalFilters>) => void;
  content: DropdownfilterGroup;
  name: string;
  align?: "left" | "right" | undefined;
  width?: string | number;
}
const DropdownHeader: FC<DropdownHeaderProps> = ({
  activeFilter,
  clickHandler,
  content,
  name,
  align,
  width,
}) => {
  
  const dropDownComponent = useMemo(() => {
    const handleItemClick = (param: Partial<GlobalFilters>) =>
      clickHandler(param);

    const updatedContent = [
      { id: "", name: content[0]?.name, primaryText: "RESET FILTER" },
      ...content,
    ];

    return (
      <SelectMenu css className="dropDown">
        <Text as="summary" className="dropDown__title">
          {name}
          <span className="dropDown__icon--hidden"></span>
        </Text>
        <SelectMenu.Modal
          className="dropDown__modal"
          align={align ? align : undefined}
          width={width ? width : "300px"}
        >
          <SelectMenu.Header>{name}</SelectMenu.Header>
          <SelectMenu.List>
            {updatedContent.map((item, i) => {
              const onClick = (): void =>
                handleItemClick({ [item.name]: item.id });
              return (
                <SelectMenu.Item
                  key={i}
                  selected={activeFilter[item.name] === item.id}
                  onClick={onClick}
                >
                  {item.primaryText} {item?.secondaryText}
                </SelectMenu.Item>
              );
            })}
          </SelectMenu.List>
        </SelectMenu.Modal>
      </SelectMenu>
    );
  }, [activeFilter, align, clickHandler, content, name, width]);

  return dropDownComponent;
};

export default DropdownHeader;

import React, { useState } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";
const ExpandablePanel = ({ header, children }) => {
  const [expanded, setIsExpanded] = useState(false);
  const expandedPanelHandle = () => {
    setIsExpanded(!expanded);
  };
  return (
    <div>
      <div className="mb-2 border rounded">
        <div className="flex p-2 justify-between items-center">
          <div className="flex flex-row items-center justify-between ">
            {header}
          </div>
          <div onClick={expandedPanelHandle} className="cursor-pointer">
            {expanded ? <GoChevronDown /> : <GoChevronLeft />}
          </div>
        </div>
      </div>
      {expanded && <div className="p-2 border-t">{children}</div>}
    </div>
  );
};

export default ExpandablePanel;

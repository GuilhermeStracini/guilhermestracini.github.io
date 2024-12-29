import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCode,
  faFlask,
  faGlobe,
  faEllipsisH,
  faSortAlphaAsc,
  faSortAlphaDesc,
  faStar,
  faClock,
  faSort,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import "./FilterBar.css";

interface FilterIcon {
  icon: IconDefinition;
  filter: string;
  title: string;
}

const FILTER_ICONS: FilterIcon[] = [
  { icon: faFileCode, filter: 'template', title: 'Templates' },
  { icon: faFlask, filter: 'poc', title: 'POC' },
  { icon: faGlobe, filter: 'hello-world', title: 'Hello World' },
  { icon: faEllipsisH, filter: 'misc', title: 'Miscellaneous' },
];

interface FilterBarProps {
  onFilterChange: (filter: string) => void;
  onSortChange: (sortField: string, sortOrder: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  onFilterChange,
  onSortChange,
}) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [faSortAlpha, setFaSortAlpha] = useState(faSortAlphaAsc);

  const handleFilterClick = (filter: string): void => {
    setActiveFilter(filter === activeFilter ? null : filter);
    onFilterChange(filter === activeFilter ? "" : filter);
  };

  const handleSortFieldClick = (field: string): void => {
    setSortField(field);
    onSortChange(field, sortOrder);
  };

  const toggleSortOrder = (): void => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    onSortChange(sortField, newOrder);
    setFaSortAlpha(newOrder === "asc" ? faSortAlphaAsc : faSortAlphaDesc);
  };

  return (
    <div className="filter-bar">
      <div className="filter-icons">
        {FILTER_ICONS.map(({ icon, filter, title }) => (
          <FontAwesomeIcon
            key={filter}
            icon={icon}
            className={`filter-icon ${activeFilter === filter ? "active" : ""}`}
            onClick={() => handleFilterClick(filter)}
            title={title}
          />
        ))}
      </div>

      <div className="sort-controls">
        <FontAwesomeIcon
          icon={faSortAlpha}
          className={`sort-icon ${sortField === "name" ? "active" : ""}`}
          onClick={() => handleSortFieldClick("name")}
          title="Sort by Name"
        />
        <FontAwesomeIcon
          icon={faStar}
          className={`sort-icon ${
            sortField === "stargazers_count" ? "active" : ""
          }`}
          onClick={() => handleSortFieldClick("stargazers_count")}
          title="Sort by Stargazers"
        />
        <FontAwesomeIcon
          icon={faClock}
          className={`sort-icon ${sortField === "updated_at" ? "active" : ""}`}
          onClick={() => handleSortFieldClick("updated_at")}
          title="Sort by Recently Updated"
        />
        <FontAwesomeIcon
          icon={faSort}
          className="sort-order-toggle"
          onClick={toggleSortOrder}
          title={`Toggle Sort Order (${sortOrder.toUpperCase()})`}
        />
      </div>
    </div>
  );
};

export default FilterBar;

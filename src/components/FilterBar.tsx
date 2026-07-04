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
  { icon: faFileCode, filter: "template", title: "Templates" },
  { icon: faFlask, filter: "poc", title: "POC" },
  { icon: faGlobe, filter: "hello-world", title: "Hello World" },
  { icon: faEllipsisH, filter: "misc", title: "Miscellaneous" },
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
  };

  return (
    <div className="filter-bar">
      <div
        className="filter-icons"
        role="toolbar"
        aria-label="Repository filters"
      >
        {FILTER_ICONS.map(({ icon, filter, title }) => (
          <button
            key={filter}
            type="button"
            className={`pill-button ${activeFilter === filter ? "active" : ""}`}
            onClick={() => handleFilterClick(filter)}
            aria-pressed={activeFilter === filter}
          >
            <FontAwesomeIcon icon={icon} title={title} />
            <span>{title}</span>
          </button>
        ))}
      </div>

      <div
        className="sort-controls"
        role="toolbar"
        aria-label="Repository sort controls"
      >
        <button
          type="button"
          className={`pill-button ${sortField === "name" ? "active" : ""}`}
          onClick={() => handleSortFieldClick("name")}
          aria-pressed={sortField === "name"}
        >
          <FontAwesomeIcon
            icon={sortOrder === "asc" ? faSortAlphaAsc : faSortAlphaDesc}
            title="Sort by Name"
          />
          <span>Sort by Name</span>
        </button>
        <button
          type="button"
          className={`pill-button ${
            sortField === "stargazers_count" ? "active" : ""
          }`}
          onClick={() => handleSortFieldClick("stargazers_count")}
          aria-pressed={sortField === "stargazers_count"}
        >
          <FontAwesomeIcon icon={faStar} title="Sort by Stargazers" />
          <span>Sort by Stargazers</span>
        </button>
        <button
          type="button"
          className={`pill-button ${
            sortField === "updated_at" ? "active" : ""
          }`}
          onClick={() => handleSortFieldClick("updated_at")}
          aria-pressed={sortField === "updated_at"}
        >
          <FontAwesomeIcon icon={faClock} title="Sort by Recently Updated" />
          <span>Sort by Recently Updated</span>
        </button>
        <button
          type="button"
          className="pill-button sort-order-toggle"
          onClick={toggleSortOrder}
          aria-pressed={sortOrder === "asc"}
        >
          <FontAwesomeIcon
            icon={faSort}
            title={`Toggle Sort Order (${sortOrder.toUpperCase()})`}
          />
          <span>{sortOrder === "asc" ? "Ascending" : "Descending"}</span>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;

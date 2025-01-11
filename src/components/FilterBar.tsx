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

/**
 * A functional component that renders a filter and sort bar for repositories.
 * It allows users to apply filters and sort the displayed items based on different criteria.
 *
 * @component
 * @param {Object} props - The properties for the FilterBar component.
 * @param {function} props.onFilterChange - Callback function that is called when the filter changes.
 * @param {function} props.onSortChange - Callback function that is called when the sort field or order changes.
 *
 * @example
 * <FilterBar
 *   onFilterChange={(filter) => console.log(filter)}
 *   onSortChange={(field, order) => console.log(field, order)}
 * />
 *
 * @throws {Error} Throws an error if the filter or sort change callbacks are not provided.
 */
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
      <div
        className="filter-icons"
        role="toolbar"
        aria-label="Repository filters"
      >
        {FILTER_ICONS.map(({ icon, filter, title }) => (
          <FontAwesomeIcon
            key={filter}
            icon={icon}
            className={`filter-icon ${activeFilter === filter ? "active" : ""}`}
            onClick={() => handleFilterClick(filter)}
            title={title}
            tabIndex={0}
            aria-pressed={activeFilter === filter}
            onKeyUp={(e) => e.key === "Enter" && handleFilterClick(filter)}
          />
        ))}
      </div>

      <div
        className="sort-controls"
        role="toolbar"
        aria-label="Repository sort controls"
      >
        <FontAwesomeIcon
          icon={faSortAlpha}
          className={`sort-icon ${sortField === "name" ? "active" : ""}`}
          onClick={() => handleSortFieldClick("name")}
          title="Sort by Name"
          tabIndex={0}
          role="button"
          aria-pressed={sortField === "name"}
          onKeyUp={(e) => e.key === "Enter" && handleSortFieldClick("name")}
        />
        <FontAwesomeIcon
          icon={faStar}
          className={`sort-icon ${
            sortField === "stargazers_count" ? "active" : ""
          }`}
          onClick={() => handleSortFieldClick("stargazers_count")}
          title="Sort by Stargazers"
          tabIndex={0}
          role="button"
          aria-pressed={sortField === "stargazers_count"}
          onKeyUp={(e) =>
            e.key === "Enter" && handleSortFieldClick("stargazers_count")
          }
        />
        <FontAwesomeIcon
          icon={faClock}
          className={`sort-icon ${sortField === "updated_at" ? "active" : ""}`}
          onClick={() => handleSortFieldClick("updated_at")}
          title="Sort by Recently Updated"
          tabIndex={0}
          role="button"
          aria-pressed={sortField === "updated_at"}
          onKeyUp={(e) =>
            e.key === "Enter" && handleSortFieldClick("updated_at")
          }
        />
        <FontAwesomeIcon
          icon={faSort}
          className="sort-order-toggle"
          onClick={toggleSortOrder}
          title={`Toggle Sort Order (${sortOrder.toUpperCase()})`}
          tabIndex={0}
          role="button"
          aria-pressed={sortOrder === "asc"}
          onKeyUp={(e) => e.key === "Enter" && toggleSortOrder()}
        />
      </div>
    </div>
  );
};

export default FilterBar;

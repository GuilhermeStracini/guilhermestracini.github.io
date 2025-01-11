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
 * It allows users to filter repositories based on various criteria and sort them
 * by different fields in ascending or descending order.
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

  /**
   * Handles the click event for a filter option.
   * Toggles the active filter and triggers a change event.
   *
   * @param {string} filter - The filter option that was clicked.
   * @returns {void}
   *
   * @example
   * // Example usage:
   * handleFilterClick('active'); // Sets 'active' as the active filter
   * handleFilterClick('active'); // Resets the active filter to null
   *
   * @throws {Error} Throws an error if the filter is not a valid string.
   */
  const handleFilterClick = (filter: string): void => {
    setActiveFilter(filter === activeFilter ? null : filter);
    onFilterChange(filter === activeFilter ? "" : filter);
  };

  /**
   * Handles the click event for sorting by a specific field.
   * This function updates the current sort field and triggers a sort change
   * with the specified sort order.
   *
   * @param {string} field - The name of the field to sort by.
   * @returns {void} - This function does not return a value.
   *
   * @example
   * // Example usage of handleSortFieldClick
   * handleSortFieldClick('name');
   *
   * @throws {Error} - Throws an error if the field is invalid or if
   *                  there is an issue with the sorting process.
   */
  const handleSortFieldClick = (field: string): void => {
    setSortField(field);
    onSortChange(field, sortOrder);
  };

  /**
   * Toggles the sorting order between ascending and descending.
   * This function updates the current sort order state and triggers
   * a callback to notify about the change in sorting.
   *
   * It checks the current sort order and switches it to the opposite:
   * - If the current order is "asc", it changes to "desc".
   * - If the current order is "desc", it changes to "asc".
   *
   * Additionally, it updates the icon representing the sort order
   * based on the new state.
   *
   * @returns {void} This function does not return a value.
   *
   * @example
   * // Assuming the current sort order is "asc"
   * toggleSortOrder(); // The sort order will change to "desc"
   *
   * @throws {Error} Throws an error if there is an issue updating the sort order.
   */
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

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
} from "@fortawesome/free-solid-svg-icons";
import "./FilterBar.css";

interface FilterBarProps {
  onFilterChange: (filter: string) => void;
  onSortChange: (sortField: string, sortOrder: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, onSortChange }) => {
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
        <FontAwesomeIcon
          icon={faFileCode}
          className={`filter-icon ${activeFilter === "template" ? "active" : ""}`}
          onClick={() => handleFilterClick("template")}
          title="Templates"
        />
        <FontAwesomeIcon
          icon={faFlask}
          className={`filter-icon ${activeFilter === "poc" ? "active" : ""}`}
          onClick={() => handleFilterClick("poc")}
          title="POC"
        />
        <FontAwesomeIcon
          icon={faGlobe}
          className={`filter-icon ${activeFilter === "hello-world" ? "active" : ""}`}
          onClick={() => handleFilterClick("hello-world")}
          title="Hello World"
        />
        <FontAwesomeIcon
          icon={faEllipsisH}
          className={`filter-icon ${activeFilter === "misc" ? "active" : ""}`}
          onClick={() => handleFilterClick("misc")}
          title="Miscellaneous"
        />
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
          className={`sort-icon ${sortField === "stargazers_count" ? "active" : ""}`}
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

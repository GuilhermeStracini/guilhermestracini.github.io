import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { GitHubRepo } from "./types/GitHubRepo";
import RepositoriesCards from "./components/RepositoriesCards";
import PersonalLinks from "./components/PersonalLinks";
import Footer from "./components/Footer";
import FilterBar from "./components/FilterBar";
import "./App.css";

/**
 * Main application component that fetches and displays GitHub repositories.
 * It provides functionalities for searching, filtering, and sorting the repositories.
 *
 * @component
 * @returns {JSX.Element} The rendered application component.
 *
 * @example
 * // Usage in a React application
 * <App />
 */
const App: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [repoCount, setRepoCount] = useState<number>(0);
  const [filteredCount, setFilteredCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const [searchQuery, setSearchQuery] = useState("");

  const type = "orgs";
  const username = "GuilhermeStracini";
  const baseUrl = "https://api.github.com";
  const url = `${baseUrl}/${type}/${username}/repos?per_page=100&sort=full_name&order=asc`;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setRepos(response.data);
        setRepoCount(response.data.length);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load repositories.");
        setLoading(false);
      });
  }, [url]);

  const filterAndSortRepos = useCallback((): GitHubRepo[] => {
    const searchQueryLower = searchQuery.toLowerCase();
    const filtered = repos.filter((repo) => {
      if (searchQuery) {
        const foundInName = repo.name.toLowerCase().includes(searchQueryLower);
        const foundInDescription =
          repo.description?.toLowerCase()?.includes(searchQueryLower) ?? false;

        if (!foundInName && !foundInDescription) {
          return false;
        }
      }

      if (!activeFilter) return true;
      if (activeFilter === "template") return repo.is_template;
      if (activeFilter === "poc")
        return !repo.is_template && repo.name.toLowerCase().startsWith("poc-");
      if (activeFilter === "hello-world")
        return (
          !repo.is_template && repo.name.toLowerCase().startsWith("hello-world")
        );
      if (activeFilter === "misc")
        return (
          !repo.is_template &&
          !repo.name.toLowerCase().startsWith("poc-") &&
          !repo.name.toLowerCase().startsWith("hello-world")
        );
      return true;
    });

    const sorted = [...filtered].sort((a, b) => {
      const fieldA = a[sortField as keyof typeof a];
      const fieldB = b[sortField as keyof typeof b];

      if (fieldA === null || fieldB === null) return 0;

      if (typeof fieldA === "string" && typeof fieldB === "string") {
        return sortOrder === "asc"
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }

      if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [repos, activeFilter, sortField, sortOrder, searchQuery]);

  const filteredRepos = useMemo(
    () => filterAndSortRepos(),
    [filterAndSortRepos]
  );

  useEffect(() => {
    setFilteredCount(filterAndSortRepos().length);
  }, [repos, activeFilter, sortField, sortOrder, filterAndSortRepos]);

  /**
   * Handles the change event for a search input field.
   * This function updates the search query state with the current value of the input.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event triggered by the input field.
   * @returns {void} This function does not return a value.
   *
   * @example
   * // Example usage in a React component
   * <input type="text" onChange={handleSearchChange} />
   *
   * @throws {Error} Throws an error if the event is not a valid change event.
   */
  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchQuery(event.target.value);
  };

  /**
   * Handles the change of a filter by updating the active filter state.
   *
   * This function is typically used in scenarios where a user selects a new filter option,
   * and it updates the application state accordingly.
   *
   * @param {string} filter - The new filter value to set as active.
   * @returns {void} This function does not return a value.
   *
   * @example
   * // Example usage:
   * handleFilterChange('newFilterValue');
   *
   * @throws {Error} Throws an error if the filter is not a valid string.
   */
  const handleFilterChange = (filter: string): void => {
    setActiveFilter(filter);
  };

  /**
   * Handles the change in sorting parameters by updating the sort field and order.
   *
   * This function is typically used in scenarios where a user selects a different sorting option
   * in a user interface, allowing the application to respond accordingly by setting the new sort criteria.
   *
   * @param {string} field - The field by which to sort the data. This should correspond to a valid
   *                         property of the data being sorted.
   * @param {string} order - The order in which to sort the data. This can be either 'asc' for ascending
   *                         order or 'desc' for descending order.
   *
   * @returns {void} This function does not return a value.
   *
   * @throws {Error} Throws an error if the provided field is invalid or if the order is not 'asc' or 'desc'.
   *
   * @example
   * // Example usage of handleSortChange
   * handleSortChange('name', 'asc');
   */
  const handleSortChange = (field: string, order: string): void => {
    setSortField(field);
    setSortOrder(order);
  };

  return (
    <div className="app">
      <header>
        <h1>GitHub Repositories</h1>
        <div className="repo-count-badge">
          <span>
            {filteredCount} / {repoCount} Repositories
          </span>
        </div>
      </header>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search repositories..."
          value={searchQuery}
          onChange={handleSearchChange}
          aria-label="Search repositories"
          role="searchbox"
          aria-describedby="search-description"
        />
        <span id="search-description" className="sr-only">
          Search repositories by name or description
        </span>
      </div>
      <FilterBar
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      <main>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            {error ? (
              <div className="error">{error}</div>
            ) : (
              <RepositoriesCards repos={filteredRepos} />
            )}
          </>
        )}
      </main>
      <PersonalLinks />
      <Footer />
    </div>
  );
};

export default App;

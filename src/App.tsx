import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { GitHubRepo } from "./types/GitHubRepo";
import RepositoriesCards from "./components/RepositoriesCards";
import PersonalLinks from "./components/PersonalLinks";
import Footer from "./components/Footer";
import FilterBar from "./components/FilterBar";
import "./App.css";

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
    [filterAndSortRepos],
  );

  useEffect(() => {
    setFilteredCount(filterAndSortRepos().length);
  }, [repos, activeFilter, sortField, sortOrder, filterAndSortRepos]);

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (filter: string): void => {
    setActiveFilter(filter);
  };

  const handleSortChange = (field: string, order: string): void => {
    setSortField(field);
    setSortOrder(order);
  };

  const hasActiveFilters = Boolean(activeFilter) || searchQuery.length > 0;

  const [filterResetKey, setFilterResetKey] = useState(0);

  const clearFilters = (): void => {
    setActiveFilter(null);
    setSearchQuery("");
    setFilterResetKey((key) => key + 1);
  };

  return (
    <div className="app">
      <div className="top-bar">
        <span className="brand">Guilherme Stracini</span>
        <PersonalLinks />
      </div>

      <header>
        <h1>GitHub Repositories</h1>
        <p className="subtitle">
          A showcase of POCs, hello-world projects, and templates.
        </p>
        <div className="repo-count-badge">
          <span>
            {filteredCount} / {repoCount} Repositories
          </span>
        </div>
      </header>

      <div className="toolbar">
        <div className="search-bar-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
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
          key={filterResetKey}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
      </div>

      <main>
        {loading ? (
          <>
            <p className="loading">Loading repositories...</p>
            <div className="repo-grid" aria-hidden="true">
              {Array.from({ length: 8 }).map((_, index) => (
                <div className="repo-card skeleton" key={index}>
                  <div className="skeleton-line title" />
                  <div className="skeleton-line text" />
                  <div className="skeleton-line text short" />
                  <div className="skeleton-line cta" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {error ? (
              <div className="error">{error}</div>
            ) : filteredCount === 0 ? (
              <div className="empty-state">
                <FontAwesomeIcon icon={faFolderOpen} className="empty-icon" />
                <p>No repositories match your search or filters.</p>
                {hasActiveFilters && (
                  <button
                    type="button"
                    className="pill-button"
                    onClick={clearFilters}
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <RepositoriesCards repos={filteredRepos} />
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;

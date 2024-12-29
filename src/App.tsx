import { useState, useEffect } from "react";
import axios from "axios";
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

  import { useState, useEffect, useCallback, useMemo } from "react";

  const filterAndSortRepos = useCallback((): GitHubRepo[] => {
    const filtered = repos.filter((repo) => {
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

      if(typeof fieldA === "string" && typeof fieldB === "string") {
        return sortOrder === "asc" ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
      }

      if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [repos, activeFilter, sortField, sortOrder]);

  const filteredRepos = useMemo(() => filterAndSortRepos(), [filterAndSortRepos]);

  useEffect(() => {
    setFilteredCount(filterAndSortRepos().length);
  }, [repos, activeFilter, sortField, sortOrder, filterAndSortRepos]);

  const handleFilterChange = (filter: string): void => {
    setActiveFilter(filter);
  };

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
              <RepositoriesCards repos={filterAndSortRepos()} />
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

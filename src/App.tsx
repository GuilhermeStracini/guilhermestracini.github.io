import { useState, useEffect } from "react";
import axios from "axios";
import { GitHubRepo } from "./types/GitHubRepo";
import RepositoriesCards from "./components/RepositoriesCards";
import PersonalLinks from "./components/PersonalLinks";
import Footer from "./components/Footer";
import "./App.css";

const App: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([]);
  const [repoCount, setRepoCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [sort, setSort] = useState<string>("name");

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
        setFilteredRepos(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load repositories.");
        setLoading(false);
      });
  }, [url]);

  useEffect(() => {
    let updatedRepos = [...repos];

    // Apply filter
    if (filter !== "all") {
      updatedRepos = updatedRepos.filter((repo) => {
        switch (filter) {
          case "templates":
            return repo.is_template;
          case "poc":
            return repo.name.toLowerCase().includes("poc");
          case "hello-world":
            return repo.name.toLowerCase().includes("hello-world");
          case "misc":
            return !repo.is_template &&
              !repo.name.toLowerCase().includes("poc") &&
              !repo.name.toLowerCase().includes("hello-world");
          default:
            return true;
        }
      });
    }

    // Apply sorting
    updatedRepos.sort((a, b) => {
      switch (sort) {
        case "name":
          return a.name.localeCompare(b.name);
        case "stargazers":
          return b.stargazers_count - a.stargazers_count;
        case "recently-updated":
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        case "type":
          return a.is_template === b.is_template ? 0 : a.is_template ? -1 : 1;
        default:
          return 0;
      }
    });

    setFilteredRepos(updatedRepos);
  }, [filter, sort, repos]);

  return (
    <div className="app">
      <header>
        <h1>GitHub Repositories</h1>
        <div className="repo-count-badge">
          <span>{repoCount} Repositories</span>
        </div>
      </header>
      <main>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            <div className="filter-bar">
              <label>
                Filter by:
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="templates">Templates</option>
                  <option value="poc">POC</option>
                  <option value="hello-world">Hello-world</option>
                  <option value="misc">Misc</option>
                </select>
              </label>
              <label>
                Sort by:
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="name">Name</option>
                  <option value="stargazers">Stargazers</option>
                  <option value="recently-updated">Recently Updated</option>
                  <option value="type">Type</option>
                </select>
              </label>
            </div>
            <RepositoriesCards repos={filteredRepos} />
          </>
        )}
      </main>
      <PersonalLinks />
      <Footer />
    </div>
  );
};

export default App;

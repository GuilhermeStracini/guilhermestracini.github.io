import { useState, useEffect } from "react";
import axios from "axios";
import { GitHubRepo } from "./types/GitHubRepo";
import RepositoriesCards from "./components/RepositoriesCards";
import PersonalLinks from "./components/PersonalLinks";
import Footer from "./components/Footer";
import "./App.css";

const App: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [repoCount, setRepoCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
          <RepositoriesCards repos={repos} />
        )}
      </main>
      <PersonalLinks />
      <Footer />
    </div>
  );
};

export default App;

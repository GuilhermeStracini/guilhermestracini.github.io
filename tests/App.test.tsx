import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "../src/App";
import { GitHubRepo } from "../src/types/GitHubRepo";
import { vi } from "vitest";

vi.mock("axios");

describe("App component", () => {
  const mockRepos: GitHubRepo[] = [
    { id: 1, name: "Repo1", stargazers_count: 10, is_template: false, description: "Description 1", html_url: "https://github.com/Repo1" },
    { id: 2, name: "Repo2", stargazers_count: 20, is_template: true, description: "Description 2", html_url: "https://github.com/Repo2" },
  ];

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the loading state initially", () => {
    (axios.get as vi.Mock).mockResolvedValue({ data: [] });

    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("displays an error message when the API call fails", async () => {
    (axios.get as vi.Mock).mockRejectedValue(new Error("Network Error"));

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/failed to load repositories/i)).toBeInTheDocument();
    });
  });

  it("displays the repositories and updates the repository count", async () => {
    (axios.get as vi.Mock).mockResolvedValue({ data: mockRepos });

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/2 repositories/i)).toBeInTheDocument();
      expect(screen.getByText(/repo1/i)).toBeInTheDocument();
      expect(screen.getByText(/repo2/i)).toBeInTheDocument();
    });
  });

  it("renders the PersonalLinks and Footer components", async () => {
    (axios.get as vi.Mock).mockResolvedValue({ data: mockRepos });

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/connect with me/i)).toBeInTheDocument();
      expect(screen.getByText(/developed by/i)).toBeInTheDocument();
    });
  });
});

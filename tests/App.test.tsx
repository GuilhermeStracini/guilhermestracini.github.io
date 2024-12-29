import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import App from "../src/App";
import { GitHubRepo } from "../src/types/GitHubRepo";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("axios");

describe("App component", () => {
  const mockRepos: GitHubRepo[] = [
    {
      id: 1,
      name: "Repo1",
      stargazers_count: 10,
      is_template: false,
      description: "Description 1",
      html_url: "https://github.com/Repo1",
      full_name: "user/Repo1",
      forks_count: 3,
      language: null,
      topics: [],
      created_at: "",
      updated_at: "",
      visibility: "public",
    },
    {
      id: 2,
      name: "Repo2",
      stargazers_count: 20,
      is_template: true,
      description: "Description 2",
      html_url: "https://github.com/Repo2",
      full_name: "user/Repo2",
      forks_count: 10,
      language: null,
      topics: [],
      created_at: "",
      updated_at: "",
      visibility: "public",
    },
    {
      id: 3,
      name: "hello-world-repo",
      stargazers_count: 5,
      is_template: false,
      description: "Hello World Repo",
      html_url: "https://github.com/hello-world-repo",
      full_name: "user/hello-world-repo",
      forks_count: 0,
      language: null,
      topics: [],
      created_at: "",
      updated_at: "",
      visibility: "public",
    },
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
      expect(
        screen.getByText(/failed to load repositories/i)
      ).toBeInTheDocument();
    });
  });

  it("displays the repositories and updates the repository count", async () => {
    (axios.get as vi.Mock).mockResolvedValue({ data: mockRepos });

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/3 repositories/i)).toBeInTheDocument();
      expect(screen.getByText(/repo1/i)).toBeInTheDocument();
      expect(screen.getByText(/repo2/i)).toBeInTheDocument();
      expect(screen.getByText(/hello-world-repo/i)).toBeInTheDocument();
    });
  });

  it("filters repositories by template", async () => {
    (axios.get as vi.Mock).mockResolvedValue({ data: mockRepos });

    render(<App />);
    await waitFor(() => screen.getByText(/repo2/i)); // Ensure data is loaded

    const templateButton = screen.getByLabelText(/templates/i);
    fireEvent.click(templateButton);

    await waitFor(() => {
      expect(screen.queryByText(/repo1/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/hello-world-repo/i)).not.toBeInTheDocument();
      expect(screen.getByText(/repo2/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/1 \/ 3 repositories/i)).toBeInTheDocument();
  });

  it("filters repositories by 'hello-world'", async () => {
    (axios.get as vi.Mock).mockResolvedValue({ data: mockRepos });

    render(<App />);
    await waitFor(() => screen.getByText(/repo2/i)); // Ensure data is loaded

    const helloWorldButton = screen.getByTitle(/Hello World/i);
    fireEvent.click(helloWorldButton);

    await waitFor(() => {
      expect(screen.queryByText(/repo1/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/repo2/i)).not.toBeInTheDocument();
      expect(screen.getByText(/hello-world-repo/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/1 \/ 3 repositories/i)).toBeInTheDocument();
  });

  it("sorts repositories by stargazers in ascending order", async () => {
    (axios.get as vi.Mock).mockResolvedValue({ data: mockRepos });

    render(<App />);
    await waitFor(() => screen.getByText(/repo2/i)); // Ensure data is loaded

    const sortField = screen.getByLabelText(/sort by stargazers/i);

    fireEvent.click(sortField); // Select stargazers as sort field

    const sortedRepos = await screen.findAllByText(/repo/i);

    expect(sortedRepos[2]).toHaveTextContent(/hello-world-repo/i);
    expect(sortedRepos[5]).toHaveTextContent(/repo1/i);
    expect(sortedRepos[7]).toHaveTextContent(/repo2/i);
  });

  it("toggles sorting order to descending and sorts correctly", async () => {
    (axios.get as vi.Mock).mockResolvedValue({ data: mockRepos });

    render(<App />);
    await waitFor(() => screen.getByText(/repo2/i)); // Ensure data is loaded

    const sortButton = screen.getByLabelText(/toggle sort order/i);
    const sortField = screen.getByLabelText(/sort by stargazers/i);

    fireEvent.click(sortField); // Select stargazers as sort field
    fireEvent.click(sortButton); // Toggle to descending

    const sortedRepos = await screen.findAllByText(/repo/i);
    expect(sortedRepos[2]).toHaveTextContent(/repo2/i);
    expect(sortedRepos[4]).toHaveTextContent(/repo1/i);
    expect(sortedRepos[6]).toHaveTextContent(/hello-world-repo/i);
  });

  it("renders the PersonalLinks and Footer components", async () => {
    (axios.get as vi.Mock).mockResolvedValue({ data: mockRepos });

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/connect with me/i)).toBeInTheDocument();
      expect(screen.getByText(/developed by/i)).toBeInTheDocument();
    });
  });

  it("updates the filtered count when filters are applied", async () => {
    (axios.get as vi.Mock).mockResolvedValue({ data: mockRepos });

    render(<App />);
    await waitFor(() => screen.getByText(/repo2/i)); // Ensure data is loaded

    const templateButton = screen.getByLabelText(/templates/i);
    fireEvent.click(templateButton);

    await waitFor(() => {
      expect(screen.getByText(/1 \/ 3 repositories/i)).toBeInTheDocument();
    });

    const helloWorldButton = screen.getByLabelText(/Hello World/i);
    fireEvent.click(helloWorldButton);

    await waitFor(() => {
      expect(screen.getByText(/1 \/ 3 repositories/i)).toBeInTheDocument();
    });
  });

  it("updates the filtered count when sorting is applied", async () => {
    (axios.get as vi.Mock).mockResolvedValue({ data: mockRepos });

    render(<App />);
    await waitFor(() => screen.getByText(/repo2/i)); // Ensure data is loaded

    const sortButton = screen.getByLabelText(/toggle sort order/i);
    const sortField = screen.getByLabelText(/sort by stargazers/i);

    fireEvent.click(sortField); // Select stargazers as sort field
    fireEvent.click(sortButton); // Toggle to ascending order

    await waitFor(() => {
      expect(screen.getByText(/3 \/ 3 repositories/i)).toBeInTheDocument();
    });
  });
});

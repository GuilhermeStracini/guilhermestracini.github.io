// tests/RepositoriesCards.test.tsx
import { render, screen } from "@testing-library/react";
import RepositoriesCards from "../../src/components/RepositoriesCards"; // Adjust the path as needed
import "@testing-library/jest-dom";
import { RepositoriesCardsProps } from "../../src/types/RepositoriesCardsProps";

describe("RepositoriesCards component", () => {
  const mockRepos: RepositoriesCardsProps["repos"] = [
    {
      id: 1,
      name: "Repository One",
      stargazers_count: 42,
      description: "A sample repository",
      html_url: "https://github.com/user/repository-one",
      is_template: false,
    },
    {
      id: 2,
      name: "Template Repo",
      stargazers_count: 10,
      description: "",
      html_url: "https://github.com/user/template-repo",
      is_template: true,
    },
  ];

  it("renders the correct number of repository cards", () => {
    render(<RepositoriesCards repos={mockRepos} />);
    const cards = screen.getAllByRole("heading", { level: 2 });
    expect(cards).toHaveLength(2);
  });

  it("renders no cards when repositories array is empty", () => {
    render(<RepositoriesCards repos={[]} />);
    const cards = screen.queryAllByRole("heading", { level: 2 });
    expect(cards).toHaveLength(0);
  });

  it("renders repository details correctly", () => {
    render(<RepositoriesCards repos={mockRepos} />);
  
    // Verify the first repository details
    const repoOne = screen.getByText("Repository One");
    expect(repoOne).toBeInTheDocument();
    const repoOneStars = screen.getByText("42");
    expect(repoOneStars).toBeInTheDocument();
    const repoOneDescription = screen.getByText("A sample repository");
    expect(repoOneDescription).toBeInTheDocument();
  
    // Verify all links and their URLs
    const links = screen.getAllByRole("link", { name: /view repository/i });
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "https://github.com/user/repository-one");
    expect(links[1]).toHaveAttribute("href", "https://github.com/user/template-repo");
  
    // Verify the second repository details
    const templateRepo = screen.getByText("Template Repo");
    expect(templateRepo).toBeInTheDocument();
    const templateRepoStars = screen.getByText("10");
    expect(templateRepoStars).toBeInTheDocument();
    const templateRepoDescription = screen.getByText("No description provided.");
    expect(templateRepoDescription).toBeInTheDocument();
    const templateBadge = screen.getByText("Template");
    expect(templateBadge).toBeInTheDocument();
  });
  

  it("renders a default message when description is missing", () => {
    render(<RepositoriesCards repos={mockRepos} />);
    const defaultDescription = screen.getByText("No description provided.");
    expect(defaultDescription).toBeInTheDocument();
  });
});

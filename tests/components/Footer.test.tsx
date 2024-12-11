// tests/Footer.test.tsx
import { render, screen } from "@testing-library/react";
import Footer from "../../src/components/Footer"; // Adjust the path as needed
import "@testing-library/jest-dom";

describe("Footer component", () => {
  it("renders the footer with developer information", () => {
    render(<Footer />);

    // Check for the developer's name link
    const developerLink = screen.getByRole("link", {
      name: /Guilherme Branco Stracini/i,
    });
    expect(developerLink).toBeInTheDocument();
    expect(developerLink).toHaveAttribute(
      "href",
      expect.stringContaining("guibranco.github.io")
    );

    // Check for the GitHub link
    const githubLinks = screen.getAllByRole("link", { name: /GitHub/i });
    expect(githubLinks.length).toBe(2);
    githubLinks.forEach((link) =>
      expect(link).toHaveAttribute("href", "https://github.com/GuilhermeStracini")
    );

    // Check for the developer's image
    const developerImage = screen.getByRole("img", {
      name: /Guilherme Branco Stracini/i,
    });
    expect(developerImage).toBeInTheDocument();
    expect(developerImage).toHaveAttribute(
      "src",
      "https://guibranco.github.io/photo.png"
    );
  });

  it("renders the SVG icon in the footer", () => {
    render(<Footer />);

    // Check for the SVG element
    const svgIcon = screen.getByRole("img", { name: /GitHub/i });
    expect(svgIcon).toBeInTheDocument();
  });
});

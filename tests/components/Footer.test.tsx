import { render, screen } from "@testing-library/react";
import Footer from "../../src/components/Footer";
import '@testing-library/jest-dom';

describe("Footer component", () => {
  it("renders the footer with developer information", () => {
    render(<Footer />);

    // Verify the "Guilherme Branco Stracini" links
    const developerLinks = screen.getAllByRole("link", {
      name: /Guilherme Branco Stracini/i,
    });
    expect(developerLinks).toHaveLength(2);

    // Check the first link
    expect(developerLinks[0]).toHaveAttribute(
      "href",
      "https://guibranco.github.io?utm_campaign=project&utm_media=guilhermestracini+portfolio&utm_source=guilhermestracini.github.io"
    );

    // Check the second link
    expect(developerLinks[1]).toHaveAttribute(
      "href",
      "https://guibranco.github.io/?utm_campaign=project&utm_media=guilhermestracini+portfolio&utm_source=guilhermestracini.github.io"
    );

    // Verify the GitHub links
    const githubLinks = screen.getAllByRole("link", { name: /GitHub/i });
    expect(githubLinks).toHaveLength(2);

    // Check the first GitHub link
    expect(githubLinks[0]).toHaveAttribute(
      "href",
      "https://github.com/GuilhermeStracini"
    );

    // Check the second GitHub link
    expect(githubLinks[1]).toHaveAttribute(
      "href",
      "https://github.com/GuilhermeStracini"
    );

    // Additional assertions can verify images or other content
    const image = screen.getByRole("img", { name: /Guilherme Branco Stracini/i });
    expect(image).toHaveAttribute(
      "src",
      "https://guibranco.github.io/photo.png"
    );
    expect(image).toHaveAttribute("alt", "Guilherme Branco Stracini");
  });
});

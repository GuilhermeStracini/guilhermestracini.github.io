// tests/PersonalLinks.test.tsx
import { render, screen } from "@testing-library/react";
import PersonalLinks from "../../src/components/PersonalLinks"; // Adjust the path as needed
import "@testing-library/jest-dom";

describe("PersonalLinks component", () => {
  it("renders all personal links with the correct text and URLs", () => {
    render(<PersonalLinks />);

    // Verify Portfolio links
    const portfolioLinks = screen.getAllByRole("link", { name: /Portfolio/i });
    expect(portfolioLinks).toHaveLength(2);

    expect(portfolioLinks[0]).toHaveAttribute(
      "href",
      "https://guilhermebranco.com.br",
    );
    expect(portfolioLinks[1]).toHaveAttribute(
      "href",
      "https://zerocool.com.br",
    );

    // Verify Personal Blog link
    const blogLink = screen.getByRole("link", { name: /Personal Blog/i });
    expect(blogLink).toHaveAttribute(
      "href",
      "https://blog.guilhermebranco.com.br",
    );

    // Verify GitHub links
    const githubLinks = screen.getAllByRole("link", { name: /GitHub/i });
    expect(githubLinks).toHaveLength(3);

    expect(githubLinks[0]).toHaveAttribute("href", "https://bot.straccini.com");
    expect(githubLinks[1]).toHaveAttribute(
      "href",
      "https://github.com/guibranco",
    );
    expect(githubLinks[2]).toHaveAttribute(
      "href",
      "https://github.com/GuilhermeStracini",
    );

    // Verify LinkedIn link
    const linkedInLink = screen.getByRole("link", { name: /LinkedIn/i });
    expect(linkedInLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/guilhermestracini/",
    );

    // Verify Instagram link
    const instagramLink = screen.getByRole("link", { name: /Instagram/i });
    expect(instagramLink).toHaveAttribute(
      "href",
      "https://www.instagram.com/gui.stracini/",
    );
  });
});

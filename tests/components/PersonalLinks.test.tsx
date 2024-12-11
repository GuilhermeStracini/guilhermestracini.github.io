// tests/PersonalLinks.test.tsx
import { render, screen } from "@testing-library/react";
import PersonalLinks from "../../src/components/PersonalLinks"; // Adjust the path as needed
import "@testing-library/jest-dom";

describe("PersonalLinks component", () => {
  it("renders the section header", () => {
    render(<PersonalLinks />);
    const header = screen.getByRole("heading", { name: /connect with me/i });
    expect(header).toBeInTheDocument();
  });

  it("renders all personal links with the correct text and URLs", () => {
    render(<PersonalLinks />);

    const links = [
      { name: "Portfolio", url: "https://guilhermebranco.com.br" },
      { name: "Old Portfolio", url: "https://zerocool.com.br" },
      { name: "Personal Blog", url: "https://blog.guilhermebranco.com.br" },
      { name: "Main GitHub", url: "https://github.com/guibranco" },
      { name: "POCs GitHub", url: "https://github.com/GuilhermeStracini" },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/guilhermestracini/" },
      { name: "Instagram", url: "https://www.instagram.com/gui.stracini/" },
    ];

    links.forEach((link) => {
      const renderedLink = screen.getByRole("link", { name: new RegExp(link.name, "i") });
      expect(renderedLink).toBeInTheDocument();
      expect(renderedLink).toHaveAttribute("href", link.url);
    });
  });

  it("renders the correct number of links", () => {
    render(<PersonalLinks />);
    const renderedLinks = screen.getAllByRole("link");
    expect(renderedLinks.length).toBe(7); // There are 7 links in the component
  });
});

import React from "react";
import { RepositoriesCardsProps } from "../types/RepositoriesCardsProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faStar,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import "./RepositoriesCards.css";

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.valueOf())) {
    return "Unknown date";
  }
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    year: "numeric",
    month: "numeric",
  }).format(date);
};

const getCategory = (
  name: string,
  isTemplate: boolean,
): { label: string; className: string } => {
  const lowerName = name.toLowerCase();
  if (isTemplate) return { label: "Template", className: "cat-template" };
  if (lowerName.startsWith("poc-"))
    return { label: "POC", className: "cat-poc" };
  if (lowerName.startsWith("hello-world"))
    return { label: "Hello World", className: "cat-hello-world" };
  return { label: "Misc", className: "cat-misc" };
};

const RepositoriesCards: React.FC<RepositoriesCardsProps> = ({ repos }) => {
  return (
    <div className="repo-grid">
      {repos.map((repo) => {
        const category = getCategory(repo.name, repo.is_template);
        return (
          <a
            className={`repo-card ${category.className}`}
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="repo-card-header">
              <h2>{repo.name}</h2>
              <span className={`category-badge ${category.className}`}>
                {category.label}
              </span>
            </div>
            <div className="repo-details">
              <span className="star-info">
                <FontAwesomeIcon icon={faStar} className="star-icon" />
                {repo.stargazers_count}
              </span>
            </div>
            <p>{repo.description || "No description provided."}</p>
            <span className="clock-info">
              <FontAwesomeIcon icon={faClock} className="clock-icon" />
              Updated at: {formatDate(repo.updated_at)}
            </span>
            <span className="view-repo-cta">
              <FontAwesomeIcon icon={faExternalLinkAlt} className="icon" /> View
              Repository
            </span>
          </a>
        );
      })}
    </div>
  );
};

export default RepositoriesCards;

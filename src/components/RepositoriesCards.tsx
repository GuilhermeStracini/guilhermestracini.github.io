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
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    year: "numeric",
    month: "numeric",
  }).format(date);
};

const RepositoriesCards: React.FC<RepositoriesCardsProps> = ({ repos }) => {
  return (
    <div className="repo-grid">
      {repos.map((repo) => (
        <div className="repo-card" key={repo.id}>
          <h2>{repo.name}</h2>
          <div className="repo-details">
            <span className="star-info">
              <FontAwesomeIcon icon={faStar} className="star-icon" />
              {repo.stargazers_count}
            </span>
            {repo.is_template && (
              <span className="template-badge">Template</span>
            )}
          </div>
          <p>{repo.description || "No description provided."}</p>
          <span className="clock-info">
            <FontAwesomeIcon icon={faClock} className="clock-icon" />
            Updated at: {formatDate(repo.updated_at)}
          </span>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faExternalLinkAlt} className="icon" /> View
            Repository
          </a>
          <br />
        </div>
      ))}
    </div>
  );
};

export default RepositoriesCards;

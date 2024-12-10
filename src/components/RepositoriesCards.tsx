import React from "react";
import { RepositoriesCardsProps } from "../types/RepositoriesCardsProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import "./RepositoriesCards.css";

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
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faExternalLinkAlt} className="icon" /> View
            Repository
          </a>
        </div>
      ))}
    </div>
  );
};

export default RepositoriesCards;

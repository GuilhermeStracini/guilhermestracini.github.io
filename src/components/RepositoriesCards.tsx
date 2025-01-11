import React from "react";
import { RepositoriesCardsProps } from "../types/RepositoriesCardsProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faStar,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import "./RepositoriesCards.css";
/**
 * Formats a given ISO date string into a localized date and time string.
 *
 * This function takes an ISO date string as input and returns a formatted string
 * representing the date and time in the "pt-BR" (Portuguese - Brazil) locale.
 * If the input date is invalid, it returns "Unknown date".
 *
 * @param {string} isoDate - The ISO date string to be formatted.
 * @returns {string} The formatted date and time string, or "Unknown date" if the input is invalid.
 *
 * @example
 * // Returns "10/10/2023 14:30"
 * formatDate("2023-10-10T14:30:00Z");
 *
 * @example
 * // Returns "Unknown date"
 * formatDate("invalid-date-string");
 */
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

/**
 * A functional component that renders a grid of repository cards.
 * Each card displays information about a repository, including its name,
 * star count, template status, description, last updated date, and a link
 * to the repository.
 *
 * @component
 * @param {RepositoriesCardsProps} props - The properties for the component.
 * @param {Array<Repository>} props.repos - An array of repository objects
 * containing details to be displayed in the cards.
 *
 * @returns {JSX.Element} A JSX element representing the repository cards grid.
 *
 * @example
 * const repositories = [
 *   {
 *     id: 1,
 *     name: "Repo 1",
 *     stargazers_count: 10,
 *     is_template: false,
 *     description: "This is a sample repository.",
 *     updated_at: "2023-01-01T00:00:00Z",
 *     html_url: "https://github.com/user/repo1"
 *   },
 *   // ... more repositories
 * ];
 *
 * <RepositoriesCards repos={repositories} />
 *
 * @throws {Error} Throws an error if the repos prop is not an array.
 */
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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faBlog } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import "./PersonalLinks.css";

const links = [
  { name: "Portfolio", url: "https://guilhermebranco.com.br", icon: faGlobe },
  { name: "Old Portfolio", url: "https://zerocool.com.br", icon: faGlobe },
  { name: "GitHub Bot", url: "https://bot.straccini.com", icon: faGithub },
  {
    name: "Tech & Travel Blog",
    url: "https://guilherme.stracini.com.br/blog",
    icon: faBlog,
  },
  { name: "Main GitHub", url: "https://github.com/guibranco", icon: faGithub },
  {
    name: "POCs GitHub",
    url: "https://github.com/GuilhermeStracini",
    icon: faGithub,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/guilhermestracini/",
    icon: faLinkedin,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/gui.stracini/",
    icon: faInstagram,
  },
];

const PersonalLinks: React.FC = () => {
  return (
    <nav className="personal-links" aria-label="Connect with me">
      <h2 className="sr-only">Connect with Me</h2>
      <ul>
        {links.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              title={link.name}
            >
              <FontAwesomeIcon icon={link.icon} className="icon" />
              <span className="sr-only">{link.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PersonalLinks;

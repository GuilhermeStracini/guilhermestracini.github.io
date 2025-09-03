import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faWordpress,
} from "@fortawesome/free-brands-svg-icons";
import "./PersonalLinks.css";

const links = [
  { name: "Portfolio", url: "https://guilhermebranco.com.br", icon: faGlobe },
  { name: "Old Portfolio", url: "https://zerocool.com.br", icon: faGlobe },
  { name: "GitHub Bot", url: "https://bot.straccini.com", icon: faGithub },
  {
    name: "Personal Blog",
    url: "https://blog.guilhermebranco.com.br",
    icon: faWordpress,
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
    <div className="personal-links">
      <h2>Connect with Me</h2>
      <ul>
        {links.map((link) => (
          <li key={link.url}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={link.icon} className="icon" /> {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonalLinks;

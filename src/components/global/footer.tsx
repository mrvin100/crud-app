
import { Github, Linkedin, LucideIcon, Youtube } from "lucide-react";

type Socials = {
  label: string;
  link: string;
  icon: LucideIcon;
};
const socials: Socials[] = [
    { label: "github", link: "https://www.github.com/mrvin100", icon: Github },
  { label: "linkedin", link: "https://www.linkedin.com/in/mrvin100", icon: Linkedin },
  { label: "youtube", link: "https://www.youtube.com/@jean-doe", icon: Youtube },
];

const Footer = () => {
  return (
    <footer className="container border shadow-sm flex justify-between mx-auto p-4 my-4">
      <div>
        {socials &&
          socials.length > 0 &&
          socials.map((social) => (
            <a href={`${social.link}`} target="_blank" className="inline-block mr-2 border p-2 hover:bg-blue-500 hover:text-white">
              {<social.icon className="h-4 w-4" />}
            </a>
          ))}
      </div>
      <p className="italic text-gray-500">
        &copy; bloggy{" "}
        <a
          href="https://github.com/mrvin100/crud-app.git"
          target="_blank"
          className="text-blue-500 underline"
        >
          @mrvin100
        </a>
      </p>
    </footer>
  );
};

export default Footer;

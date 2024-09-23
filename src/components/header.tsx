import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function Header() {
  const navLinks = [
    { label: "About", to: "/about" },
    { label: "New post", to: "/create" },
  ];
  return (
    <header className="">
      <div className="container border shadow-sm flex justify-between mx-auto p-4 my-4">
        <Button variant={"secondary"}>
          <Link to={"/"}>Home</Link>
        </Button>
        <nav>
          {navLinks &&
            navLinks.length > 0 &&
            navLinks.map((navLink) => (
              <Button variant={"secondary"} className="ml-4">
                <Link to={`${navLink.to}`}>{navLink.label}</Link>
              </Button>
            ))}
        </nav>
      </div>
    </header>
  );
}

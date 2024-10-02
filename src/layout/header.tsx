import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreatePost from "@/services/create";


export default function Header() {
  const navLinks = [
    { label: "About", to: "/about" },
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
          <AddPost />
        </nav>
      </div>
    </header>
  );
}

  export function AddPost() {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"secondary"} className="ml-4">
            New post
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create new Post</DialogTitle>
            <DialogDescription>
              Create your new post here. Click submit when you're done.
            </DialogDescription>
          </DialogHeader>
          <CreatePost />
        </DialogContent>
      </Dialog>
    );
  }
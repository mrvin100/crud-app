import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PostType } from "./create";
import { Button } from "./ui/button";
import { Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Post(post: PostType, setPosts: any, posts: PostType[]) {
  const deletePost = async (postId: string) => {
    try {
      const res = await axios.delete(`http://localhost:3000/posts/${postId}`);

      if (res.status === 200) {
        console.log("Post deleted succesfully:", res.data);
      } else {
        console.log("Post deleted succesfully:", res.data);
      }
    } catch (error) {
      console.log("Error deleting post:", error);
    }
  };
  function handleDelete(id: string) {
    deletePost(id);
    setPosts(posts.filter((post) => post.id !== id));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.content}</CardDescription>
      </CardHeader>
      <CardContent>
        <span className="italic inline-block ml-auto">
          Post created by <em>mrvin100</em>
        </span>
      </CardContent>
      <CardFooter className="flex justify-between gap-4">
        <Link to={`/update/${post.id}`}>
          <Button variant={"secondary"} size={"icon"}>
            <Pencil className="h-4 w-4" />
          </Button>
        </Link>
        <Button
          variant={"destructive"}
          size={"icon"}
          onClick={() => handleDelete(post.id)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

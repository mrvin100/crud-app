import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PostType } from "@/components/home/create";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UpdatePost from "@/components/home/update";

import { toast } from "sonner";
import * as React from 'react'

interface Props {
  post: PostType,
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>, 
  posts: PostType[]
}

export default function Post({post, posts, setPosts}: Props) {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = React.useState(false);
  const deletePost = async (postId: string) => {
    try {
      const res = await axios.delete(`http://localhost:3000/posts/${postId}`);

      if (res.status === 200) {
        toast("Post deleted succesfully!", {
          description: "Remember to add new post after.",
          action: {
            label: "Hide",
            onClick: () => {
              console.log("Post deleted succesfully:", res.data);
            },
          },
        });
      } else {
        toast("Error deleting post!", {
          description: "view more details in console.",
          action: {
            label: "view",
            onClick: () => {
              console.log("Error deleting post:", res.data);
            },
          },
        });
      }
    } catch (error) {
      toast("Error deleting post!", {
        description: "view more details in console.",
        action: {
          label: "view",
          onClick: () => {
            console.log("Error deleting post:", error);
          },
        },
      });
    }
  };
  function handleDelete(id: string) {
    deletePost(id);
    setPosts(posts.filter((post) => post.id !== id));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{post.title}</CardTitle>
        <CardDescription className="text-xl">{post.content}</CardDescription>
      </CardHeader>
      <CardContent>
        <span className="italic inline-block ml-auto">
          Post created by <em>mrvin100</em>
        </span>
      </CardContent>
      <CardFooter className="flex justify-between gap-4">
        <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
          <DialogTrigger asChild>
          <Button variant={"secondary"} size={"icon"}>
            <Pencil className="h-4 w-4" />
          </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update this Post</DialogTitle>
              <DialogDescription>
                Update your post here. Click submit when you're done.
              </DialogDescription>
            </DialogHeader>
            <UpdatePost id={post.id!} post={post} setPosts={setPosts} setIsUpdateDialogOpen={setIsUpdateDialogOpen} />
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"} size={"icon"}>
              <Trash className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                post and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(post.id!)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}

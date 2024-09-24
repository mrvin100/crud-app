import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 5 characters.",
  }),
  content: z.string().min(2, {
    message: "title must be at least 10 characters.",
  }),
});

export type PostType = {
  id?: string;
  title: string;
  content: string;
};

export default function UpdatePost({
  id,
  post,
}: {
  id: string;
  post: PostType;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
    },
  });
  console.log("selected post : ", post);
  console.log("selected post : ", post.title);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleUpdatePost(id, data);
  }

  const handleUpdatePost = async (postId: string, newPost: PostType) => {
    console.log("new post :", newPost);

    try {
      const res = await axios.put(`http://localhost:3000/posts/${postId}`, {
        id: id,
        title: newPost.title,
        content: newPost.content,
      });
      toast("Post updated succesfully", {
        description: "Go to home to see your updated post.",
        action: {
          label: "Hide",
          onClick: () => {
            console.log("Post updated succesfully : ", res.data);
          },
        },
      });
    } catch (error) {
      toast("Error when creating post", {
        description: "Open console to see what's happen.",
        action: {
          label: "View",
          onClick: () => {
            console.log("Error when updating post :", error);
          },
        },
      });
    }
  };

  return (
    <section className="container mx-auto flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-sm w-full"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel className="text-lg">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="update post title"
                    {...field}
                    defaultValue={post.title}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel className="text-lg">Content</FormLabel>
                <FormControl>
                  <Input
                    placeholder="update post content"
                    {...field}
                    defaultValue={post.content}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-8 w-full">
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
}

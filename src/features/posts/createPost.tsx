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
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalState";
import { createPost } from "./postAPI";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 5 characters.",
  }),
  content: z.string().min(2, {
    message: "title must be at least 10 characters.",
  }),
});

export default function CreatePost() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("GlobalContext is not defined");
  }
  const { setPosts } = context;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(datas: z.infer<typeof FormSchema>) {
    try {
      const res = await createPost(datas)
      toast("Post created succesfully", {
        description: "Go to home to see your new post.",
        action: {
          label: "Hide",
          onClick: () => {
            console.log("Post created succesfully : ", res.data);
          },
        },
      });
      setPosts((prevPosts) => [...prevPosts, {...datas, id: res.data?.id}])
      form.reset()
    } catch (error) {
      toast("Error when creating post", {
        description: "Open console to see what's happen.",
        action: {
          label: "View",
          onClick: () => {
            console.log("Error when creating post :", error);
          },
        },
      });
    }
  }

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
                  <Input placeholder="add title" {...field} />
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
                  <Textarea placeholder="add post content" {...field} />
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

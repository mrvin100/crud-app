import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 5 characters.",
  }),
  content: z.string().min(2, {
    message: "title must be at least 10 characters.",
  }),
});

export type PostType = {
  title: string;
  content: string;
};

export default function CreatePost() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    handleSubmit(data);
    window.location.href = "/";
  }

  const handleSubmit = async (newPost: PostType) => {
    try {
      const res = await axios.post("http://localhost:3000/posts", {
        title: newPost.title,
        content: newPost.content,
      });
      console.log("Post created succesfully : ", res.data);
    } catch (error) {
      console.log("Error when creating post :", error);
    }
  };

  return (
    <section className="border container mx-auto h-[80vh] flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border max-w-sm w-full p-4 shadow-sm rounded-sm"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="add title" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display title.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Input placeholder="add post content" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display content.
                </FormDescription>
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

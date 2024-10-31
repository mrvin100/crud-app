import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import Post from "@/components/home/Post";
import axios from "axios";
import { toast } from "sonner";
import { GlobalContext } from "@/context/GlobalState";
import * as React from "react";
import { PostType } from "@/helpers/post.model";

const Home = () => {
  const context = React.useContext(GlobalContext);
  if (!context) {
    throw new Error("GlobalContext is not defined");
  }
  const { posts, setPosts } = context;
  const [loading, setLoading] = React.useState(true);
  console.log("posts : ", posts);

  const fetchPosts = React.useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3000/posts");
      const data = await res.data;
      if (data && data.length) {
        setPosts(data);
      }
    } catch (error) {
      toast.error(`Error fetching posts. Please try again later: ${error}`);
    } finally {
      setLoading(false);
    }
  }, [setPosts]);
  React.useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  return (
    <section className="border container mx-auto min-h-[80vh] p-4">
      <h2 className="text-3xl my-4 mb-10 text-center">
        Hello, welcome to Bloggy!
      </h2>
      <div>
        {loading ? (
          <div className="min-h-[50vh] grid place-content-center">
            <p>Loading posts...</p>
          </div>
        ) : 
        posts && posts.length > 0 ? (
          <div className="p-4 grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: PostType) => (
              <Post
                key={post.id}
                post={post}
                setPosts={setPosts}
                posts={posts}
              />
            ))}
          </div>
        ) : (
          <div className="min-h-[50vh] grid place-content-center">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Oups!</AlertTitle>
              <AlertDescription>
                You dont have a post created yet!
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;

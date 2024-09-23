import { useEffect, useState } from "react";
import { PostType } from "./create";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Info } from "lucide-react";
import Post from "./post";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/posts");
      setPosts(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [posts]);
  return (
    <section className="border container mx-auto min-h-[80vh] p-4">
      <h2 className="my-4 mb-10 text-center text-gray-500">
        Hello welcome to my Blog Post
      </h2>

      <div className="">
        {posts && posts.length > 0 ? (
          <div className="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {posts.map((post, index) => (
              <Post key={index} {...post} setPosts={setPosts} posts={posts} />
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

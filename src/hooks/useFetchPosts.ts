import { GlobalContext } from '@/context/GlobalState';
import axios from 'axios';
import * as React from 'react'
import { toast } from 'sonner';

const useFetchPosts = () => {
    const context = React.useContext(GlobalContext);
    if (!context) {
      throw new Error("GlobalContext is not defined");
    }
    const { setPosts } = context;
    const [loading, setLoading] = React.useState(true);
  
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
    return { loading }
}

export default useFetchPosts
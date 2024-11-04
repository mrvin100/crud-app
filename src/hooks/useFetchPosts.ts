import { GlobalContext } from '@/context/GlobalState';
import { fetchPosts } from '@/features/posts/postAPI';
import * as React from 'react'
import { toast } from 'sonner';

const useFetchPosts = () => {
    const context = React.useContext(GlobalContext);
    if (!context) {
      throw new Error("GlobalContext is not defined");
    }
    const { setPosts } = context;
    const [loading, setLoading] = React.useState(false);
  
    const loadPosts = React.useCallback(async () => {
      setLoading(true)
      try {
        const data = await fetchPosts();
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
      loadPosts();
    }, [loadPosts]);
    return { loading }
}

export default useFetchPosts
import { PostType } from "@/services/create";
import * as React from "react";

interface GlobalContextType {
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
}

export const GlobalContext = React.createContext<GlobalContextType | undefined>(
  undefined
);

export default function GlobalState({
  children,
}: {
  children: React.ReactNode;
}) {
  const [posts, setPosts] = React.useState<PostType[]>([]);

  const value = React.useMemo(() => ({ posts, setPosts }), [posts]);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

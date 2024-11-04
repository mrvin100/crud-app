import { render, screen } from '@testing-library/react'
import { PostType } from "@/features/posts/Post.Model";
import { GlobalContext } from '@/context/GlobalState';
import Home from './Home';

const mockPosts: PostType[] = [
    { id: "1", title: "Post 1", content: "Content of Post 1" },
    { id: "2", title: "Post 2", content: "Content of Post 2" },
]

const mockContextValue = {
    posts: mockPosts,
    setPosts: jest.fn()
}

describe('Home', () => {
    test("renders loading state", () => {
        render(
            <GlobalContext.Provider value={{posts: [], setPosts: jest.fn()}}>
                <Home />
            </GlobalContext.Provider>
        )
        expect(screen.getByText(/loading posts/i)).toBeInTheDocument()
    })
    test("render posts when available", () => {
        render( 
        <GlobalContext.Provider value={mockContextValue}>
            <Home />
        </GlobalContext.Provider>
        )
        expect(screen.getByText(/Hello, welcome to Bloggy!/i)).toBeInTheDocument()
        expect(screen.getByText(/Post 1/i)).toBeInTheDocument()
        expect(screen.getByText(/Post 2/i)).toBeInTheDocument()
    })
    test("render alert when no posts are available", () => {
        render(
            <GlobalContext.Provider value={{posts: [], setPosts: jest.fn()}}>
                <Home />
            </GlobalContext.Provider>
        )
        expect(screen.getByText(/Oups!/i)).toBeInTheDocument()
        expect(screen.getByText(/You dont have a post created yet!/i)).toBeInTheDocument()
    })
})
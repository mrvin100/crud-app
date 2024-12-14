import { render, screen, waitFor } from '@testing-library/react'
import { PostType } from "@/features/posts/Post.Model";
import { GlobalContext } from "@/context/GlobalState";
import Home from '@/pages/Home';

const mockPosts: PostType[] = [
    { id: "1", title: "Post 1", content: "Content of Post 1" },
    { id: "2", title: "Post 2", content: "Content of Post 2" },
]

const mockContextValue = {
    posts: mockPosts,
    setPosts: vi.fn()
}

describe('Home', () => {
    test("renders loading state", () => {
        render(
            <GlobalContext.Provider value={{posts: [], setPosts: vi.fn()}}>
                <Home />
            </GlobalContext.Provider>
        )
        expect(screen.getByText(/loading posts/i)).toBeInTheDocument()
        screen.debug()
    })
    test("render posts when available", async () => {
        render( 
        <GlobalContext.Provider value={mockContextValue}>
            <Home />
        </GlobalContext.Provider>
        )
       waitFor(()=>{
            expect(screen.getByText(/Hello, welcome to Bloggy!/i)).toBeInTheDocument()
            expect(screen.getByText(/Post 1/i)).toBeInTheDocument()
            expect(screen.getByText(/ Content of Post 1/i)).toBeInTheDocument()
        })
       
    })
    test("render alert when no posts are available", async () => {
        render(
            <GlobalContext.Provider value={{posts: [], setPosts: vi.fn()}}>
                <Home />
            </GlobalContext.Provider>
        )
        screen.debug()
        await waitFor(()=>{
            expect(screen.getByText(/Oups!/i)).toBeInTheDocument()
            expect(screen.getByText(/You dont have a post created yet!/i)).toBeInTheDocument()
        }) 
    })
})



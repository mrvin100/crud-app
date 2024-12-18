import { render, screen, waitFor } from '@testing-library/react'
import { GlobalContext } from "@/context/GlobalState";
import Home from '@/pages/Home';
import { allPosts } from '@/mocks/handlers';
import { server } from '@/mocks/node';



const mockContextValue = {
    posts: allPosts,
    setPosts: vi.fn()
}


describe('Home', () => {
    beforeEach(() =>{
        render(
            <GlobalContext.Provider value={{posts: [], setPosts: vi.fn()}}>
                <Home/>
            </GlobalContext.Provider>
        )
    })
    beforeAll(() =>{
        server.listen()
    })
    afterEach(() =>{
        server.resetHandlers()
    })
    afterAll(() =>{
        server.close()
    })
    
    test("renders loading state", () => {
        expect(screen.getByText(/loading posts/i)).toBeInTheDocument()
    })
    
    test("render posts when available", async () => {
        render( 
        <GlobalContext.Provider value={mockContextValue}>
            <Home />
        </GlobalContext.Provider>
        )
       await waitFor(()=>{
            expect(screen.getByText("first title")).toBeInTheDocument()
            expect(screen.getByText("second title")).toBeInTheDocument()
           expect(screen.getByText("second content")).toBeInTheDocument()
        })
       
    })
    test("render alert when no posts are available", async () => {
        await waitFor(()=>{
            expect(screen.getByText(/Oups!/i)).toBeInTheDocument()
            expect(screen.getByText(/You dont have a post created yet!/i)).toBeInTheDocument()
        }) 
    })
})
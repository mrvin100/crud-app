import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Post from '@/components/post'
import { GlobalContext } from '@/context/GlobalState'
import { server } from '@/mocks/node'
import { allPosts } from '@/mocks/handlers'
import userEvent from '@testing-library/user-event'


describe('Post', () => {
    beforeEach(() =>{
        render(
            <GlobalContext.Provider value={{posts: [], setPosts: vi.fn()}}>
                <Post post={allPosts[0]}/> 
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


    it('should render the post title when post is given', () => {
        const postTitle = screen.getByText(/first title/i) 
        expect(postTitle).toBeInTheDocument();
    })
   it('should render the post content when post is given', () => {
        const postContent = screen.getByText( /first content/i)
        expect(postContent).toBeInTheDocument();
    })
    it('should render the postUpdated component and update the post' , async ()=>{
        const updateButton = screen.getByTestId('updateButton')
        await  userEvent.click(updateButton)
        expect(screen.getByText(/update this post/i)).toBeInTheDocument()

        fireEvent.change(screen.getByPlaceholderText(/update post title/i), {
            target: { value: 'updated title' }
        })

        const submitButton = screen.getByRole('button' , {name : /Submit/i})
        userEvent.click(submitButton)
        expect(screen.getByDisplayValue(/updated title/i)).toBeInTheDocument()
        waitFor(()=>{
            expect(screen.getByText(/updated title/i)).toBeInTheDocument()
        }) 
    })

    it('should render the deleted component and delete a post ' , async ()=>{
        const trashButton = screen.getByTestId(/deleteButton/i)
        await userEvent.click(trashButton)
        expect(screen.getByText(/Are you absolutely sure?/i)).toBeInTheDocument()

        const deleteButton = screen.getByRole('button' , {name : /Continue/i})
        await userEvent.click(deleteButton)
        waitFor(()=>{
            expect(screen.queryByText(/first title/i)).toBeNull()
        }) 
    })
})

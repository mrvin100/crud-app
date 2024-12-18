import userEvent from '@testing-library/user-event';
import { AddPost } from "@/components/layout/Header"
import {fireEvent, render , screen, waitFor} from "@testing-library/react"
import { expect } from "vitest"
import { GlobalContext } from '@/context/GlobalState';
import { server } from '@/mocks/node';

describe(' AddPost component integration test' ,()=>{
    
    beforeEach(() =>{
      render(
        <GlobalContext.Provider value={{posts: [], setPosts: vi.fn()}}>
          <AddPost/>
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
    

    it('display the publish dialog by clicking the new post button' , async ()=>{
       await userEvent.click(screen.getByRole('button' , {name : /New post/i }))
        const postHeader =screen.getByText(/Create new Post/i)
        expect(postHeader).toBeInTheDocument()
    })

    it('add a new post' ,async ()=>{
      await userEvent.click(screen.getByRole('button' , {name : /New post/i })) 
      
      fireEvent.change(screen.getByPlaceholderText(/add title/i), {
        target: { value: 'je suis' },
      })

      await userEvent.click(screen.getByRole('button' , { name : /Submit/i}))
      //reverifier en remcommençant par getByText
      await waitFor(() => {
      expect(screen.getByDisplayValue(/je suis/i)).toBeInTheDocument() 
      })
    })
})


/*
  test('adds a new post', async () => {
  const store = setupStore();

  render(
    <Provider store={store}>
      <AddPost />
    </Provider>
  );

  // Saisir le titre du nouveau post
  fireEvent.change(screen.getByPlaceholderText(/add new post/i), {
    target: { value: 'New Post' },
  });

  // Soumettre le formulaire
  fireEvent.click(screen.getByText(/add/i));

  // Attendre que le nouvel élément soit ajouté à la liste
  await waitFor(() => {
    expect(screen.getByText(/new post/i)).toBeInTheDocument();
  });
})
*/
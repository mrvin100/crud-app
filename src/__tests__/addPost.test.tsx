import userEvent from '@testing-library/user-event';
import { AddPost } from "@/components/layout/Header"
import {render , screen} from "@testing-library/react"
import { expect } from "vitest"
import { GlobalContext } from '@/context/GlobalState';
import { server } from '@/mocks/node';

describe('testing the AddPost component' ,()=>{
    
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
    

    it('show the post dialog box when clicking on the button' , async ()=>{

       await userEvent.click(screen.getByRole('button' , {name : /New post/i }))
        screen.debug()
        
        const postHeader =screen.getByText(/Create new Post/i)
        expect(postHeader).toBeInTheDocument()
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
});
*/
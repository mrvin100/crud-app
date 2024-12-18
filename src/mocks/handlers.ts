import { PostType } from '@/features/posts/Post.Model'
import { API_URL } from '@/features/posts/postAPI'
import {http, HttpResponse, PathParams} from 'msw'

export const allPosts : PostType[] = [
    {
      id : "1",
      title : 'first title',
      content :'first content'

    },
    {
      id : "2",
      title : 'second title',
      content :'second content'
    }
]

export const handlers = [
  http.get<object, object, PostType[]>(API_URL, () => {
      return HttpResponse.json(allPosts)
  }),   
        
  http.post<object, PostType>(API_URL, async ({ request }) => {
    const newPost = await request.json() as PostType

    allPosts.push(newPost)
    console.log(allPosts);
    
    return HttpResponse.json(newPost, { status: 201 })
  }),

  http.put<PathParams, PostType >(`${API_URL}/:id`, async ({ request, params }) => {
      const { id } = params 
      const updatedPost = await request.json() 
      
      return HttpResponse.json({
        id, 
        updatedPost
      })
  }),

  http.delete<PathParams, PostType>(`${API_URL}/:id`, ({ params }) => {
    const { id } = params 

    return HttpResponse.json({message: `Todo with id ${id} deleted successfully`})
  }),
]





//alternative:
 

/*const allPosts: PostType[] = [
  {
    id: "1",
    title: 'first title',
    content: 'first content'
  },
  {
    id: "2",
    title: 'second title',
    content: 'second content'
  }
]

export const handlers = [

  http.get<object, object, PostType[]>(API_URL, () => {
    
    return HttpResponse.json(allPosts)
  }),
  
  http.post<object, object, PostType>(API_URL, async ({ request }) => {
    const newPost: PostType = await request.json()

    const createdPost = {
      id: newPost.id || String(Date.now()),
      title: newPost.title,
      content: newPost.content
    }

    allPosts.push(createdPost)
    console.log(allPosts);
    

    return HttpResponse.json(createdPost, { status: 201 })
  }),
]
  // completer delete si necessaire (voir documentation)

    /*const deletedPost = allPosts.get(id)

    if (!deletedPost) {
      return new HttpResponse(null, { status: 404 })
    }
    allPosts.delete(id)

*/
// Nouveau fichier pour gérer les appels API liés aux posts

import axios from "axios"
import { PostType } from "./Post.Model"

export const API_URL = 'http://localhost:3000/posts'

export const fetchPosts = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

export const createPost = async (data: PostType) => {
    const response = await axios.post(API_URL, data)
    return response.data
}

export const updatePost = async (id: string, data: PostType) => {
    const response = await axios.put(`${API_URL}/${id}`, data)
    return response.data
}

export const deletePost = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`)
}
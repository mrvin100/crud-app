import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Post from "./index"
import { PostType } from "@/features/posts/Post.Model"

describe('Post', () => {
    const post:PostType = {id: "1", title: "post title", content: "post content"}
    it('should render the post title when post is given', () => {
        render(<Post post={post} />)
        const postTitle = screen.getByRole('heading', {name: /post title/i})
        expect(postTitle).toBeInTheDocument();
    })
    it('should render the post content when post is given', () => {
        render(<Post post={post} />)
        const postContent = screen.getByRole('paragraph', {name: /post content/i})
        expect(postContent).toBeInTheDocument();
    })
})
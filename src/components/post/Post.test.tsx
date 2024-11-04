import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Post from "./Post"
import { PostType } from "@/features/posts/Post.Model"

describe('Post', () => {
    const post:PostType = {id: "1", title: "post title", content: "post content"}
    it('should render the post title when post is given', () => {
        render(<Post post={post} />)
        const postTitle = screen.getByRole('heading')
        expect(postTitle).toBeInTheDocument();
        expect(postTitle).toHaveTextContent(/post title/i);
    })
    it('should render the post description when post is given', () => {
        render(<Post post={post} />)
        const postContent = screen.getByRole('paragraph')
        expect(postContent).toBeInTheDocument();
        expect(postContent).toHaveTextContent(/post content/i);
    })
})
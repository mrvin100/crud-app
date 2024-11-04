import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import About from './About'

describe('About', () => {
    it('should render About section', () => {
        render(<About />)
        const heading = screen.getByRole('heading', { name: /about section/i })
        expect(heading).toBeInTheDocument()
    })
})
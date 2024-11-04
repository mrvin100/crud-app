import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import About from './About'

describe('About', () => {
    it('should render the default message', () => {
        render(<About />);
        const heading = screen.getByRole('heading')
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent(/about/i)
    })
})
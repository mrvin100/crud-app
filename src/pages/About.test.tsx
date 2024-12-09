import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom' // Extends expect with custom matchers like toBeInTheDocument
import About from './About'

describe('About', () => {
    it('should render About section', () => {
        render(<About />)
        const heading = screen.getByRole('heading', { name: /about section/i })
        expect(heading).toBeInTheDocument()
    })
})
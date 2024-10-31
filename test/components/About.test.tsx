import { render, screen } from '@testing-library/react'
import About from '../../src/pages/About'

describe('About', () => {
    it('should render the default message', () => {
        render(<About />);
        const heading = screen.getByRole('heading')
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent(/about/i)
    })
})
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hero heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/wujudkan/i);
  expect(headingElement).toBeInTheDocument();
});
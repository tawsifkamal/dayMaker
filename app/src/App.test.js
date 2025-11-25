import { render, screen } from '@testing-library/react';
import App from './App';

test('renders waving hand emoji', () => {
  render(<App />);
  expect(screen.getByText(/👋/)).toBeInTheDocument();
});

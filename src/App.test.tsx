import { render, screen } from '@testing-library/react';
import App from './App';

test('App renders', () => {
  render(<App />);
  const txt = screen.queryByText('Form');
  expect(txt).not.toBeInTheDocument();
});

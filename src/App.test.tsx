import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders Felines link', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const linkElement = screen.getByText(/Felines/i);
  expect(linkElement).toBeInTheDocument();
});

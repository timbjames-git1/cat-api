import React from 'react';
import { render, screen } from '@testing-library/react';
import { Form } from './Form';

test('renders Your Cat Picture Label', () => {
  render(<Form />);
  const labelElement = screen.getByText(/Your Cat Picture/i);
  expect(labelElement).toBeInTheDocument();
});
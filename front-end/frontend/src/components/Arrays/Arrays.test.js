import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Arrays from './Arrays';

describe('<Arrays />', () => {
  test('it should mount', () => {
    render(<Arrays />);
    
    const arrays = screen.getByTestId('Arrays');

    expect(arrays).toBeInTheDocument();
  });
});
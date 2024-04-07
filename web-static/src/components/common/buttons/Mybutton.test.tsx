import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MyButton from './Mybutton';

describe('MyButton component', () => {
  it('renders with correct text and responds to click events', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<MyButton handleClick={handleClick} buttonText="Test Button" />);

    // Check if the button has the correct text
    expect(getByText('Test Button')).toBeInTheDocument();

    // Simulate a click event
    fireEvent.click(getByText('Test Button'));

    // Check if the click handler has been called
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
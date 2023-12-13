import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this line

import MyButton from './MyButton';

describe('MyButton Component', () => {
  it('renders with default props', () => {
    const { getByText } = render(<MyButton onClick={() => {}} label="Click me" />);
    const button = getByText('Click me');

    // Check if the button renders with default styles and classes
    expect(button).toHaveClass('my-button text-base px-3 py-2 bg-primary');
  });

  it('renders with custom props', () => {
    const { getByText } = render(
      <MyButton
        onClick={() => {}}
        label="Submit"
        state="Secondary"
        size="Large"
        background="#00FF00"
      />
    );
    const button = getByText('Submit');

    // Check if the button renders with custom styles and classes
    expect(button).toHaveClass('my-button text-lg px-4 py-2 bg-secondary');
    expect(button).toHaveStyle({ background: '#00FF00' });
  });

  it('calls the onClick function when clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(<MyButton onClick={onClickMock} label="Click me" />);
    const button = getByText('Click me');

    // Simulate a button click
    fireEvent.click(button);

    // Check if the onClick function is called
    expect(onClickMock).toHaveBeenCalled();
  });
});


import React from 'react';

interface MyButtonProps {
  onClick: () => void;
  label: string;
  state?: 'Primary' | 'Secondary';
  size?: 'Small' | 'Medium' | 'Large';
  background?: string;
}

const MyButton: React.FC<MyButtonProps> = ({
  onClick,
  label,
  state = 'Primary',
  size = 'Medium',
  background = '#FF833C',
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'Small':
        return 'text-sm  p-3 lg:p-4.5 gap-2 rounded-2 w-62.5 h-12 top-142.5 left-33.75  border-none focus:border-none gap-8';
      case 'Large':
        return 'text-lg px-4 py-2';
      // Medium is the default
      default:
        return 'text-base px-3 py-2';
    }
  };

  const getStateClass = () => {
    return state === 'Primary' ? 'bg-primary' : 'bg-secondary';
  };

  return (
    <button
      onClick={onClick}
      className={`my-button ${getSizeClass()} ${getStateClass()}`}
      style={{ background }}
    >
      {label}
    </button>
  );
};

export default MyButton;

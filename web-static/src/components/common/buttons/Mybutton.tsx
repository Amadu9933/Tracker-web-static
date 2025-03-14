import './Mybutton.css';

import { MyButtonProps } from '../../../types/types';

// MyButton functional component
const MyButton: React.FC<MyButtonProps> = ({
  onClick,
  label,
  state = 'Primary',
  size = 'Medium',
  background = '#FF833C',
}) => {
  // Helper function to determine the size-specific styles
  const getSizeClass = () => {
    switch (size) {
      case 'Small':
        return 'text-sm p-3 lg:p-4.5 gap-2 rounded-2 w-62.5 h-12 top-142.5 left-33.75 border-none focus:border-none gap-8';
      case 'Large':
        return 'text-lg px-4 py-2';
      // Medium is the default

      case 'mobile':
        return 'text-sm px-4 py-2 w-24';

      default:
        return 'text-base px-3 py-2';
    }
  };

  // Helper function to determine the state-specific background color
  const getStateClass = () => {
    return state === 'Primary' ? 'bg-primary' : 'bg-secondary';
  };

  // Combine size and state classes for the button
  const buttonClasses = `my-button ${getSizeClass()} ${getStateClass()}`;

  // Render the button component
  return (
    <button onClick={onClick} className={buttonClasses} style={{ background }}>
      {label}
    </button>
  );
};

export default MyButton;

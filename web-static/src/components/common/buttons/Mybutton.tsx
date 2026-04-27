type secondaryButtonProps = {
  label: string;
  onClick?: () => void;
  color?: string;
  background?: string;
}

const SecondaryButton = ({ label, onClick, color = '#ffffff', background = 'white' }: secondaryButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ color, backgroundColor: background }}
      className="
        inline-flex items-center justify-center
        bg-primary hover:bg-primary  dark:bg-orange-500 dark:hover:bg-orange-400
          dark:shadow-[0_0_12px_rgba(249,115,22,0.3)]
        font-semibold
        text-sm sm:text-base
        px-6 py-2.5
        rounded-[8px]
        shadow-md hover:shadow-lg
        transition-all duration-200
        cursor-pointer
      "
    >
      {label}
    </button>
  );
};

export default SecondaryButton;
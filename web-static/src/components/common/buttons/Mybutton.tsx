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
        bg-primary hover:bg-[#e8732e] active:bg-[#d4621e]
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
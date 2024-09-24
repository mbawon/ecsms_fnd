import { FC } from "react";

interface ButtonProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  label: string;
  loadingText?: string;
}

const Button: FC<ButtonProps> = ({ isLoading = false, isDisabled = false, onClick, label, loadingText, ...ButtonProps }) => {
  return (
    <button
      {...ButtonProps}
      type="submit"
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={`w-full py-3 px-4 rounded-xl outline-none font-bold transition-colors duration-300
        ${isDisabled || isLoading ? 'bg-gray-400 text-gray-700' : 'bg-red-500 text-white'}
        ${isDisabled ? 'cursor-not-allowed' : 'hover:bg-red-600'}
      `}
    >
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <span>{loadingText ? loadingText : "Loading..."}</span>
        </div>
      ) : (
        label
      )}
    </button>
  );
};

export default Button;

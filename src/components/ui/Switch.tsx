import React from 'react';

interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange, disabled = false, className = '' }) => {
    const handleToggle = () => {
        if (!disabled) {
            onChange(!checked);
        }
    };

    return (
        <div
            className={`relative inline-flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
            onClick={handleToggle}
        >
            {/* Switch background */}
            <div
                className={`w-12 h-6 rounded-full transition-colors duration-300 ease-in-out ${checked ? 'bg-red-500' : 'bg-gray-300'
                    }`}
            ></div>
            {/* Switch knob */}
            <div
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out transform ${checked ? 'translate-x-6' : ''
                    }`}
            ></div>
        </div>
    );
};

export default Switch;

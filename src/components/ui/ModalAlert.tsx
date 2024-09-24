import React from 'react'
import { useModal } from '@/common/contexts/ModalContext';
import Button from './button';

interface Props {
    title?: string;
    modalType?: "success" | "error";
    icon?: React.ReactNode | string;
    description?: string;
    buttonClick?: () => Promise<void>;
    buttonText?: string | any;
}

const ModalAlert: React.FC<Props> = ({ modalType, icon, description, title, buttonClick, buttonText }) => {
    const { hideModal } = useModal()
    const handleClick = async () => {
        if (buttonClick) {
            try {
                await buttonClick();
                hideModal()
            } catch (error) {
                console.error("Button click handler failed:", error);
            }
        } else {
            hideModal()
        }
    }
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='flex flex-col justify-center items-center gap-8 bg-white shadow-xl rounded-xl py-10 w-[500px] min-h-[250px]'>
                {typeof icon === "string" ? (
                    <img src={icon} alt="icon" className="h-28 w-28" />
                ) : (
                    icon
                )}
                <h1 className='text-center text-lg'>{title}</h1>
                <p className='text-md text-gray-400 text-center'>{description}</p>
                <Button label={buttonText} onClick={handleClick} />
            </div>
        </div>
    )
}

export default ModalAlert
'use client'

import { createContext, useContext, ReactNode, FC, useState, SetStateAction, Dispatch } from "react";

type ModalProps = {
  hasPadding?: boolean;
};
interface ModalContextType {
  showModal: (content: ReactNode, options?: ModalProps) => void;
  hideModal: () => void;
  setModalTitle: Dispatch<SetStateAction<string>>;
  modalTitle?: string;
  modalContent: ReactNode | null;
  modalProps?: ModalProps | null;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalTitle, setModalTitle] = useState<string>("Modal title");
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [modalProps, setModalProps] = useState<ModalProps | null>(null);

  const showModal = (content: ReactNode, options?: ModalProps) => {
    setModalContent(content);
    if (options) {
      setModalProps(options);
    }
  };

  const hideModal = () => {
    setModalTitle("Modal title");
    setModalContent(null);
    setModalProps(null);
  };



  return (
    <ModalContext.Provider value={{ showModal, hideModal, modalTitle, setModalTitle, modalContent, modalProps }}>
      {children}
    </ModalContext.Provider>
  );
};
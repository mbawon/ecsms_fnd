import { useModal } from "@/common/contexts/ModalContext";
import { classnames } from "@/common/helpers/helpers";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const ModalManager: React.FC = () => {
  const { modalTitle, modalContent, modalProps, hideModal } = useModal();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || modalContent === null) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-gray-500 opacity-50"
        // onClick={hideModal}
        aria-hidden="true"
      ></div>
      <div
        className={classnames(
          "relative rounded-lg z-20 p-6",
          modalProps?.hasPadding ? "bg-black border border-gray-100 border-opacity-50 text-white" : ""
        )}
      >
        <div className="bg-white flex flex-col rounded-xl pt-2">
          <div className="flex flex-row justify-between items-center bg-white border-b p-4">
            <h1>{modalTitle}</h1>
            <X className="text-gray-500" onClick={hideModal} />
          </div>
          <div className="px-0 pb-2">
            {modalContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalManager;

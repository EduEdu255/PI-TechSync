import { useRef } from "react";

function ConfirmationDialog({ message, onConfirm }) {
    const backRef = useRef();
  
    const handleConfirm = () => {
    onConfirm(true);
  };
  const handleClose = () => {
    onConfirm(false);
  };

  return (
    <>
      <div
        ref={backRef}
        onClick={handleClose}
        className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 p-4 md:p-8 backdrop-blur-sm"
      >
        <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden mx-auto">
          <div className="p-4 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-700">{message}</p>
          </div>
          <div className="flex items-center justify-end p-4 gap-4">
            <button
              type="button"
              className="text-gray-500 bg-white hover:text-white hover:bg-gray-100 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 dark:text-gray-400 dark:hover:bg-gray-700"
              onClick={handleClose}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="hover:bg-[#3758D0] hover:text-white focus:ring-4 focus:outline-none focus:ring-[#3758D0] font-medium rounded-lg text-sm text-[#3758D0] px-5 py-2.5"
              onClick={handleConfirm}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmationDialog;

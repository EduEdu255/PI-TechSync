import { useEffect, useRef } from "react";
import styles from "../assets/css/Modal.module.css";
import { MdOutlineClose } from "react-icons/md";

function Modal({ onClose, titulo, children }) {
  const backRef = useRef();
  const handleClose = () => {
    onClose();
  };

    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = "unset");
    }, []);
  return (
    <div className={styles.container} ref={backRef}>
      <div className="flex flex-col justify-center items-center gap-5 bg-white w-[50%] h-[90vh] p-10 shadow-md rounded-lg">
        <div className="flex justify-between w-full">
          <div>
          </div>
          <div className='text-2xl uppercase'>
            {titulo}
          </div>
          <button type="button" onClick={handleClose}>
            <MdOutlineClose size={32} />
          </button>
        </div>
        <div className="flex gap-5 justify-around w-full p-10 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;

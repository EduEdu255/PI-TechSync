import { useRef, useState } from "react";
import styles from "../assets/css/Modal.module.css";
import { MdOutlineClose } from "react-icons/md";


function Modal({ onClose, ida, volta }) {
    const backRef = useRef();
    const handleClose = () =>{
        onClose();
    }
    return (
            <div className={styles.container} ref={backRef} onClick={handleClose}>
                <div className="flex flex-col justify-center items-center bg-white w-[40%] shadow-md rounded-lg">
                    <div className="flex justify-end">
                        <button type="button" onClick={handleClose}><MdOutlineClose /></button>
                    </div>
                    <div>{ida}</div>
                    <div>{volta}</div>
                </div>
            </div>
    )
}

export default Modal;
import React from "react";
import { GrClose } from "react-icons/gr";
import Modal from "react-modal";

const customStyles = {
    content: {
        background: "auto",
        height: "auto",
        width: "100%",
    },
    overlay: {
        background: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999999,
    },
};

interface ModalProps {
    isOpen: boolean;
    toggleModal: () => void;
    children?: React.ReactNode;
}

const AlertModel: React.FC<ModalProps> = ({
    isOpen,
    toggleModal,
    children,
}) => {
   
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent rounded-md"
        >
            <div className="cursor-pointer absolute right-20 top-2 shadow-4 p-5 rounded-full" onClick={toggleModal}>
                <GrClose className='text-4xl capitalize font-extrabold text-slate-800 ' />
            </div>
            <div className="px-2">{children}</div>
        </Modal>
    );
};

export default AlertModel;
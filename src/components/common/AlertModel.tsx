import React from 'react';
import Modal from 'react-modal';

const customStyles = {
	content: {
		background: 'auto',
		height: 'auto',
	},
	overlay: {
		background: 'rgba(0, 0, 0, 0.5)',
		zIndex: 999, // Set the z-index to 999
	},
};

interface ModalProps {
	isOpen: boolean;
	toggleModal: () => void;
	children?: React.ReactNode;
}

const AlertModel: React.FC<ModalProps> = ({ isOpen, toggleModal, children }) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={toggleModal}
			style={customStyles}
			contentLabel="Example Modal"
			ariaHideApp={false}
			className="absolute inset-0 flex items-center justify-center"
		>
			<div className="px-2">{children}</div>
		</Modal>
	);
};

export default AlertModel;

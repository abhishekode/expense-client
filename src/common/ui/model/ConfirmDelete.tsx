import AlertModel from '@/common/model/AlertModel';
import React from 'react'
import { FaPersonCircleQuestion } from 'react-icons/fa6';
import { GrClose } from 'react-icons/gr';

interface SureDeleteTodoProps {
	isOpen: boolean;
	toggleModel: () => void;
	todoIndex: number;
}
const SureDeleteTodo: React.FC<SureDeleteTodoProps> = ({ isOpen, toggleModel }) => {


	const handleLogoutUser = () => {
		toggleModel()
	}
	return (
		<AlertModel isOpen={isOpen} toggleModal={toggleModel} >
			<div className="">
				<div className="relative w-full max-w-md max-h-full">
					<div className="relative rounded-lg shadow bg-white w-full">
						<button
							className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
							onClick={toggleModel}
						>
							<GrClose />
							<span className="sr-only">Close modal</span>
						</button>
						<div className="p-6 text-center">

							<FaPersonCircleQuestion className="mx-auto mb-4 text-gray-700 w-12 h-12" />
							<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this booking?</h3>
							<button
								className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
								onClick={handleLogoutUser}
							>
								Yes, I&apos;m sure
							</button>
							<button
								className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
								onClick={toggleModel}
							>No, cancel</button>
						</div>
					</div>
				</div>
			</div>

		</AlertModel>
	)
}

export default SureDeleteTodo
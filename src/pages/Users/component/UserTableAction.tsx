import React from 'react';
import { MdDelete, MdRemoveRedEye } from 'react-icons/md';
import { IUser } from '@/common/Interfaces';
import { useNavigate } from 'react-router-dom';

interface UserTableActionProps {
    data: IUser;
}

const UserTableAction: React.FC<UserTableActionProps> = ({ data }) => {
    const navigate = useNavigate()


    const handleDeleteClick = () => {
        console.log('Delete clicked', data);
    };


    const navigateToUserProfile = (id: string) => {
        navigate(`/user/profile/${id}`)
    }

    return (
        <div>
            <div className="flex gap-x-3 py-3 px-6 whitespace-nowrap capitalize">
                <button
                    className="bg-gray-500 hover:bg-gray-700 font-bold rounded"
                    onClick={() => navigateToUserProfile(data._id)}
                >
                    <MdRemoveRedEye className='text-xl' />
                </button>
                <button
                    className="hover:bg-red-100 font-bold rounded"
                    onClick={handleDeleteClick}
                >
                    <MdDelete className='text-xl' />
                </button>
            </div>
        </div>
    );
};

export default UserTableAction;

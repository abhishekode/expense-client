import { FaCar, FaSitemap, FaUser } from "react-icons/fa";
import { UserRole } from "../../common/Interfaces";
import { IoDocumentAttach } from "react-icons/io5";
import { MdEmojiTransportation } from "react-icons/md";

export const getUserProfileTabs = (role?: UserRole) => {
    const userProfileTabs = [
      {
        key: '1',
        label: 'Basic Profile',
        Icon: <FaUser />,
        title: 'Profile',
      }
    ];
  
    if (role === UserRole.Driver) {
      userProfileTabs.push(
        {
          key: '2',
          label: 'Document',
          Icon: <IoDocumentAttach />,
          title: 'Documents',
        },
        {
          key: '3',
          label: 'Cars',
          Icon: <FaCar />,
          title: 'Cars',
        },
        {
          key: '4',
          label: 'Driver Trip',
          Icon: <FaSitemap />,
          title: 'Driver Trip',
        }
      );
    } 
     if (role === UserRole.Passenger) {
      userProfileTabs.push(
        {
          key: '5',
          label: 'Passenger Preferences',
          Icon: <MdEmojiTransportation />,
          title: 'Passenger Preferences',
        }
      );
    }
  
    return userProfileTabs;
  };
  
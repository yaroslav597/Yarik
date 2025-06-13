import React from 'react';
import { User } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const UserProfileButton: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center space-x-2 text-blue-900">
      <User className="h-6 w-6" />
      {user && (
        <span className="font-medium">
          {user.username}
        </span>
      )}
    </div>
  );
};

export default UserProfileButton;

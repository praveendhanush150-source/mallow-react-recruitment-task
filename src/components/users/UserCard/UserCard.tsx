import React, { useState } from 'react';
import { Card, Avatar, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { User } from '../../../types/user';
import '../../../styles/components/UserCard.css';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="user-card"
      bordered={false}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="user-card-content">
        <div className="user-card-avatar">
          <Avatar src={user.avatar} size={120} />
          {isHovered && (
            <div className="user-card-actions">
              <Button
                className="action-button edit"
                icon={<EditOutlined />}
                onClick={() => onEdit(user)}
              />
              <Button
                className="action-button delete"
                icon={<DeleteOutlined />}
                onClick={() => onDelete(user.id)}
              />
            </div>
          )}
        </div>
        <div className="user-card-info">
          <h3 className="user-card-name">{`${user.first_name} ${user.last_name}`}</h3>
          <p className="user-card-email">{user.email}</p>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;

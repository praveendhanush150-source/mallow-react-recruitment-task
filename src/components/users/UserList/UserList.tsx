// components/users/UserList/UserList.tsx
import React from 'react';
import { Table, Avatar, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { User } from '../../../types/user';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  const columns = [
    {
      title: '',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 60,
      render: (avatar: string, record: User) => (
        <Avatar src={avatar} size={40}>
          {record.first_name[0]}
        </Avatar>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => (
        <a href={`mailto:${email}`} style={{ color: '#1890ff' }}>
          {email}
        </a>
      ),
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      render: (_: any, record: User) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      rowKey="id"
      pagination={false}
      size="middle"
    />
  );
};

export default UserList;
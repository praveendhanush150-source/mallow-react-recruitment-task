import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Button,
  Space,
  Pagination,
  Modal,
  message,
  Form,
  Input,
  Table,
  Avatar,
} from 'antd';
import {
  PlusOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useUsers } from '../../hooks/useUsers';
import UserCard from '../../components/users/UserCard';
import { User, UserFormData } from '../../types/user';
import { filterUsers } from '../../utils/helpers';

const Users: React.FC = () => {
  const {
    users,
    loading,
    currentPage,
    totalPages,
    viewMode,
    searchTerm,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    setSearchTerm,
    setViewMode,
    setCurrentPage,
  } = useUsers();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const showModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      form.setFieldsValue(user);
    } else {
      setEditingUser(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        await updateUser(editingUser.id, values);
        message.success('User updated successfully');
      } else {
        await createUser(values);
        message.success('User created successfully');
      }
      setIsModalVisible(false);
      fetchUsers(currentPage);
    } catch (error) {
      message.error('Error occurred while saving user');
    }
  };

  const handleDelete = async (userId: number) => {
    try {
      await deleteUser(userId);
      message.success('User deleted successfully');
      fetchUsers(currentPage);
    } catch (error) {
      message.error('Error occurred while deleting user');
    }
  };

  const filteredUsers = filterUsers(users, searchTerm);

  const columns = [
    {
      title: '',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 60,
      render: (avatar: string) => <Avatar src={avatar} />,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
      render: (_: any, record: User) => (
        <Space>
          <Button type="primary" onClick={() => showModal(record)}>
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="users-page">
      <div style={{ padding: '20px' }}>
        <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
          <Col>
            <h1 style={{ margin: 0, fontSize: '24px' }}>Users</h1>
          </Col>
          <Col>
            <Space>
              <Input
                prefix={<SearchOutlined />}
                placeholder="input search text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ width: '240px' }}
              />
              <Space>
                <Button
                  icon={<UnorderedListOutlined />}
                  onClick={() => setViewMode('list')}
                  style={{ color: viewMode === 'list' ? '#1890ff' : undefined }}
                >
                  {'Table'}
                </Button>
                <Button
                  icon={ <AppstoreOutlined />}
                  onClick={() => setViewMode('card')}
                  style={{ color: viewMode === 'card' ? '#1890ff' : undefined }}
                >
                  {'Card'}
                </Button>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => showModal()}
                >
                  Create User
                </Button>
              </Space>
            </Space>
          </Col>
        </Row>

        {viewMode === 'list' ? (
          <Table
            columns={columns}
            dataSource={filteredUsers}
            rowKey="id"
            pagination={{
              current: currentPage,
              total: totalPages * 10,
              onChange: (page) => setCurrentPage(page),
            }}
            loading={loading}
          />
        ) : (
          <Row gutter={[24, 24]}>
            {filteredUsers.map((user) => (
              <Col key={user.id} xs={24} sm={12} md={8} xl={6}>
                <UserCard
                  user={user}
                  onEdit={() => showModal(user)}
                  onDelete={handleDelete}
                />
              </Col>
            ))}
          </Row>
        )}
      </div>

      <Modal
        title={editingUser ? 'Edit User' : 'Create User'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={editingUser || {}}
        >
          <Form.Item
            name="first_name"
            label="First Name"
            rules={[{ required: true, message: 'Please input first name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Last Name"
            rules={[{ required: true, message: 'Please input last name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input email!' },
              { type: 'email', message: 'Please input valid email!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="avatar"
            label="Avatar URL"
            rules={[{ type: 'url', message: 'Please input valid URL!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;

// components/users/UserModal/UserModal.tsx
import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { UserOutlined, MailOutlined, LinkOutlined } from '@ant-design/icons';
import { User, UserFormData } from '../../../types/user';

interface UserModalProps {
  visible: boolean;
  user: User | null;
  onSubmit: (userData: UserFormData) => Promise<void>;
  onCancel: () => void;
}

const UserModal: React.FC<UserModalProps> = ({
  visible,
  user,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (visible) {
      if (user) {
        form.setFieldsValue({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          avatar: user.avatar,
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, user, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await onSubmit(values);
      form.resetFields();
    } catch (error) {
      // Validation failed or submission failed
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const validateUrl = (_: any, value: string) => {
    if (!value) return Promise.resolve();
    
    try {
      new URL(value);
      return Promise.resolve();
    } catch {
      return Promise.reject(new Error('Please enter a valid URL'));
    }
  };

  return (
    <Modal
      title={user ? 'Edit User' : 'Create New User'}
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          Submit
        </Button>,
      ]}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        name="userForm"
      >
        <Form.Item
          name="first_name"
          label="First Name"
          rules={[
            { required: true, message: 'Please enter first name' },
            { min: 2, message: 'First name must be at least 2 characters' },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Please enter first name"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[
            { required: true, message: 'Please enter last name' },
            { min: 2, message: 'Last name must be at least 2 characters' },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Please enter last name"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Please enter email"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="avatar"
          label="Profile Image Link"
          rules={[
            { required: true, message: 'Please enter profile image link' },
            { validator: validateUrl },
          ]}
        >
          <Input
            prefix={<LinkOutlined />}
            placeholder="Please enter profile image link"
            size="large"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../store/slices/authSlice';
import { LoginCredentials } from '../../../types/auth';
import { useAuth } from '../../../hooks/useAuth';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { DEFAULT_LOGIN_CREDENTIALS } from '../../../utils/constants';

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAuth();
  const [form] = Form.useForm();

  const onFinish = async (values: LoginCredentials) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      navigate('/users');
    } catch (err) {
      message.error('Login failed. Please check your credentials.');
    }
  };

  const fillDefaultCredentials = () => {
    form.setFieldsValue(DEFAULT_LOGIN_CREDENTIALS);
  };

  return (
    <Card title="Login" style={{ maxWidth: 400, margin: '100px auto' }}>
      <Form
        form={form}
        name="login"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Email"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Log in
          </Button>
        </Form.Item>

        <Button type="link" onClick={fillDefaultCredentials} block>
          Use Default Credentials
        </Button>
      </Form>
    </Card>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Layout as AntLayout, Menu, Dropdown, Avatar, Space } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { logout } from '../../../store/slices/authSlice';
import { useAuth } from '../../../hooks/useAuth';
import './Layout.css';

const { Header, Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const userMenuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <AntLayout className="layout">
      {isAuthenticated && (
        <Header className="header">
          <div className="header-content">
            <div className="logo">
              <span>Elon Musk</span>
            </div>
            <div className="user-menu">
              <Dropdown
                menu={{ items: userMenuItems }}
                placement="bottomRight"
                trigger={['click']}
              >
                <Space className="user-info">
                  <Avatar size={32} src="https://api.dicebear.com/7.x/avataaars/svg?seed=elonmusk" />
                </Space>
              </Dropdown>
            </div>
          </div>
        </Header>
      )}
      <Content className="content">{children}</Content>
    </AntLayout>
  );
};

export default Layout;

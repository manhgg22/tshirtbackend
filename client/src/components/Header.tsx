import React from 'react';
import { Layout, Menu, Badge, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/authSlice';
import { CartItem } from '../types';
import { 
  ShoppingCartOutlined, 
  UserOutlined, 
  LogoutOutlined,
  ShoppingOutlined,
  PlusCircleOutlined 
} from '@ant-design/icons';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  const cartItemCount = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  const menuItems = [
    { key: 'shop', label: 'Shop', icon: <ShoppingOutlined />, onClick: () => navigate('/products') },
    { key: 'design', label: 'Create Design', icon: <PlusCircleOutlined />, onClick: () => navigate('/custom-design') },
    { 
      key: 'cart', 
      label: (
        <Badge count={cartItemCount} size="small">
          <span>Cart</span>
        </Badge>
      ), 
      icon: <ShoppingCartOutlined />,
      onClick: () => navigate('/cart')
    },
  ];

  const authMenuItems = user ? [
    { key: 'profile', label: 'Profile', icon: <UserOutlined />, onClick: () => navigate('/profile') },
    { key: 'logout', label: 'Logout', icon: <LogoutOutlined />, onClick: () => dispatch(logout()) }
  ] : [
    { key: 'login', label: 'Login', onClick: () => navigate('/login') },
    { key: 'register', label: 'Register', onClick: () => navigate('/register') }
  ];

  return (
    <AntHeader className="header" style={{ background: '#fff', padding: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
        <div className="logo" style={{ marginRight: 40 }}>
          <Link to="/" style={{ color: '#1890ff', fontSize: '24px', fontWeight: 'bold', textDecoration: 'none' }}>
            VN T-Shirts
          </Link>
        </div>
        <Menu
          mode="horizontal"
          items={[...menuItems, ...authMenuItems]}
          style={{ flex: 1, borderBottom: 'none' }}
        />
      </div>
    </AntHeader>
  );
};


export default Header;

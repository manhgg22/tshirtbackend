import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider, Layout } from 'antd';
import { store } from './redux/store';
import HeaderVietnamese from './components/HeaderVietnamese';
import FooterVietnamese from './components/FooterVietnamese';
import HomePageVietnamese from './pages/HomePageVietnamese';
import LandingPage from './pages/LandingPage';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import CustomDesignPage from './pages/CustomDesignPage';
import ProductDetailPage from './pages/ProductDetailPage';
import WishlistPage from './pages/WishlistPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProfilePage from './pages/ProfilePage';
import WebhookLogsPage from './pages/WebhookLogsPage';
import './index.css'

const { Content } = Layout;

// Component để kiểm tra route và quyết định layout
function AppLayout({ children }) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  
  if (isAuthPage) {
    // Trang auth không có header và footer
    return <>{children}</>;
  }
  
  // Các trang khác có header và footer
  return (
    <Layout className="min-h-screen" style={{ display: 'flex', flexDirection: 'column' }}>
      <HeaderVietnamese />
      <Content className="site-content" style={{ flex: 1 }}>
        {children}
      </Content>
      <FooterVietnamese />
    </Layout>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#A61C1C',
            colorSuccess: '#2E8B57',
            colorWarning: '#C89B3C',
            colorError: '#A61C1C',
            colorBgBase: '#FAF4E1',
            colorText: '#2C2C2C',
            colorBorder: '#C89B3C',
            colorLink: '#A61C1C',
            borderRadius: 12,
            fontFamily: 'Be Vietnam Pro, Inter, sans-serif',
            fontSize: 16,
          },
        }}
      >
        <Router>
          <AppLayout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<HomePageVietnamese />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/orders/:id" element={<OrdersPage />} />
              <Route path="/track" element={<OrderTrackingPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/webhooks" element={<WebhookLogsPage />} />
              <Route path="/custom-design" element={<CustomDesignPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </AppLayout>
        </Router>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import './index.css'

const { Content } = Layout;

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
          <Layout className="min-h-screen" style={{ display: 'flex', flexDirection: 'column' }}>
            <HeaderVietnamese />
            <Content className="site-content" style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<HomePageVietnamese />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/orders/:id" element={<OrdersPage />} />
                <Route path="/custom-design" element={<CustomDesignPage />} />
              </Routes>
            </Content>
            <FooterVietnamese />
          </Layout>
        </Router>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider, Layout } from 'antd';
import { store } from './redux/store';
import HeaderVietnamese from './components/HeaderVietnamese';
import FooterVietnamese from './components/FooterVietnamese';
import HomePageVietnamese from './pages/HomePageVietnamese';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import CustomDesignPage from './pages/CustomDesignPage';
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
            borderRadius: 12,
            fontFamily: 'Inter, sans-serif',
            fontSize: 16,
          },
        }}
      >
        <Router>
          <Layout className="min-h-screen" style={{ display: 'flex', flexDirection: 'column' }}>
            <HeaderVietnamese />
            <Content className="site-content" style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<HomePageVietnamese />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/cart" element={<CartPage />} />
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
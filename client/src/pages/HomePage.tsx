import React, { useEffect } from 'react';
import { Typography, Row, Col, Spin, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchProducts } from '../redux/productSlice';
import { addItem } from '../redux/cartSlice';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

const { Title } = Typography;

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <Spin size="large" />
    </div>
  );
  
  if (error) return (
    <div style={{ padding: '20px' }}>
      <Alert type="error" message={error} />
    </div>
  );

  return (
    <div className="site-content" style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
      <Title level={2} style={{ marginBottom: '24px' }}>
        Featured Products
      </Title>
      <Row gutter={[24, 24]}>
        {products.map((product: Product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
            <ProductCard
              product={product}
              onAddToCart={() => dispatch(addItem({ product, quantity: 1 }))}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomePage;

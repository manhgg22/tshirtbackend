// Component thanh toán QR đơn giản cho checkout
import React, { useState } from 'react';
import { Button, Card, Space, Typography, message } from 'antd';
import { QrcodeOutlined, CreditCardOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title, Text } = Typography;

const QRPaymentButton = ({ orderData, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleQRPayment = async () => {
    setLoading(true);
    try {
      // Tạo đơn hàng với QR payment
      const response = await axios.post('/api/payment/create', {
        items: orderData.items,
        total: orderData.total,
        customerInfo: orderData.customerInfo,
        shippingAddress: orderData.shippingAddress,
        paymentMethod: 'qr_tpbank'
      });

      if (response.data.success) {
        message.success('Đơn hàng đã được tạo!');
        
        // Chuyển đến trang thanh toán QR
        navigate(`/payment/${response.data.orderCode}`);
        
        // Gọi callback nếu có
        if (onSuccess) {
          onSuccess(response.data);
        }
      }
    } catch (error) {
      console.error('Create order error:', error);
      message.error('Không thể tạo đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ marginTop: '20px' }}>
      <Title level={4}>
        <QrcodeOutlined /> Thanh toán qua QR Code
      </Title>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text>
          Quét mã QR để thanh toán nhanh chóng và an toàn qua ứng dụng ngân hàng
        </Text>
        <Text type="secondary">
          • Hỗ trợ tất cả ngân hàng có ứng dụng mobile banking
          • Thanh toán được xác nhận tự động
          • Bảo mật cao với mã QR duy nhất cho mỗi đơn hàng
        </Text>
        <Button
          type="primary"
          size="large"
          icon={<QrcodeOutlined />}
          onClick={handleQRPayment}
          loading={loading}
          style={{ 
            width: '100%',
            height: '50px',
            fontSize: '16px',
            background: '#A61C1C',
            borderColor: '#A61C1C'
          }}
        >
          Thanh toán bằng QR Code
        </Button>
      </Space>
    </Card>
  );
};

export default QRPaymentButton;

// Trang thanh toán QR với countdown timer và polling
import React, { useState, useEffect, useRef } from 'react';
import { 
  Card, 
  Typography, 
  Button, 
  Space, 
  Spin, 
  Alert, 
  Divider,
  Row,
  Col,
  Image,
  Tag,
  Progress,
  message,
  Modal
} from 'antd';
import { 
  QrcodeOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined,
  CloseCircleOutlined,
  ReloadOutlined,
  CopyOutlined,
  BankOutlined,
  PhoneOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/api.js';

const { Title, Text, Paragraph } = Typography;

const PaymentPage = () => {
  const { orderCode } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  const [pollingInterval, setPollingInterval] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const intervalRef = useRef(null);

  // Fetch order data
  const fetchOrderData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/payment/info/${orderCode}`);
      if (response.data.success) {
        setOrder(response.data.order);
        setTimeRemaining(response.data.timeRemaining);
        setIsExpired(response.data.isExpired);
        
        // If order is paid, show success modal
        if (response.data.order.paymentStatus === 'paid') {
          setShowSuccessModal(true);
          clearInterval(intervalRef.current);
        }
      }
    } catch (error) {
      console.error('Fetch order error:', error);
      message.error('Không thể tải thông tin đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  // Check payment status
  const checkPaymentStatus = async () => {
    try {
      console.log('🔄 Checking payment status for:', orderCode);
      const response = await axios.get(`${API_BASE_URL}/payment/status/${orderCode}`);
      console.log('📊 Payment status response:', response.data);
      
      if (response.data.success) {
        if (response.data.paymentStatus === 'paid') {
          console.log('✅ Payment confirmed! Redirecting...');
          setOrder(prev => ({ ...prev, paymentStatus: 'paid', status: 'paid' }));
          setShowSuccessModal(true);
          clearInterval(intervalRef.current);
          message.success('Thanh toán thành công!');
          
          // Auto redirect after 2 seconds
          setTimeout(() => {
            navigate('/orders');
          }, 2000);
        }
      }
    } catch (error) {
      console.error('❌ Check payment status error:', error);
      // Don't stop polling on error, just log it
    }
  };

  // Start polling
  const startPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    console.log('🚀 Starting payment polling...');
    // Check immediately first
    checkPaymentStatus();
    
    // Then check every 2 seconds
    intervalRef.current = setInterval(() => {
      checkPaymentStatus();
    }, 2000);
  };

  // Stop polling
  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Countdown timer
  useEffect(() => {
    if (timeRemaining > 0 && !isExpired) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1000) {
            setIsExpired(true);
            stopPolling();
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining, isExpired]);

  // Initialize
  useEffect(() => {
    fetchOrderData();
    
    // Start polling if order is not paid and not expired
    if (order && order.paymentStatus !== 'paid' && !isExpired) {
      startPolling();
    }

    return () => {
      stopPolling();
    };
  }, [orderCode]);

  // Format time
  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    message.success('Đã sao chép!');
  };

  // Cancel order
  const handleCancelOrder = async () => {
    try {
      await axios.post(`/api/payment/cancel/${orderCode}`);
      message.success('Đã hủy đơn hàng');
      navigate('/');
    } catch (error) {
      message.error('Không thể hủy đơn hàng');
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh' 
      }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!order) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <Alert
          message="Không tìm thấy đơn hàng"
          description="Mã đơn hàng không hợp lệ hoặc đã bị xóa."
          type="error"
          showIcon
        />
        <Button type="primary" onClick={() => navigate('/')} style={{ marginTop: '20px' }}>
          Về trang chủ
        </Button>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh'
    }}>
      <Card style={{ marginBottom: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Title level={2} style={{ color: '#A61C1C', marginBottom: '10px' }}>
            💳 Thanh toán đơn hàng
          </Title>
          <Text strong style={{ fontSize: '18px' }}>
            Mã đơn hàng: {order.orderCode}
          </Text>
        </div>

        {/* Payment Status */}
        <Row gutter={[20, 20]}>
          <Col xs={24} md={12}>
            <Card>
              <Title level={4}>📋 Thông tin đơn hàng</Title>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <Text strong>Mã đơn hàng:</Text> {order.orderCode}
                </div>
                <div>
                  <Text strong>Tổng tiền:</Text> 
                  <Text style={{ color: '#A61C1C', fontSize: '18px', fontWeight: 'bold' }}>
                    {order.total?.toLocaleString('vi-VN')} VNĐ
                  </Text>
                </div>
                <div>
                  <Text strong>Trạng thái:</Text> 
                  <Tag color={order.paymentStatus === 'paid' ? 'green' : 'orange'}>
                    {order.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chờ thanh toán'}
                  </Tag>
                </div>
                <div>
                  <Text strong>Thời gian còn lại:</Text>
                  <Text style={{ color: isExpired ? '#ff4d4f' : '#52c41a' }}>
                    {isExpired ? 'Hết hạn' : `${Math.floor(timeRemaining / 60000)}:${Math.floor((timeRemaining % 60000) / 1000).toString().padStart(2, '0')}`}
                  </Text>
                </div>
              </Space>
              
              {/* Manual Check Button */}
              <Divider />
              <div style={{ textAlign: 'center' }}>
                <Button 
                  type="primary" 
                  icon={<ReloadOutlined />}
                  onClick={checkPaymentStatus}
                  style={{ marginRight: '10px' }}
                >
                  Kiểm tra thanh toán
                </Button>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Tự động kiểm tra mỗi 2 giây
                </Text>
              </div>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card>
              <Title level={4}>⏰ Thời gian còn lại</Title>
              <div style={{ textAlign: 'center' }}>
                {isExpired ? (
                  <div>
                    <CloseCircleOutlined style={{ fontSize: '48px', color: '#ff4d4f' }} />
                    <div style={{ marginTop: '10px' }}>
                      <Text type="danger" style={{ fontSize: '18px' }}>
                        Đã hết hạn thanh toán
                      </Text>
                    </div>
                  </div>
                ) : (
                  <div>
                    <ClockCircleOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                    <div style={{ marginTop: '10px' }}>
                      <Text style={{ fontSize: '32px', fontWeight: 'bold', color: '#1890ff' }}>
                        {formatTime(timeRemaining)}
                      </Text>
                    </div>
                    <Progress 
                      percent={Math.round((timeRemaining / (15 * 60 * 1000)) * 100)} 
                      status="active"
                      style={{ marginTop: '10px' }}
                    />
                  </div>
                )}
              </div>
            </Card>
          </Col>
        </Row>

        {/* QR Code Section */}
        {order.paymentStatus !== 'paid' && !isExpired && (
          <Card style={{ marginTop: '20px' }}>
            <Title level={4}>📱 Quét mã QR để thanh toán</Title>
            <Row gutter={[20, 20]}>
              <Col xs={24} md={12}>
                <div style={{ textAlign: 'center' }}>
                  {order.qrCode?.imageUrl ? (
                    <Image
                      src={order.qrCode.imageUrl}
                      alt="QR Code"
                      style={{ maxWidth: '300px', border: '2px solid #d9d9d9', borderRadius: '8px' }}
                    />
                  ) : (
                    <div style={{ 
                      width: '300px', 
                      height: '300px', 
                      border: '2px dashed #d9d9d9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto'
                    }}>
                      <QrcodeOutlined style={{ fontSize: '48px', color: '#d9d9d9' }} />
                    </div>
                  )}
                  <div style={{ marginTop: '10px' }}>
                    <Button 
                      type="primary" 
                      icon={<ReloadOutlined />}
                      onClick={fetchOrderData}
                      loading={loading}
                    >
                      Làm mới
                    </Button>
                  </div>
                </div>
              </Col>

              <Col xs={24} md={12}>
                <Title level={5}>🏦 Thông tin chuyển khoản</Title>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <Text strong><BankOutlined /> Ngân hàng: </Text>
                    <Text>{order.qrCode?.bankName || 'TPBank'}</Text>
                  </div>
                  <div>
                    <Text strong>Số tài khoản: </Text>
                    <Text copyable={{ text: order.qrCode?.bankAccount || '0359937294' }}>
                      {order.qrCode?.bankAccount || '0359937294'}
                    </Text>
                  </div>
                  <div>
                    <Text strong>Chủ tài khoản: </Text>
                    <Text>Nguyen Van A</Text>
                  </div>
                  <div>
                    <Text strong>Số tiền: </Text>
                    <Text style={{ color: '#A61C1C', fontWeight: 'bold' }}>
                      {order.total.toLocaleString('vi-VN')} VND
                    </Text>
                  </div>
                  <div>
                    <Text strong>Nội dung: </Text>
                    <Text copyable={{ text: `Thanh toan don hang ${order.orderCode}` }}>
                      Thanh toan don hang {order.orderCode}
                    </Text>
                  </div>
                </Space>

                <Divider />

                <Alert
                  message="Hướng dẫn thanh toán"
                  description={
                    <div>
                      <p>1. Mở ứng dụng ngân hàng trên điện thoại</p>
                      <p>2. Chọn "Quét mã QR" hoặc "Chuyển khoản"</p>
                      <p>3. Quét mã QR hoặc nhập thông tin chuyển khoản</p>
                      <p>4. Kiểm tra thông tin và xác nhận thanh toán</p>
                      <p>5. Hệ thống sẽ tự động cập nhật trạng thái</p>
                    </div>
                  }
                  type="info"
                  showIcon
                />
              </Col>
            </Row>
          </Card>
        )}

        {/* Customer Info */}
        <Card style={{ marginTop: '20px' }}>
          <Title level={4}><HomeOutlined /> Thông tin giao hàng</Title>
          <Row gutter={[20, 10]}>
            <Col xs={24} sm={12}>
              <Text strong>Tên người nhận: </Text>
              <Text>{order.customerInfo?.name}</Text>
            </Col>
            <Col xs={24} sm={12}>
              <Text strong><PhoneOutlined /> SĐT: </Text>
              <Text>{order.customerInfo?.phone}</Text>
            </Col>
            <Col xs={24}>
              <Text strong>Địa chỉ: </Text>
              <Text>{order.customerInfo?.address}, {order.customerInfo?.district}, {order.customerInfo?.city}</Text>
            </Col>
          </Row>
        </Card>

        {/* Actions */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Space>
            <Button onClick={() => navigate('/')}>
              Về trang chủ
            </Button>
            {isExpired && (
              <Button type="primary" danger onClick={handleCancelOrder}>
                Hủy đơn hàng
              </Button>
            )}
          </Space>
        </div>
      </Card>

      {/* Success Modal */}
      <Modal
        title="🎉 Thanh toán thành công!"
        open={showSuccessModal}
        onCancel={() => setShowSuccessModal(false)}
        footer={[
          <Button key="home" onClick={() => navigate('/')}>
            Về trang chủ
          </Button>,
          <Button key="orders" type="primary" onClick={() => navigate('/orders')}>
            Xem đơn hàng
          </Button>
        ]}
        centered
      >
        <div style={{ textAlign: 'center' }}>
          <CheckCircleOutlined style={{ fontSize: '64px', color: '#52c41a', marginBottom: '20px' }} />
          <Title level={3} style={{ color: '#52c41a' }}>
            Đơn hàng đã được thanh toán thành công!
          </Title>
          <Paragraph>
            Cảm ơn bạn đã mua hàng. Chúng tôi sẽ xử lý đơn hàng và giao hàng sớm nhất có thể.
          </Paragraph>
          <Text type="secondary">
            Mã đơn hàng: {order.orderCode}
          </Text>
        </div>
      </Modal>
    </div>
  );
};

export default PaymentPage;

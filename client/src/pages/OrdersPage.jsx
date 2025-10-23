import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Space, Tag, Modal, message, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { QrcodeOutlined, EyeOutlined, CheckCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const navigate = useNavigate();
  const API_BASE_URL = 'https://inkverse.online/api';

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/all`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      message.error('Lỗi tải danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'orange',
      'paid': 'green',
      'processing': 'blue',
      'shipped': 'purple',
      'delivered': 'green',
      'cancelled': 'red'
    };
    return colors[status] || 'default';
  };

  const getStatusText = (status) => {
    const texts = {
      'pending': '⏳ Chờ thanh toán',
      'paid': '✅ Đã thanh toán',
      'processing': '🔄 Đang xử lý',
      'shipped': '🚚 Đang giao',
      'delivered': '✅ Đã giao',
      'cancelled': '❌ Đã hủy'
    };
    return texts[status] || status;
  };

  const showQRModal = (order) => {
    setSelectedOrder(order);
    setQrModalVisible(true);
  };

  const markAsPaid = async (orderId) => {
    try {
      await axios.patch(`${API_BASE_URL}/orders/${orderId}/mark-paid`);
      message.success('Đã đánh dấu đơn hàng là đã thanh toán!');
      fetchOrders(); // Refresh orders
    } catch (error) {
      console.error('Error marking as paid:', error);
      message.error('Lỗi cập nhật trạng thái thanh toán');
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Spin size="large" />
        <div style={{ marginTop: '16px' }}>
          <Text>Đang tải danh sách đơn hàng...</Text>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={2}>📋 Đơn hàng của tôi</Title>
        <Button type="primary" onClick={() => navigate('/products')}>
          🛍️ Tiếp tục mua sắm
        </Button>
      </div>

      {orders.length === 0 ? (
        <Card style={{ textAlign: 'center', padding: '40px' }}>
          <Title level={3}>Chưa có đơn hàng nào!</Title>
          <Text type="secondary">Hãy bắt đầu mua sắm để tạo đơn hàng đầu tiên.</Text>
          <br />
          <Button type="primary" onClick={() => navigate('/products')} style={{ marginTop: '16px' }}>
            Xem sản phẩm
          </Button>
        </Card>
      ) : (
        <Row gutter={[16, 16]}>
          {orders.map((order) => (
            <Col xs={24} key={order._id}>
              <Card>
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={16}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <div>
                        <Title level={4} style={{ margin: 0 }}>
                          Đơn hàng #{order.orderCode}
                        </Title>
                        <Text type="secondary">
                          Ngày tạo: {new Date(order.createdAt).toLocaleString('vi-VN')}
                        </Text>
                      </div>
                      
                      <div>
                        <Text strong>Khách hàng: </Text>
                        <Text>{order.customerInfo?.name || 'N/A'}</Text>
                        <br />
                        <Text strong>SĐT: </Text>
                        <Text>{order.customerInfo?.phone || 'N/A'}</Text>
                        <br />
                        <Text strong>Địa chỉ: </Text>
                        <Text>{order.customerInfo?.address || 'N/A'}, {order.customerInfo?.city || 'N/A'}</Text>
                      </div>

                      <div>
                        <Text strong>Tổng tiền: </Text>
                        <Text strong style={{ color: '#1890ff', fontSize: '16px' }}>
                          {order.total.toLocaleString('vi-VN')}đ
                        </Text>
                        <br />
                        <Text strong>Số sản phẩm: </Text>
                        <Text>{order.items.length} sản phẩm</Text>
                      </div>
                    </Space>
                  </Col>

                  <Col xs={24} md={8}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <div style={{ textAlign: 'right' }}>
                        <Tag color={getStatusColor(order.paymentStatus)} style={{ fontSize: '14px', padding: '4px 8px' }}>
                          {getStatusText(order.paymentStatus)}
                        </Tag>
                      </div>

                      <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                        <Button 
                          icon={<EyeOutlined />} 
                          onClick={() => navigate(`/orders/${order._id}`)}
                        >
                          Xem chi tiết
                        </Button>
                        
                        {order.qrCode?.imageUrl && (
                          <Button 
                            icon={<QrcodeOutlined />} 
                            onClick={() => showQRModal(order)}
                          >
                            QR Code
                          </Button>
                        )}
                        
                        {order.paymentStatus === 'pending' && (
                          <Button 
                            type="primary" 
                            icon={<QrcodeOutlined />}
                            onClick={() => navigate(`/payment/${order.orderCode}`)}
                          >
                            Thanh toán QR
                          </Button>
                        )}
                      </Space>
                    </Space>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* QR Modal */}
      <Modal
        title={`💳 QR Code - Đơn hàng #${selectedOrder?.orderCode}`}
        open={qrModalVisible}
        onCancel={() => setQrModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setQrModalVisible(false)}>
            Đóng
          </Button>,
          selectedOrder?.paymentStatus === 'pending' && (
            <Button 
              key="payment" 
              type="primary" 
              onClick={() => {
                navigate(`/payment/${selectedOrder.orderCode}`);
                setQrModalVisible(false);
              }}
            >
              Thanh toán QR
            </Button>
          )
        ]}
        width={500}
      >
        {selectedOrder && (
          <div style={{ textAlign: 'center' }}>
            <img 
              src={selectedOrder.qrCode?.imageUrl} 
              alt="QR Code" 
              style={{ maxWidth: '300px', width: '100%', border: '2px solid #e8e8e8', borderRadius: '8px' }}
            />
            
            <Card style={{ margin: '20px 0', background: '#f0f8ff', border: '1px solid #1890ff' }}>
              <Title level={4}>Thông tin chuyển khoản:</Title>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div><strong>Ngân hàng:</strong> MBBank</div>
                <div><strong>Số tài khoản:</strong> 686829078888</div>
                <div><strong>Chủ tài khoản:</strong> LE DUC MANH</div>
                <div><strong>Số tiền:</strong> {selectedOrder.total.toLocaleString('vi-VN')}đ</div>
                <div><strong>Nội dung:</strong> Thanh toan don hang {selectedOrder.orderCode}</div>
              </Space>
            </Card>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrdersPage;

import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Card, Row, Col, Typography, Space, Modal, message, Divider } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined, QrcodeOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { clearCart } from '../redux/cartSlice';
import axios from 'axios';

const { Title, Text } = Typography;
const { TextArea } = Input;

const CheckoutPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState(null);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [cities, setCities] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState(true);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  
  const API_BASE_URL = 'http://localhost:5000/api';

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Fetch cities from API
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/cities`);
        setCities(response.data.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
        message.error('Lỗi tải danh sách tỉnh thành phố');
      } finally {
        setCitiesLoading(false);
      }
    };
    
    fetchCities();
  }, []);

  const handleSubmit = async (values) => {
    console.log('🔍 Debug checkout:', {
      cartItems: cartItems,
      cartLength: cartItems.length,
      total: total,
      formValues: values
    });

    if (cartItems.length === 0) {
      message.error('Giỏ hàng trống! Vui lòng thêm sản phẩm vào giỏ hàng trước.');
      return;
    }

    if (total <= 0) {
      message.error('Tổng tiền không hợp lệ!');
      return;
    }

    setLoading(true);
    try {
      console.log('Cart items:', cartItems);
      console.log('Form values:', values);
      
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        })),
        total: total,
        customerInfo: {
          name: values.name,
          phone: values.phone,
          email: values.email || '',
          address: values.address,
          city: values.city,
          district: values.district,
          zipcode: values.zipcode || '',
          note: values.note || ''
        },
        shippingAddress: {
          street: values.address,
          city: values.city,
          state: values.district,
          zipCode: values.zipcode || '000000',
          country: 'Vietnam'
        }
      };

      console.log('Order data:', orderData);
      const response = await axios.post(`${API_BASE_URL}/orders/create`, orderData);
      console.log('Order response:', response.data);
      setOrderCreated(response.data);
      setLoading(false);
      message.success('Tạo đơn hàng thành công!');
      
      // Clear cart
      dispatch(clearCart());
      
    } catch (error) {
      setLoading(false);
      console.error('Error creating order:', error);
      message.error('Lỗi tạo đơn hàng: ' + (error.response?.data?.message || error.message));
    }
  };

  const showQRModal = () => {
    if (orderCreated) {
      setQrModalVisible(true);
    }
  };

  const markAsPaid = async () => {
    try {
      await axios.patch(`${API_BASE_URL}/orders/${orderCreated._id}/mark-paid`);
      message.success('Đã đánh dấu đơn hàng là đã thanh toán!');
      setQrModalVisible(false);
      navigate('/orders');
    } catch (error) {
      console.error('Error marking as paid:', error);
      message.error('Lỗi cập nhật trạng thái thanh toán');
    }
  };

  if (orderCreated) {
    return (
      <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <CheckCircleOutlined style={{ fontSize: '48px', color: '#52c41a', marginBottom: '16px' }} />
          <Title level={2} style={{ color: '#52c41a' }}>Đơn hàng đã được tạo thành công!</Title>
          <Text style={{ fontSize: '18px', color: '#666' }}>
            Mã đơn hàng: <strong>#{orderCreated.orderCode}</strong>
          </Text>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card title="📋 Thông tin đơn hàng" style={{ marginBottom: '20px' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text><strong>Mã đơn hàng:</strong></Text>
                  <Text>#{orderCreated.orderCode}</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text><strong>Ngày tạo:</strong></Text>
                  <Text>{new Date(orderCreated.createdAt).toLocaleString('vi-VN')}</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text><strong>Tổng tiền:</strong></Text>
                  <Text strong style={{ color: '#1890ff' }}>
                    {orderCreated.total.toLocaleString('vi-VN')}đ
                  </Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text><strong>Trạng thái:</strong></Text>
                  <Text style={{ color: '#faad14' }}>⏳ Chờ thanh toán</Text>
                </div>
              </Space>

              <Divider />
              <Title level={4}>Sản phẩm đã đặt:</Title>
              {orderCreated.items.map((item, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  padding: '8px 0', 
                  borderBottom: '1px solid #f0f0f0' 
                }}>
                  <div>
                    <Text strong>{item.productId?.name || 'Sản phẩm'}</Text>
                    <br />
                    <Text type="secondary">Số lượng: {item.quantity}</Text>
                  </div>
                  <Text strong>
                    {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                  </Text>
                </div>
              ))}
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="🏠 Thông tin giao hàng" style={{ marginBottom: '20px' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div><strong>Người nhận:</strong> {orderCreated.customerInfo?.name}</div>
                <div><strong>Địa chỉ:</strong> {orderCreated.customerInfo?.address}</div>
                <div><strong>Thành phố:</strong> {orderCreated.customerInfo?.city}</div>
                <div><strong>Quận/Huyện:</strong> {orderCreated.customerInfo?.district}</div>
                <div><strong>Mã bưu điện:</strong> {orderCreated.customerInfo?.zipcode || 'N/A'}</div>
                {orderCreated.customerInfo?.note && (
                  <div><strong>Ghi chú:</strong> {orderCreated.customerInfo.note}</div>
                )}
              </Space>
            </Card>

            <Card title="💳 Hướng dẫn thanh toán" style={{ background: '#f6ffed', border: '1px solid #b7eb8f' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div><strong>Bước 1:</strong> Quét mã QR bên dưới bằng ứng dụng ngân hàng</div>
                <div><strong>Bước 2:</strong> Kiểm tra thông tin chuyển khoản</div>
                <div><strong>Bước 3:</strong> Thực hiện chuyển khoản</div>
                <div><strong>Bước 4:</strong> Admin sẽ xác nhận thanh toán</div>
                
                <Button 
                  type="primary" 
                  icon={<QrcodeOutlined />}
                  onClick={showQRModal}
                  style={{ width: '100%', marginTop: '16px' }}
                >
                  📱 Xem mã QR thanh toán
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Space>
            <Button onClick={() => navigate('/products')}>
              🛍️ Tiếp tục mua sắm
            </Button>
            <Button type="primary" onClick={() => navigate('/orders')}>
              📋 Xem đơn hàng của tôi
            </Button>
          </Space>
        </div>

        {/* QR Modal */}
        <Modal
          title="💳 Thanh toán QR TPBank"
          open={qrModalVisible}
          onCancel={() => setQrModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setQrModalVisible(false)}>
              Đóng
            </Button>,
            <Button key="paid" type="primary" onClick={markAsPaid}>
              Đánh dấu đã thanh toán
            </Button>
          ]}
          width={500}
        >
          <div style={{ textAlign: 'center' }}>
            <img 
              src={orderCreated.qrCode?.imageUrl} 
              alt="QR Code" 
              style={{ maxWidth: '300px', width: '100%', border: '2px solid #e8e8e8', borderRadius: '8px' }}
            />
            
            <Card style={{ margin: '20px 0', background: '#f0f8ff', border: '1px solid #1890ff' }}>
              <Title level={4}>Thông tin chuyển khoản:</Title>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div><strong>Ngân hàng:</strong> TPBank</div>
                <div><strong>Số tài khoản:</strong> 0359937294</div>
                <div><strong>Chủ tài khoản:</strong> Nguyen Van A</div>
                <div><strong>Số tiền:</strong> {orderCreated.total.toLocaleString('vi-VN')}đ</div>
                <div><strong>Nội dung:</strong> Thanh toan don hang {orderCreated.orderCode}</div>
              </Space>
            </Card>
          </div>
        </Modal>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Button 
          type="text" 
          onClick={() => navigate('/cart')} 
          style={{ marginRight: '12px' }}
        >
          ← Quay lại giỏ hàng
        </Button>
        <Title level={2}>💳 Thanh toán đơn hàng</Title>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card title="📋 Thông tin giao hàng">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              requiredMark={false}
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="name"
                    label="Họ và tên"
                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                  >
                    <Input placeholder="Nhập họ và tên" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[
                      { required: true, message: 'Vui lòng nhập số điện thoại!' },
                      { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' }
                    ]}
                  >
                    <Input placeholder="Nhập số điện thoại" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { type: 'email', message: 'Email không hợp lệ!' }
                ]}
              >
                <Input placeholder="Nhập email (không bắt buộc)" />
              </Form.Item>

              <Form.Item
                name="address"
                label="Địa chỉ"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
              >
                <TextArea 
                  rows={3} 
                  placeholder="Nhập địa chỉ chi tiết (số nhà, tên đường, phường/xã, quận/huyện)" 
                />
              </Form.Item>

              <Row gutter={16}>
                <Col xs={24} sm={8}>
                  <Form.Item
                    name="city"
                    label="Tỉnh/Thành phố"
                    rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}
                  >
                    <Select 
                      placeholder="Chọn tỉnh/thành phố"
                      loading={citiesLoading}
                      showSearch
                      optionFilterProp="children"
                    >
                      {cities.map(city => (
                        <Select.Option key={city.code} value={city.name}>
                          {city.name} ({city.type})
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item
                    name="district"
                    label="Quận/Huyện"
                    rules={[{ required: true, message: 'Vui lòng nhập quận/huyện!' }]}
                  >
                    <Input placeholder="Nhập quận/huyện" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item
                    name="zipcode"
                    label="Mã bưu điện"
                  >
                    <Input placeholder="Mã bưu điện (không bắt buộc)" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="note"
                label="Ghi chú đơn hàng"
              >
                <TextArea 
                  rows={2} 
                  placeholder="Ghi chú thêm cho đơn hàng (không bắt buộc)" 
                />
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="📦 Tóm tắt đơn hàng">
            <Space direction="vertical" style={{ width: '100%' }}>
              {cartItems.map((item, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  padding: '8px 0', 
                  borderBottom: '1px solid #f0f0f0' 
                }}>
                  <div>
                    <Text strong>{item.name}</Text>
                    <br />
                    <Text type="secondary">Số lượng: {item.quantity}</Text>
                  </div>
                  <Text strong>
                    {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                  </Text>
                </div>
              ))}
              
              <Divider />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', color: '#1890ff' }}>
                <span>Tổng cộng:</span>
                <span>{total.toLocaleString('vi-VN')}đ</span>
              </div>
            </Space>

            <Button
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined />}
              onClick={() => form.submit()}
              loading={loading}
              style={{ width: '100%', marginTop: '20px' }}
            >
              💳 Tạo đơn hàng & Thanh toán QR
            </Button>

            <Card style={{ marginTop: '12px', background: '#f6ffed', border: '1px solid #b7eb8f' }}>
              <Text style={{ fontSize: '12px', color: '#52c41a' }}>
                <strong>💡 Lưu ý:</strong> Sau khi tạo đơn hàng, bạn sẽ nhận được mã QR để quét và thanh toán qua TPBank (0359937294)
              </Text>
            </Card>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CheckoutPage;

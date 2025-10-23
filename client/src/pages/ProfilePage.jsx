import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { API_BASE_URL } from '../config/api.js';
import { 
  Layout, 
  Menu, 
  Card, 
  Typography, 
  Avatar, 
  Button, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  Radio, 
  Upload, 
  message, 
  Divider, 
  Badge, 
  Tabs, 
  Row, 
  Col, 
  Space,
  Modal,
  Popconfirm,
  Switch,
  Tooltip
} from 'antd'
import {
  UserOutlined,
  HomeOutlined,
  ShoppingOutlined,
  HeartOutlined,
  LockOutlined,
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  UploadOutlined,
  EyeOutlined,
  EyeInvisibleOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/authSlice'

const { Sider, Content } = Layout
const { Title, Text, Paragraph } = Typography
const { Option } = Select
const { TabPane } = Tabs

const ProfilePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKey, setSelectedKey] = useState('personal-info')
  const [loading, setLoading] = useState(true)
  const [form] = Form.useForm()
  const [addressForm] = Form.useForm()
  const [passwordForm] = Form.useForm()
  
  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          dispatch(logout())
          navigate('/login');
          return;
        }

        // Fetch user profile
        const userResponse = await axios.get(`${API_BASE_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (userResponse.data) {
          setUserInfo({
            avatar: userResponse.data.avatar || '',
            fullName: userResponse.data.name || '',
            email: userResponse.data.email || '',
            phone: userResponse.data.phone || '',
            gender: userResponse.data.gender || 'male',
            birthday: userResponse.data.birthday || null,
            isPhoneVerified: userResponse.data.isPhoneVerified || false,
            isEmailVerified: userResponse.data.isEmailVerified || false
          });
          
          setAddresses(userResponse.data.addresses || []);
        }

        // Fetch orders
        const ordersResponse = await axios.get(`${API_BASE_URL}/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(ordersResponse.data || []);

        // Fetch wishlist (using products endpoint for now)
        const wishlistResponse = await axios.get(`${API_BASE_URL}/products`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setWishlist(wishlistResponse.data || []);

      } catch (error) {
        console.error('Error fetching user data:', error);
        message.error('Không thể tải dữ liệu người dùng');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);
  
  // State for different sections - Initialize with empty data
  const [userInfo, setUserInfo] = useState({
    avatar: '',
    fullName: '',
    email: '',
    phone: '',
    gender: 'male',
    birthday: null,
    isPhoneVerified: false,
    isEmailVerified: false
  })
  
  const [addresses, setAddresses] = useState([])
  
  const [orders, setOrders] = useState([])
  
  const [wishlist, setWishlist] = useState([])
  
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    newProductNotifications: true,
    language: 'vi',
    currency: 'VND',
    publicProfile: false,
    saveHistory: true
  })

  // Menu items for sidebar
  const menuItems = [
    {
      key: 'personal-info',
      icon: <UserOutlined />,
      label: 'Thông tin cá nhân'
    },
    {
      key: 'addresses',
      icon: <HomeOutlined />,
      label: 'Địa chỉ giao hàng',
      badge: addresses.length
    },
    {
      key: 'orders',
      icon: <ShoppingOutlined />,
      label: 'Đơn hàng của tôi',
      badge: orders.length
    },
    {
      key: 'wishlist',
      icon: <HeartOutlined />,
      label: 'Sản phẩm yêu thích',
      badge: wishlist.length
    },
    {
      key: 'password',
      icon: <LockOutlined />,
      label: 'Đổi mật khẩu'
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt'
    }
  ]

  // Handle menu selection
  const handleMenuClick = ({ key }) => {
    setSelectedKey(key)
  }

  // Render Personal Info Section
  const renderPersonalInfo = () => (
    <div>
      <Title level={3} style={{ marginBottom: '24px', color: '#1A1A1A' }}>
        Thông tin cá nhân
      </Title>
      
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Avatar
            size={120}
            src={userInfo.avatar}
            icon={<UserOutlined />}
            style={{ marginBottom: '16px' }}
          />
          <div>
            <Upload
              showUploadList={false}
              beforeUpload={() => false}
              onChange={(info) => {
                if (info.file) {
                  setUserInfo({ ...userInfo, avatar: URL.createObjectURL(info.file) })
                  message.success('Ảnh đại diện đã được cập nhật!')
                }
              }}
            >
              <Button icon={<UploadOutlined />} type="dashed">
                Thay đổi ảnh đại diện
              </Button>
            </Upload>
          </div>
        </div>

        <Form
          form={form}
          layout="vertical"
          initialValues={userInfo}
          onFinish={(values) => {
            setLoading(true)
            setTimeout(() => {
              setUserInfo({ ...userInfo, ...values })
              setLoading(false)
              message.success('Thông tin đã được cập nhật!')
            }, 1000)
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[
                  { required: true, message: 'Vui lòng nhập họ và tên!' },
                  { min: 2, message: 'Họ và tên phải có ít nhất 2 từ!' }
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
              >
                <Input 
                  prefix={<MailOutlined />} 
                  value={userInfo.email}
                  disabled
                  suffix={
                    userInfo.isEmailVerified ? 
                    <Tooltip title="Email đã được xác thực">
                      <CheckCircleOutlined style={{ color: '#52c41a' }} />
                    </Tooltip> : 
                    <Tooltip title="Email chưa được xác thực">
                      <ExclamationCircleOutlined style={{ color: '#faad14' }} />
                    </Tooltip>
                  }
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại!' },
                  { pattern: /^\d{10}$/, message: 'Số điện thoại phải có đúng 10 số!' }
                ]}
              >
                <Input 
                  prefix={<PhoneOutlined />} 
                  placeholder="Nhập 10 số điện thoại"
                  suffix={
                    userInfo.isPhoneVerified ? 
                    <Tooltip title="Số điện thoại đã được xác thực">
                      <CheckCircleOutlined style={{ color: '#52c41a' }} />
                    </Tooltip> : 
                    <Tooltip title="Số điện thoại chưa được xác thực">
                      <ExclamationCircleOutlined style={{ color: '#faad14' }} />
                    </Tooltip>
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Giới tính"
                name="gender"
                rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
              >
                <Radio.Group>
                  <Radio value="male">Nam</Radio>
                  <Radio value="female">Nữ</Radio>
                  <Radio value="other">Khác</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Ngày sinh"
            name="birthday"
          >
            <DatePicker 
              style={{ width: '100%' }}
              placeholder="Chọn ngày sinh"
              suffixIcon={<CalendarOutlined />}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                style={{
                  background: 'linear-gradient(135deg, #E4002B 0%, #C4001B 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  height: '40px',
                  padding: '0 24px'
                }}
              >
                Lưu thay đổi
              </Button>
              <Button onClick={() => form.resetFields()}>
                Hủy
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )

  // Render Addresses Section
  const renderAddresses = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={3} style={{ margin: 0, color: '#1A1A1A' }}>
          Địa chỉ giao hàng
        </Title>
        <Text type="secondary">
          Địa chỉ của tôi ({addresses.length}/5)
        </Text>
      </div>

      <Row gutter={[16, 16]}>
        {addresses.map((address) => (
          <Col span={24} key={address.id}>
            <Card
              style={{
                border: address.isDefault ? '2px solid #E4002B' : '1px solid #d9d9d9',
                borderRadius: '12px'
              }}
              actions={[
                <Button 
                  type="link" 
                  icon={<EditOutlined />}
                  onClick={() => handleEditAddress(address)}
                >
                  Sửa
                </Button>,
                <Button 
                  type="link" 
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteAddress(address.id)}
                >
                  Xóa
                </Button>,
                !address.isDefault && (
                  <Button 
                    type="link" 
                    onClick={() => handleSetDefaultAddress(address.id)}
                  >
                    Đặt làm mặc định
                  </Button>
                )
              ]}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Text strong style={{ fontSize: '16px' }}>{address.name}</Text>
                    {address.isDefault && (
                      <Badge 
                        count="Mặc định" 
                        style={{ backgroundColor: '#E4002B' }}
                      />
                    )}
                  </div>
                  <div style={{ color: '#666', marginBottom: '4px' }}>
                    <PhoneOutlined /> {address.phone}
                  </div>
                  <div style={{ color: '#666', marginBottom: '4px' }}>
                    <EnvironmentOutlined /> {address.address}, {address.ward}, {address.district}, {address.province}
                  </div>
                  <div style={{ color: '#999', fontSize: '12px' }}>
                    Loại: {address.type === 'home' ? 'Nhà riêng' : 'Văn phòng'}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
        
        {addresses.length < 5 && (
          <Col span={24}>
            <Card
              style={{
                border: '2px dashed #d9d9d9',
                borderRadius: '12px',
                textAlign: 'center',
                cursor: 'pointer',
                background: '#fafafa'
              }}
              onClick={() => setShowAddAddressModal(true)}
            >
              <PlusOutlined style={{ fontSize: '24px', color: '#999', marginBottom: '8px' }} />
              <div style={{ color: '#666' }}>Thêm địa chỉ mới</div>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  )

  // Render Orders Section
  const renderOrders = () => {
    const getStatusColor = (status) => {
      const colors = {
        'pending': '#faad14',
        'confirmed': '#1890ff',
        'shipping': '#722ed1',
        'delivered': '#52c41a',
        'cancelled': '#ff4d4f'
      }
      return colors[status] || '#d9d9d9'
    }

    const getStatusText = (status) => {
      const texts = {
        'pending': 'Chờ xác nhận',
        'confirmed': 'Đã xác nhận',
        'shipping': 'Đang giao',
        'delivered': 'Đã giao',
        'cancelled': 'Đã hủy'
      }
      return texts[status] || status
    }

    return (
      <div>
        <Title level={3} style={{ marginBottom: '24px', color: '#1A1A1A' }}>
          Đơn hàng của tôi
        </Title>

        <Tabs defaultActiveKey="all">
          <TabPane tab="Tất cả" key="all">
            {orders.map((order) => (
              <Card key={order.id} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <Text strong style={{ fontSize: '16px' }}>#{order.id}</Text>
                      <Badge 
                        count={getStatusText(order.status)} 
                        style={{ backgroundColor: getStatusColor(order.status) }}
                      />
                    </div>
                    <div style={{ color: '#666', marginBottom: '8px' }}>
                      Ngày đặt: {new Date(order.date).toLocaleDateString('vi-VN')}
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      {order.items.map((item, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <Text>{item.name}</Text>
                          <Text type="secondary">- Size: {item.size}, Màu: {item.color}, SL: {item.quantity}</Text>
                        </div>
                      ))}
                    </div>
                    <Text strong style={{ fontSize: '18px', color: '#E4002B' }}>
                      {order.total.toLocaleString('vi-VN')} ₫
                    </Text>
                  </div>
                  <div>
                    <Space>
                      <Button type="primary" size="small">
                        Xem chi tiết
                      </Button>
                      {order.status === 'delivered' && (
                        <Button size="small">Mua lại</Button>
                      )}
                      {order.status === 'pending' && (
                        <Button danger size="small">Hủy đơn</Button>
                      )}
                    </Space>
                  </div>
                </div>
              </Card>
            ))}
          </TabPane>
          <TabPane tab="Chờ xác nhận" key="pending">
            <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
              Không có đơn hàng nào
            </div>
          </TabPane>
          <TabPane tab="Đang giao" key="shipping">
            <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
              Không có đơn hàng nào
            </div>
          </TabPane>
          <TabPane tab="Đã giao" key="delivered">
            <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
              Không có đơn hàng nào
            </div>
          </TabPane>
        </Tabs>
      </div>
    )
  }

  // Render Wishlist Section
  const renderWishlist = () => (
    <div>
      <Title level={3} style={{ marginBottom: '24px', color: '#1A1A1A' }}>
        Sản phẩm yêu thích
      </Title>

      {wishlist.length === 0 ? (
        <Card style={{ textAlign: 'center', padding: '60px 20px' }}>
          <HeartOutlined style={{ fontSize: '64px', color: '#d9d9d9', marginBottom: '16px' }} />
          <Title level={4} style={{ color: '#999' }}>Chưa có sản phẩm yêu thích</Title>
          <Button 
            type="primary" 
            onClick={() => navigate('/products')}
            style={{
              background: 'linear-gradient(135deg, #E4002B 0%, #C4001B 100%)',
              border: 'none',
              borderRadius: '8px'
            }}
          >
            Khám phá sản phẩm
          </Button>
        </Card>
      ) : (
        <Row gutter={[16, 16]}>
          {wishlist.map((item) => (
            <Col xs={12} sm={8} md={6} key={item.id}>
              <Card
                hoverable
                cover={
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <img
                      alt={item.name}
                      src={item.image}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                }
                actions={[
                  <Button 
                    type="primary" 
                    size="small"
                    disabled={!item.inStock}
                    style={{
                      background: 'linear-gradient(135deg, #E4002B 0%, #C4001B 100%)',
                      border: 'none'
                    }}
                  >
                    Thêm vào giỏ
                  </Button>,
                  <Button 
                    type="text" 
                    danger
                    size="small"
                    icon={<HeartOutlined />}
                    onClick={() => handleRemoveFromWishlist(item.id)}
                  >
                    Bỏ yêu thích
                  </Button>
                ]}
              >
                <Card.Meta
                  title={item.name}
                  description={
                    <div>
                      <div style={{ marginBottom: '8px' }}>
                        {item.salePrice ? (
                          <div>
                            <Text delete style={{ color: '#999' }}>
                              {item.price.toLocaleString('vi-VN')} ₫
                            </Text>
                            <Text strong style={{ color: '#E4002B', marginLeft: '8px' }}>
                              {item.salePrice.toLocaleString('vi-VN')} ₫
                            </Text>
                          </div>
                        ) : (
                          <Text strong style={{ color: '#E4002B' }}>
                            {item.price.toLocaleString('vi-VN')} ₫
                          </Text>
                        )}
                      </div>
                      {!item.inStock && (
                        <Badge count="Hết hàng" style={{ backgroundColor: '#ff4d4f' }} />
                      )}
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  )

  // Render Password Section
  const renderPassword = () => (
    <div>
      <Title level={3} style={{ marginBottom: '24px', color: '#1A1A1A' }}>
        Đổi mật khẩu
      </Title>

      <Card>
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={(values) => {
            setLoading(true)
            setTimeout(() => {
              setLoading(false)
              message.success('Mật khẩu đã được thay đổi thành công!')
              passwordForm.resetFields()
            }, 1000)
          }}
        >
          <Form.Item
            label="Mật khẩu hiện tại"
            name="currentPassword"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
          >
            <Input.Password 
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu hiện tại"
              style={{ height: '48px' }}
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
              { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' },
              { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, message: 'Mật khẩu phải có chữ hoa, chữ thường, số và ký tự đặc biệt!' }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu mới"
              style={{ height: '48px' }}
            />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'))
                },
              }),
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />}
              placeholder="Nhập lại mật khẩu mới"
              style={{ height: '48px' }}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                style={{
                  background: 'linear-gradient(135deg, #E4002B 0%, #C4001B 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  height: '48px',
                  padding: '0 24px'
                }}
              >
                Đổi mật khẩu
              </Button>
              <Button onClick={() => passwordForm.resetFields()}>
                Hủy
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )

  // Render Settings Section
  const renderSettings = () => (
    <div>
      <Title level={3} style={{ marginBottom: '24px', color: '#1A1A1A' }}>
        Cài đặt
      </Title>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Thông báo" style={{ marginBottom: '16px' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text strong>Nhận email khuyến mãi</Text>
                  <div style={{ color: '#666', fontSize: '12px' }}>Nhận thông báo về các chương trình khuyến mãi</div>
                </div>
                <Switch 
                  checked={settings.emailNotifications}
                  onChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                />
              </div>
              <Divider style={{ margin: '12px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text strong>Nhận SMS về đơn hàng</Text>
                  <div style={{ color: '#666', fontSize: '12px' }}>Nhận tin nhắn về trạng thái đơn hàng</div>
                </div>
                <Switch 
                  checked={settings.smsNotifications}
                  onChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                />
              </div>
              <Divider style={{ margin: '12px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text strong>Thông báo đẩy trên trình duyệt</Text>
                  <div style={{ color: '#666', fontSize: '12px' }}>Nhận thông báo trực tiếp trên trình duyệt</div>
                </div>
                <Switch 
                  checked={settings.pushNotifications}
                  onChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
                />
              </div>
              <Divider style={{ margin: '12px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text strong>Nhận thông báo sản phẩm mới</Text>
                  <div style={{ color: '#666', fontSize: '12px' }}>Nhận thông báo khi có sản phẩm mới</div>
                </div>
                <Switch 
                  checked={settings.newProductNotifications}
                  onChange={(checked) => setSettings({ ...settings, newProductNotifications: checked })}
                />
              </div>
            </Space>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Cài đặt chung" style={{ marginBottom: '16px' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Text strong>Ngôn ngữ</Text>
                <Select
                  value={settings.language}
                  onChange={(value) => setSettings({ ...settings, language: value })}
                  style={{ width: '100%', marginTop: '8px' }}
                >
                  <Option value="vi">Tiếng Việt</Option>
                  <Option value="en">English</Option>
                </Select>
              </div>
              <div>
                <Text strong>Đơn vị tiền tệ</Text>
                <Select
                  value={settings.currency}
                  onChange={(value) => setSettings({ ...settings, currency: value })}
                  style={{ width: '100%', marginTop: '8px' }}
                >
                  <Option value="VND">VND (₫)</Option>
                  <Option value="USD">USD ($)</Option>
                </Select>
              </div>
            </Space>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Quyền riêng tư" style={{ marginBottom: '16px' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text strong>Hiển thị profile công khai</Text>
                  <div style={{ color: '#666', fontSize: '12px' }}>Cho phép người khác xem thông tin profile</div>
                </div>
                <Switch 
                  checked={settings.publicProfile}
                  onChange={(checked) => setSettings({ ...settings, publicProfile: checked })}
                />
              </div>
              <Divider style={{ margin: '12px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text strong>Cho phép lưu lịch sử duyệt web</Text>
                  <div style={{ color: '#666', fontSize: '12px' }}>Lưu lịch sử để cải thiện trải nghiệm</div>
                </div>
                <Switch 
                  checked={settings.saveHistory}
                  onChange={(checked) => setSettings({ ...settings, saveHistory: checked })}
                />
              </div>
            </Space>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Tài khoản">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button 
                type="default"
                onClick={() => {
                  dispatch(logout())
                  message.success('Đã đăng xuất!')
                  navigate('/login')
                }}
                style={{ width: '100%', height: '40px' }}
              >
                Đăng xuất
              </Button>
              <Popconfirm
                title="Xóa tài khoản"
                description="Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác."
                onConfirm={() => message.info('Tính năng xóa tài khoản sẽ được triển khai sớm!')}
                okText="Xóa"
                cancelText="Hủy"
              >
                <Button 
                  danger
                  style={{ width: '100%', height: '40px' }}
                >
                  Xóa tài khoản
                </Button>
              </Popconfirm>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  )

  // Helper functions
  const handleEditAddress = (address) => {
    message.info('Tính năng chỉnh sửa địa chỉ sẽ được triển khai sớm!')
  }

  const handleDeleteAddress = (addressId) => {
    setAddresses(addresses.filter(addr => addr.id !== addressId))
    message.success('Địa chỉ đã được xóa!')
  }

  const handleSetDefaultAddress = (addressId) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })))
    message.success('Địa chỉ mặc định đã được cập nhật!')
  }

  const handleRemoveFromWishlist = (itemId) => {
    setWishlist(wishlist.filter(item => item.id !== itemId))
    message.success('Đã bỏ yêu thích sản phẩm!')
  }

  const [showAddAddressModal, setShowAddAddressModal] = useState(false)

  // Render content based on selected menu
  const renderContent = () => {
    switch (selectedKey) {
      case 'personal-info':
        return renderPersonalInfo()
      case 'addresses':
        return renderAddresses()
      case 'orders':
        return renderOrders()
      case 'wishlist':
        return renderWishlist()
      case 'password':
        return renderPassword()
      case 'settings':
        return renderSettings()
      default:
        return renderPersonalInfo()
    }
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {loading ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          flexDirection: 'column'
        }}>
          <div style={{ fontSize: '18px', marginBottom: '16px' }}>Đang tải dữ liệu...</div>
          <div style={{ fontSize: '14px', color: '#666' }}>Vui lòng chờ trong giây lát</div>
        </div>
      ) : (
        <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{
          background: 'white',
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)'
        }}
        width={250}
        collapsedWidth={80}
      >
        <div style={{ 
          padding: '24px 16px', 
          textAlign: 'center',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <Avatar size={collapsed ? 40 : 60} icon={<UserOutlined />} />
          {!collapsed && (
            <div style={{ marginTop: '12px' }}>
              <Text strong style={{ fontSize: '16px' }}>{userInfo.fullName}</Text>
              <div style={{ color: '#666', fontSize: '12px' }}>{userInfo.email}</div>
            </div>
          )}
        </div>
        
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          style={{ border: 'none' }}
          items={menuItems.map(item => ({
            ...item,
            label: collapsed ? null : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>{item.label}</span>
                {item.badge && (
                  <Badge count={item.badge} style={{ backgroundColor: '#E4002B' }} />
                )}
              </div>
            )
          }))}
        />
      </Sider>

      <Layout>
        <Content style={{ padding: '24px' }}>
          <div style={{ 
            background: 'white', 
            borderRadius: '12px', 
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            {renderContent()}
          </div>
        </Content>
      </Layout>

      {/* Add Address Modal */}
      <Modal
        title="Thêm địa chỉ mới"
        open={showAddAddressModal}
        onCancel={() => setShowAddAddressModal(false)}
        footer={null}
        width={600}
      >
        <Form
          form={addressForm}
          layout="vertical"
          onFinish={(values) => {
            const newAddress = {
              id: Date.now(),
              ...values,
              isDefault: addresses.length === 0
            }
            setAddresses([...addresses, newAddress])
            setShowAddAddressModal(false)
            message.success('Địa chỉ đã được thêm thành công!')
            addressForm.resetFields()
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tên người nhận"
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập tên người nhận!' }]}
              >
                <Input placeholder="Nhập tên người nhận" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại!' },
                  { pattern: /^\d{10}$/, message: 'Số điện thoại phải có đúng 10 số!' }
                ]}
              >
                <Input placeholder="+84 XXX XXX XXX" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Tỉnh/Thành phố"
                name="province"
                rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}
              >
                <Select placeholder="Chọn tỉnh/thành phố">
                  <Option value="Hà Nội">Hà Nội</Option>
                  <Option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</Option>
                  <Option value="Đà Nẵng">Đà Nẵng</Option>
                  <Option value="Hải Phòng">Hải Phòng</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Quận/Huyện"
                name="district"
                rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}
              >
                <Select placeholder="Chọn quận/huyện">
                  <Option value="Cầu Giấy">Cầu Giấy</Option>
                  <Option value="Quận 1">Quận 1</Option>
                  <Option value="Hải Châu">Hải Châu</Option>
                  <Option value="Ngô Quyền">Ngô Quyền</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Phường/Xã"
                name="ward"
                rules={[{ required: true, message: 'Vui lòng chọn phường/xã!' }]}
              >
                <Select placeholder="Chọn phường/xã">
                  <Option value="Dịch Vọng">Dịch Vọng</Option>
                  <Option value="Phường Bến Nghé">Phường Bến Nghé</Option>
                  <Option value="Phường Hải Châu I">Phường Hải Châu I</Option>
                  <Option value="Phường Máy Chai">Phường Máy Chai</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Địa chỉ chi tiết"
            name="address"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ chi tiết!' }]}
          >
            <Input.TextArea 
              placeholder="Số nhà, tên đường..."
              rows={3}
            />
          </Form.Item>

          <Form.Item
            label="Loại địa chỉ"
            name="type"
            rules={[{ required: true, message: 'Vui lòng chọn loại địa chỉ!' }]}
          >
            <Radio.Group>
              <Radio value="home">Nhà riêng</Radio>
              <Radio value="office">Văn phòng</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button 
                type="primary" 
                htmlType="submit"
                style={{
                  background: 'linear-gradient(135deg, #E4002B 0%, #C4001B 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  height: '40px',
                  padding: '0 24px'
                }}
              >
                Thêm địa chỉ
              </Button>
              <Button onClick={() => setShowAddAddressModal(false)}>
                Hủy
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
        </>
      )}
    </Layout>
  )
}

export default ProfilePage

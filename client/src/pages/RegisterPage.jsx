import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Card, Form, Input, Button, Typography, message, Checkbox, Divider, Progress } from "antd"
import { useNavigate } from "react-router-dom"
import { register } from "../redux/authSlice"
import { 
  UserOutlined, 
  MailOutlined, 
  LockOutlined, 
  EyeInvisibleOutlined, 
  EyeTwoTone,
  GoogleOutlined,
  FacebookOutlined,
  ArrowRightOutlined,
  PhoneOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons"

const { Text } = Typography

const RegisterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordStrengthText, setPasswordStrengthText] = useState('')
  const [passwordStrengthColor, setPasswordStrengthColor] = useState('#ff4d4f')

  // Auto-focus name field on mount
  useEffect(() => {
    const nameInput = document.querySelector('input[name="name"]')
    if (nameInput) {
      nameInput.focus()
    }
  }, [])

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let strength = 0
    let text = ''
    let color = '#ff4d4f'

    if (password.length >= 8) strength += 25
    if (/[a-z]/.test(password)) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25

    if (strength < 25) {
      text = 'Rất yếu'
      color = '#ff4d4f'
    } else if (strength < 50) {
      text = 'Yếu'
      color = '#ff7a45'
    } else if (strength < 75) {
      text = 'Trung bình'
      color = '#faad14'
    } else if (strength < 100) {
      text = 'Mạnh'
      color = '#52c41a'
    } else {
      text = 'Rất mạnh'
      color = '#389e0d'
    }

    setPasswordStrength(strength)
    setPasswordStrengthText(text)
    setPasswordStrengthColor(color)
  }

  const onFinish = async (values) => {
    setLoading(true)
    try {
      await dispatch(register(values)).unwrap()
      message.success("Đăng ký thành công! Vui lòng đăng nhập.")
      navigate("/login")
    } catch (error) {
      message.error(error.message || "Đăng ký thất bại. Vui lòng thử lại.")
      console.error("Registration failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSocialRegister = (provider) => {
    message.info(`Đăng ký bằng ${provider} sẽ được triển khai sớm!`)
  }

  const handleTermsClick = () => {
    message.info("Điều khoản sử dụng sẽ được triển khai sớm!")
  }

  const handlePrivacyClick = () => {
    message.info("Chính sách bảo mật sẽ được triển khai sớm!")
  }

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      flexDirection: window.innerWidth < 768 ? 'column' : 'row',
      overflow: 'hidden'
    }}>
      {/* Left Side - Register Form */}
      <div style={{
        flex: '0 0 40%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        background: 'white',
        position: 'relative'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23E4002B" fill-opacity="0.03"%3E%3Cpath d="M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.5
        }} />

        <div style={{ width: '100%', maxWidth: '380px', position: 'relative', zIndex: 2 }}>
          {/* Logo/Brand */}
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#E4002B',
              marginBottom: '6px',
              fontFamily: 'var(--font-heading, sans-serif)'
            }}>
              Việt Nam Style
            </div>
            <Typography.Text style={{ color: '#666', fontSize: '14px' }}>
              Tự hào dân tộc, phong cách hiện đại
            </Typography.Text>
          </div>

          {/* Register Form */}
          <Card style={{
            border: 'none',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}>
            <Typography.Title 
              level={2} 
              style={{ 
                textAlign: 'center', 
                marginBottom: '16px', 
                color: '#1A1A1A',
                fontSize: '20px',
                fontWeight: '700'
              }}
            >
              Đăng ký tài khoản
            </Typography.Title>

            <Form 
              form={form}
              name="register" 
              onFinish={onFinish} 
              layout="vertical"
              size="middle"
            >
              <Form.Item
                label={<span style={{ fontWeight: '500', color: '#4A4A4A' }}>Họ và tên</span>}
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập họ và tên!" },
                  { min: 2, message: "Họ và tên phải có ít nhất 2 từ!" }
                ]}
              >
                <Input 
                  prefix={<UserOutlined style={{ color: '#999' }} />} 
                  placeholder="Nhập họ và tên đầy đủ"
                  style={{
                    borderRadius: '8px',
                    height: '40px',
                    fontSize: '14px'
                  }}
                />
              </Form.Item>

              <Form.Item
                label={<span style={{ fontWeight: '500', color: '#4A4A4A' }}>Email</span>}
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Vui lòng nhập đúng định dạng email!" },
                ]}
              >
                <Input 
                  prefix={<MailOutlined style={{ color: '#999' }} />} 
                  placeholder="Nhập địa chỉ email"
                  style={{
                    borderRadius: '8px',
                    height: '40px',
                    fontSize: '14px'
                  }}
                />
              </Form.Item>

              <Form.Item
                label={<span style={{ fontWeight: '500', color: '#4A4A4A' }}>Số điện thoại</span>}
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                  { pattern: /^\d{10}$/, message: "Số điện thoại phải có đúng 10 số!" }
                ]}
              >
                <Input 
                  prefix={<PhoneOutlined style={{ color: '#999' }} />} 
                  placeholder="Nhập 10 số điện thoại"
                  style={{
                    borderRadius: '8px',
                    height: '40px',
                    fontSize: '14px'
                  }}
                />
              </Form.Item>

              <Form.Item
                label={<span style={{ fontWeight: '500', color: '#4A4A4A' }}>Mật khẩu</span>}
                name="password"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu!" },
                  { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
                  { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, message: "Mật khẩu phải có chữ hoa, chữ thường, số và ký tự đặc biệt!" }
                ]}
              >
                <Input.Password 
                  prefix={<LockOutlined style={{ color: '#999' }} />} 
                  placeholder="Nhập mật khẩu mạnh"
                  style={{
                    borderRadius: '8px',
                    height: '40px',
                    fontSize: '14px'
                  }}
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  onChange={(e) => checkPasswordStrength(e.target.value)}
                />
              </Form.Item>

              {/* Password Strength Indicator */}
              {passwordStrength > 0 && (
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <Text style={{ fontSize: '12px', color: '#666' }}>Độ mạnh mật khẩu</Text>
                    <Text style={{ fontSize: '12px', color: passwordStrengthColor, fontWeight: '500' }}>
                      {passwordStrengthText}
                    </Text>
                  </div>
                  <Progress 
                    percent={passwordStrength} 
                    showInfo={false}
                    strokeColor={passwordStrengthColor}
                    style={{ height: '4px' }}
                  />
                </div>
              )}

              <Form.Item
                label={<span style={{ fontWeight: '500', color: '#4A4A4A' }}>Xác nhận mật khẩu</span>}
                name="confirm"
                dependencies={['password']}
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'))
                    },
                  }),
                ]}
              >
                <Input.Password 
                  prefix={<LockOutlined style={{ color: '#999' }} />} 
                  placeholder="Nhập lại mật khẩu"
                  style={{
                    borderRadius: '8px',
                    height: '40px',
                    fontSize: '14px'
                  }}
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>

              <div style={{ marginBottom: '16px' }}>
                <Form.Item name="agreeTerms" valuePropName="checked" style={{ margin: 0 }}>
                  <Checkbox style={{ fontSize: '14px', color: '#4A4A4A' }}>
                    Tôi đồng ý với{' '}
                    <Button 
                      type="link" 
                      onClick={handleTermsClick}
                      style={{ 
                        color: '#E4002B', 
                        fontWeight: '500',
                        padding: 0,
                        height: 'auto',
                        fontSize: '14px'
                      }}
                    >
                      Điều khoản sử dụng
                    </Button>
                    {' '}và{' '}
                    <Button 
                      type="link" 
                      onClick={handlePrivacyClick}
                      style={{ 
                        color: '#E4002B', 
                        fontWeight: '500',
                        padding: 0,
                        height: 'auto',
                        fontSize: '14px'
                      }}
                    >
                      Chính sách bảo mật
                    </Button>
                  </Checkbox>
                </Form.Item>
              </div>

              <Form.Item style={{ marginBottom: '16px' }}>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block 
                  loading={loading}
                  style={{ 
                    height: '40px', 
                    fontSize: '14px',
                    fontWeight: '600',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #E4002B 0%, #C4001B 100%)',
                    border: 'none',
                    boxShadow: '0 4px 16px rgba(228, 0, 43, 0.3)'
                  }}
                  icon={<ArrowRightOutlined />}
                >
                  Tạo tài khoản
                </Button>
              </Form.Item>

              <Divider style={{ color: '#999', fontSize: '14px' }}>
                Hoặc đăng ký bằng
              </Divider>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <Button 
                  block
                  onClick={() => handleSocialRegister('Google')}
                  style={{
                    height: '48px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    background: 'white',
                    color: '#333',
                    fontWeight: '500'
                  }}
                  icon={<GoogleOutlined style={{ color: '#4285F4' }} />}
                >
                  Google
                </Button>
                <Button 
                  block
                  onClick={() => handleSocialRegister('Facebook')}
                  style={{
                    height: '48px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    background: 'white',
                    color: '#333',
                    fontWeight: '500'
                  }}
                  icon={<FacebookOutlined style={{ color: '#1877F2' }} />}
                >
                  Facebook
                </Button>
              </div>

              <div style={{ textAlign: 'center' }}>
                <Typography.Text style={{ color: '#666', fontSize: '14px' }}>
                  Đã có tài khoản?{' '}
                  <Button 
                    type="link" 
                    onClick={() => navigate("/login")} 
                    style={{ 
                      color: '#E4002B', 
                      fontWeight: '600',
                      padding: 0,
                      height: 'auto',
                      fontSize: '14px'
                    }}
                  >
                    Đăng nhập ngay!
                  </Button>
                </Typography.Text>
              </div>
            </Form>
          </Card>
        </div>
      </div>

      {/* Right Side - Hero Section */}
      <div style={{
        flex: '0 0 60%',
        background: 'linear-gradient(135deg, #E4002B 0%, #C4001B 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23FFFFFF" fill-opacity="0.1"%3E%3Cpath d="M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }} />

        <div style={{ 
          textAlign: 'center', 
          color: 'white',
          padding: '40px',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{ fontSize: '120px', marginBottom: '24px' }}>
            🎉
          </div>
          <Typography.Title 
            level={1} 
            style={{ 
              color: 'white', 
              fontSize: '48px',
              fontWeight: '700',
              marginBottom: '16px',
              fontFamily: 'var(--font-heading, sans-serif)'
            }}
          >
            Tham Gia Cộng Đồng
          </Typography.Title>
          <Typography.Title 
            level={2} 
            style={{ 
              color: 'rgba(255, 255, 255, 0.9)', 
              fontSize: '24px',
              fontWeight: '400',
              marginBottom: '32px'
            }}
          >
            Việt Nam Style
          </Typography.Title>
          <Typography.Paragraph 
            style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              fontSize: '18px',
              lineHeight: '1.6',
              maxWidth: '500px',
              margin: '0 auto'
            }}
          >
            Tạo tài khoản để trải nghiệm đầy đủ các tính năng: theo dõi đơn hàng, 
            lưu sản phẩm yêu thích, nhận thông báo khuyến mãi và nhiều hơn nữa.
          </Typography.Paragraph>
          
          <div style={{ 
            marginTop: '40px',
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            flexWrap: 'wrap'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>📦</div>
              <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px' }}>
                Theo dõi đơn hàng
              </Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>❤️</div>
              <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px' }}>
                Sản phẩm yêu thích
              </Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎁</div>
              <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px' }}>
                Ưu đãi độc quyền
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
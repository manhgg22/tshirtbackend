import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Card, Form, Input, Button, Typography, message, Checkbox, Divider } from "antd"
import { useNavigate } from "react-router-dom"
import { login } from "../redux/authSlice"
import { 
  UserOutlined, 
  LockOutlined, 
  EyeInvisibleOutlined, 
  EyeTwoTone,
  GoogleOutlined,
  FacebookOutlined,
  ArrowRightOutlined,
  MailOutlined,
  PhoneOutlined
} from "@ant-design/icons"

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form] = Form.useForm()

  // Auto-focus email field on mount
  useEffect(() => {
    const emailInput = document.querySelector('input[name="email"]')
    if (emailInput) {
      emailInput.focus()
    }
  }, [])

  const onFinish = async (values) => {
    setLoading(true)
    try {
      await dispatch(login(values)).unwrap()
      message.success("Đăng nhập thành công!")
      navigate("/")
    } catch (error) {
      message.error(error.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.")
      console.error("Login failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = (provider) => {
    message.info(`Đăng nhập bằng ${provider} sẽ được triển khai sớm!`)
  }

  const handleForgotPassword = () => {
    message.info("Tính năng quên mật khẩu sẽ được triển khai sớm!")
  }

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      flexDirection: window.innerWidth < 768 ? 'column' : 'row',
      overflow: 'hidden'
    }}>
      {/* Left Side - Login Form */}
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

        <div style={{ width: '100%', maxWidth: '400px', position: 'relative', zIndex: 2 }}>
          {/* Logo/Brand */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#E4002B',
              marginBottom: '8px',
              fontFamily: 'var(--font-heading, sans-serif)'
            }}>
              Việt Nam Style
            </div>
            <Typography.Text style={{ color: '#666', fontSize: '16px' }}>
              Tự hào dân tộc, phong cách hiện đại
            </Typography.Text>
          </div>

          {/* Login Form */}
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
                marginBottom: '24px', 
                color: '#1A1A1A',
                fontSize: '24px',
                fontWeight: '700'
              }}
            >
              Đăng nhập
            </Typography.Title>

            <Form 
              form={form}
              name="login" 
              initialValues={{ remember: true }} 
              onFinish={onFinish} 
              layout="vertical"
              size="large"
            >
              <Form.Item
                label={<span style={{ fontWeight: '500', color: '#4A4A4A' }}>Email</span>}
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email của bạn!" },
                  { type: "email", message: "Vui lòng nhập đúng định dạng email!" },
                ]}
              >
                <Input 
                  prefix={<MailOutlined style={{ color: '#999' }} />} 
                  placeholder="Nhập email của bạn"
                  style={{
                    borderRadius: '8px',
                    height: '48px',
                    fontSize: '16px'
                  }}
                />
              </Form.Item>

              <Form.Item
                label={<span style={{ fontWeight: '500', color: '#4A4A4A' }}>Mật khẩu</span>}
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu của bạn!" }]}
              >
                <Input.Password 
                  prefix={<LockOutlined style={{ color: '#999' }} />} 
                  placeholder="Nhập mật khẩu"
                  style={{
                    borderRadius: '8px',
                    height: '48px',
                    fontSize: '16px'
                  }}
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <Form.Item name="remember" valuePropName="checked" style={{ margin: 0 }}>
                  <Checkbox style={{ fontSize: '14px', color: '#4A4A4A' }}>
                    Ghi nhớ đăng nhập
                  </Checkbox>
                </Form.Item>
                <Button 
                  type="link" 
                  onClick={handleForgotPassword}
                  style={{ 
                    color: '#E4002B', 
                    fontWeight: '500',
                    padding: 0,
                    height: 'auto'
                  }}
                >
                  Quên mật khẩu?
                </Button>
              </div>

              <Form.Item style={{ marginBottom: '16px' }}>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block 
                  loading={loading}
                  style={{ 
                    height: '48px', 
                    fontSize: '16px',
                    fontWeight: '600',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #E4002B 0%, #C4001B 100%)',
                    border: 'none',
                    boxShadow: '0 4px 16px rgba(228, 0, 43, 0.3)'
                  }}
                  icon={<ArrowRightOutlined />}
                >
                  Đăng nhập
                </Button>
              </Form.Item>

              <Divider style={{ color: '#999', fontSize: '14px' }}>
                Hoặc đăng nhập bằng
              </Divider>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <Button 
                  block
                  onClick={() => handleSocialLogin('Google')}
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
                  onClick={() => handleSocialLogin('Facebook')}
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
                  Chưa có tài khoản?{' '}
                  <Button 
                    type="link" 
                    onClick={() => navigate("/register")} 
                    style={{ 
                      color: '#E4002B', 
                      fontWeight: '600',
                      padding: 0,
                      height: 'auto',
                      fontSize: '14px'
                    }}
                  >
                    Đăng ký ngay!
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
            🇻🇳
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
            Tự Hào Dân Tộc
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
            Phong Cách Hiện Đại
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
            Khám phá bộ sưu tập áo thun độc đáo lấy cảm hứng từ văn hóa và lịch sử Việt Nam. 
            Từ những anh hùng dân tộc đến các biểu tượng văn hóa truyền thống.
          </Typography.Paragraph>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
import React from "react"
import { Layout, Row, Col, Typography, Space, Button, Input, Divider } from "antd"
import { Link } from "react-router-dom"
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  HeartOutlined,
} from "@ant-design/icons"

const { Footer: AntFooter } = Layout
const { Title, Text, Paragraph } = Typography

const Footer = () => {
  return (
    <AntFooter
      style={{
        background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
        color: "#fff",
        padding: "60px 0 20px",
        marginTop: "auto",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <Row gutter={[32, 32]}>
          {/* Company Info */}
          <Col xs={24} sm={12} md={6}>
            <div style={{ marginBottom: "24px" }}>
              <Title level={3} style={{ color: "#fff", marginBottom: "16px" }}>
                🇻🇳 VN T-Shirts
              </Title>
              <Paragraph style={{ color: "#bdc3c7", marginBottom: "16px" }}>
                Thương hiệu thời trang Việt Nam tự hào, mang đến những sản phẩm chất lượng cao 
                với thiết kế độc đáo thể hiện tinh thần dân tộc.
              </Paragraph>
              <Space size="large">
                <Button
                  type="text"
                  icon={<FacebookOutlined />}
                  style={{ color: "#3498db", fontSize: "20px" }}
                />
                <Button
                  type="text"
                  icon={<InstagramOutlined />}
                  style={{ color: "#e1306c", fontSize: "20px" }}
                />
                <Button
                  type="text"
                  icon={<TwitterOutlined />}
                  style={{ color: "#1da1f2", fontSize: "20px" }}
                />
                <Button
                  type="text"
                  icon={<YoutubeOutlined />}
                  style={{ color: "#ff0000", fontSize: "20px" }}
                />
              </Space>
            </div>
          </Col>

          {/* Quick Links */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ color: "#fff", marginBottom: "16px" }}>
              Liên kết nhanh
            </Title>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link to="/" style={{ color: "#bdc3c7", textDecoration: "none" }}>
                Trang chủ
              </Link>
              <Link to="/products" style={{ color: "#bdc3c7", textDecoration: "none" }}>
                Sản phẩm
              </Link>
              <Link to="/custom-design" style={{ color: "#bdc3c7", textDecoration: "none" }}>
                Thiết kế riêng
              </Link>
              <Link to="/about" style={{ color: "#bdc3c7", textDecoration: "none" }}>
                Về chúng tôi
              </Link>
              <Link to="/contact" style={{ color: "#bdc3c7", textDecoration: "none" }}>
                Liên hệ
              </Link>
            </div>
          </Col>

          {/* Customer Service */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ color: "#fff", marginBottom: "16px" }}>
              Hỗ trợ khách hàng
            </Title>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link to="/shipping" style={{ color: "#bdc3c7", textDecoration: "none" }}>
                Chính sách giao hàng
              </Link>
              <Link to="/return" style={{ color: "#bdc3c7", textDecoration: "none" }}>
                Chính sách đổi trả
              </Link>
              <Link to="/size-guide" style={{ color: "#bdc3c7", textDecoration: "none" }}>
                Hướng dẫn chọn size
              </Link>
              <Link to="/faq" style={{ color: "#bdc3c7", textDecoration: "none" }}>
                Câu hỏi thường gặp
              </Link>
              <Link to="/support" style={{ color: "#bdc3c7", textDecoration: "none" }}>
                Hỗ trợ kỹ thuật
              </Link>
            </div>
          </Col>

          {/* Contact Info */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ color: "#fff", marginBottom: "16px" }}>
              Thông tin liên hệ
            </Title>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <EnvironmentOutlined style={{ color: "#e74c3c" }} />
                <Text style={{ color: "#bdc3c7" }}>
                  123 Đường Lê Lợi, Quận 1, TP.HCM
                </Text>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <PhoneOutlined style={{ color: "#27ae60" }} />
                <Text style={{ color: "#bdc3c7" }}>+84 123 456 789</Text>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <MailOutlined style={{ color: "#f39c12" }} />
                <Text style={{ color: "#bdc3c7" }}>info@vntshirts.com</Text>
              </div>
            </div>

            {/* Newsletter */}
            <div style={{ marginTop: "24px" }}>
              <Title level={5} style={{ color: "#fff", marginBottom: "12px" }}>
                Đăng ký nhận tin
              </Title>
              <Space.Compact style={{ width: "100%" }}>
                <Input
                  placeholder="Nhập email của bạn"
                  style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}
                />
                <Button
                  type="primary"
                  style={{
                    background: "linear-gradient(45deg, #ff6b6b, #ffd93d)",
                    border: "none",
                  }}
                >
                  Đăng ký
                </Button>
              </Space.Compact>
            </div>
          </Col>
        </Row>

        <Divider style={{ borderColor: "rgba(255,255,255,0.1)", margin: "40px 0 20px" }} />

        {/* Bottom Section */}
        <Row justify="space-between" align="middle">
          <Col xs={24} sm={12}>
            <Text style={{ color: "#bdc3c7" }}>
              © 2024 VN T-Shirts. Tất cả quyền được bảo lưu.
            </Text>
          </Col>
          <Col xs={24} sm={12} style={{ textAlign: "right" }}>
            <Space>
              <Link to="/privacy" style={{ color: "#bdc3c7", textDecoration: "none" }}>
                Chính sách bảo mật
              </Link>
              <Text style={{ color: "#bdc3c7" }}>|</Text>
              <Link to="/terms" style={{ color: "#bdc3c7", textDecoration: "none" }}>
                Điều khoản sử dụng
              </Link>
            </Space>
          </Col>
        </Row>

        {/* Made with love */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Text style={{ color: "#bdc3c7" }}>
            Made with <HeartOutlined style={{ color: "#e74c3c" }} /> in Vietnam
          </Text>
        </div>
      </div>
    </AntFooter>
  )
}

export default Footer

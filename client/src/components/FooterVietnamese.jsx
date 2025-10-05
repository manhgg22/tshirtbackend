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
  CrownOutlined,
  BookOutlined,
  TeamOutlined,
  SafetyOutlined,
} from "@ant-design/icons"

const { Footer: AntFooter } = Layout
const { Title, Text, Paragraph } = Typography

const FooterVietnamese = () => {
  return (
    <AntFooter
      style={{
        background: `linear-gradient(135deg, var(--mahogany-brown) 0%, var(--warm-brown) 100%)`,
        color: "var(--ivory-white)",
        padding: "60px 0 20px",
        marginTop: "auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Traditional Pattern Overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"footer-pattern\" x=\"0\" y=\"0\" width=\"30\" height=\"30\" patternUnits=\"userSpaceOnUse\"><circle cx=\"15\" cy=\"15\" r=\"1\" fill=\"%23C89B3C\" opacity=\"0.1\"/><circle cx=\"0\" cy=\"0\" r=\"1\" fill=\"%23C89B3C\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23footer-pattern)\"/></svg>')",
        opacity: 0.2,
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 var(--spacing-lg)", position: "relative", zIndex: 1 }}>
        <Row gutter={[32, 32]}>
          {/* Company Info */}
          <Col xs={24} sm={12} md={6}>
            <div style={{ marginBottom: "var(--spacing-lg)" }}>
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "var(--spacing-sm)",
                marginBottom: "var(--spacing-md)",
              }}>
                <CrownOutlined style={{ fontSize: "32px", color: "var(--gold-copper)" }} />
                <Title level={3} style={{ 
                  color: "var(--ivory-white)", 
                  margin: 0,
                  fontFamily: "var(--font-heading)",
                }}>
                  VN T-Shirts
                </Title>
              </div>
              <Paragraph style={{ 
                color: "rgba(250, 244, 225, 0.8)", 
                marginBottom: "var(--spacing-md)",
                lineHeight: "1.6",
              }}>
                Thương hiệu thời trang Việt Nam tự hào, mang đến những sản phẩm chất lượng cao 
                với thiết kế độc đáo thể hiện tinh thần dân tộc và văn hóa truyền thống.
              </Paragraph>
              <Space size="large">
                <Button
                  type="text"
                  icon={<FacebookOutlined />}
                  style={{ 
                    color: "var(--light-gold)", 
                    fontSize: "20px",
                    background: "rgba(200, 155, 60, 0.1)",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                <Button
                  type="text"
                  icon={<InstagramOutlined />}
                  style={{ 
                    color: "var(--light-gold)", 
                    fontSize: "20px",
                    background: "rgba(200, 155, 60, 0.1)",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                <Button
                  type="text"
                  icon={<TwitterOutlined />}
                  style={{ 
                    color: "var(--light-gold)", 
                    fontSize: "20px",
                    background: "rgba(200, 155, 60, 0.1)",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                <Button
                  type="text"
                  icon={<YoutubeOutlined />}
                  style={{ 
                    color: "var(--light-gold)", 
                    fontSize: "20px",
                    background: "rgba(200, 155, 60, 0.1)",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </Space>
            </div>
          </Col>

          {/* Quick Links */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ 
              color: "var(--light-gold)", 
              marginBottom: "var(--spacing-md)",
              fontFamily: "var(--font-heading)",
            }}>
              Liên kết nhanh
            </Title>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
              <Link to="/" style={{ 
                color: "rgba(250, 244, 225, 0.8)", 
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--light-gold)"}
              onMouseLeave={(e) => e.target.style.color = "rgba(250, 244, 225, 0.8)"}
              >
                Trang chủ
              </Link>
              <Link to="/products" style={{ 
                color: "rgba(250, 244, 225, 0.8)", 
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--light-gold)"}
              onMouseLeave={(e) => e.target.style.color = "rgba(250, 244, 225, 0.8)"}
              >
                Sản phẩm
              </Link>
              <Link to="/custom-design" style={{ 
                color: "rgba(250, 244, 225, 0.8)", 
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--light-gold)"}
              onMouseLeave={(e) => e.target.style.color = "rgba(250, 244, 225, 0.8)"}
              >
                Thiết kế riêng
              </Link>
              <Link to="/about" style={{ 
                color: "rgba(250, 244, 225, 0.8)", 
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--light-gold)"}
              onMouseLeave={(e) => e.target.style.color = "rgba(250, 244, 225, 0.8)"}
              >
                Về chúng tôi
              </Link>
              <Link to="/contact" style={{ 
                color: "rgba(250, 244, 225, 0.8)", 
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--light-gold)"}
              onMouseLeave={(e) => e.target.style.color = "rgba(250, 244, 225, 0.8)"}
              >
                Liên hệ
              </Link>
            </div>
          </Col>

          {/* Customer Service */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ 
              color: "var(--light-gold)", 
              marginBottom: "var(--spacing-md)",
              fontFamily: "var(--font-heading)",
            }}>
              Hỗ trợ khách hàng
            </Title>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
              <Link to="/shipping" style={{ 
                color: "rgba(250, 244, 225, 0.8)", 
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--light-gold)"}
              onMouseLeave={(e) => e.target.style.color = "rgba(250, 244, 225, 0.8)"}
              >
                Chính sách giao hàng
              </Link>
              <Link to="/return" style={{ 
                color: "rgba(250, 244, 225, 0.8)", 
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--light-gold)"}
              onMouseLeave={(e) => e.target.style.color = "rgba(250, 244, 225, 0.8)"}
              >
                Chính sách đổi trả
              </Link>
              <Link to="/size-guide" style={{ 
                color: "rgba(250, 244, 225, 0.8)", 
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--light-gold)"}
              onMouseLeave={(e) => e.target.style.color = "rgba(250, 244, 225, 0.8)"}
              >
                Hướng dẫn chọn size
              </Link>
              <Link to="/faq" style={{ 
                color: "rgba(250, 244, 225, 0.8)", 
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--light-gold)"}
              onMouseLeave={(e) => e.target.style.color = "rgba(250, 244, 225, 0.8)"}
              >
                Câu hỏi thường gặp
              </Link>
              <Link to="/support" style={{ 
                color: "rgba(250, 244, 225, 0.8)", 
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--light-gold)"}
              onMouseLeave={(e) => e.target.style.color = "rgba(250, 244, 225, 0.8)"}
              >
                Hỗ trợ kỹ thuật
              </Link>
            </div>
          </Col>

          {/* Contact Info */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ 
              color: "var(--light-gold)", 
              marginBottom: "var(--spacing-md)",
              fontFamily: "var(--font-heading)",
            }}>
              Thông tin liên hệ
            </Title>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
                <EnvironmentOutlined style={{ color: "var(--gold-copper)", fontSize: "16px" }} />
                <Text style={{ color: "rgba(250, 244, 225, 0.8)", fontSize: "14px" }}>
                  123 Đường Lê Lợi, Quận 1, TP.HCM
                </Text>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
                <PhoneOutlined style={{ color: "var(--jade-green)", fontSize: "16px" }} />
                <Text style={{ color: "rgba(250, 244, 225, 0.8)", fontSize: "14px" }}>+84 123 456 789</Text>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
                <MailOutlined style={{ color: "var(--red-son)", fontSize: "16px" }} />
                <Text style={{ color: "rgba(250, 244, 225, 0.8)", fontSize: "14px" }}>info@vntshirts.com</Text>
              </div>
            </div>

            {/* Newsletter */}
            <div style={{ marginTop: "var(--spacing-lg)" }}>
              <Title level={5} style={{ 
                color: "var(--light-gold)", 
                marginBottom: "var(--spacing-md)",
                fontFamily: "var(--font-heading)",
              }}>
                Đăng ký nhận tin
              </Title>
              <Space.Compact style={{ width: "100%" }}>
                <Input
                  placeholder="Nhập email của bạn"
                  style={{ 
                    background: "rgba(250, 244, 225, 0.1)", 
                    border: "1px solid rgba(200, 155, 60, 0.3)", 
                    color: "var(--ivory-white)",
                    borderRadius: "var(--radius-sm) 0 0 var(--radius-sm)",
                  }}
                />
                <Button
                  className="btn-vietnamese"
                  style={{
                    background: "var(--gold-copper)",
                    border: "none",
                    borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
                    color: "var(--charcoal)",
                    fontWeight: "600",
                  }}
                >
                  Đăng ký
                </Button>
              </Space.Compact>
            </div>
          </Col>
        </Row>

        <Divider style={{ 
          borderColor: "rgba(200, 155, 60, 0.3)", 
          margin: "var(--spacing-xl) 0 var(--spacing-lg) 0" 
        }} />

        {/* Bottom Section */}
        <Row justify="space-between" align="middle">
          <Col xs={24} sm={12}>
            <Text style={{ color: "rgba(250, 244, 225, 0.8)", fontSize: "14px" }}>
              © 2024 VN T-Shirts. Tất cả quyền được bảo lưu.
            </Text>
          </Col>
          <Col xs={24} sm={12} style={{ textAlign: "right" }}>
            <Space>
              <Link to="/privacy" style={{ 
                color: "rgba(250, 244, 225, 0.8)", 
                textDecoration: "none",
                fontSize: "14px",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--light-gold)"}
              onMouseLeave={(e) => e.target.style.color = "rgba(250, 244, 225, 0.8)"}
              >
                Chính sách bảo mật
              </Link>
              <Text style={{ color: "rgba(200, 155, 60, 0.5)" }}>|</Text>
              <Link to="/terms" style={{ 
                color: "rgba(250, 244, 225, 0.8)", 
                textDecoration: "none",
                fontSize: "14px",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--light-gold)"}
              onMouseLeave={(e) => e.target.style.color = "rgba(250, 244, 225, 0.8)"}
              >
                Điều khoản sử dụng
              </Link>
            </Space>
          </Col>
        </Row>

        {/* Made with love */}
        <div style={{ textAlign: "center", marginTop: "var(--spacing-lg)" }}>
          <Text style={{ color: "rgba(250, 244, 225, 0.8)", fontSize: "14px" }}>
            Made with <HeartOutlined style={{ color: "var(--red-son)" }} /> in Vietnam
          </Text>
        </div>
      </div>
    </AntFooter>
  )
}

export default FooterVietnamese

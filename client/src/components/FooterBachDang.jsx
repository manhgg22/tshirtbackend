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
  HistoryOutlined,
  FlagOutlined,
  SwordOutlined,
} from "@ant-design/icons"

const { Footer: AntFooter } = Layout
const { Title, Text, Paragraph } = Typography

const FooterBachDang = () => {
  return (
    <AntFooter
      style={{
        background: `linear-gradient(135deg, var(--wood-brown) 0%, var(--deep-blue) 100%)`,
        color: "var(--ivory-cream)",
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
        background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"footer-pattern\" x=\"0\" y=\"0\" width=\"40\" height=\"40\" patternUnits=\"userSpaceOnUse\"><circle cx=\"20\" cy=\"20\" r=\"1\" fill=\"%23C9A44D\" opacity=\"0.1\"/><circle cx=\"0\" cy=\"0\" r=\"1\" fill=\"%23C9A44D\" opacity=\"0.1\"/><rect x=\"10\" y=\"10\" width=\"1\" height=\"20\" fill=\"%23C9A44D\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23footer-pattern)\"/></svg>')",
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
                <div style={{
                  width: "40px",
                  height: "40px",
                  background: "linear-gradient(45deg, var(--bronze-gold), var(--ancient-gold))",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(201, 164, 77, 0.4)",
                }}>
                  <CrownOutlined style={{ color: "var(--charcoal-dark)", fontSize: "20px" }} />
                </div>
                <Title level={3} style={{ 
                  color: "var(--ivory-cream)", 
                  margin: 0,
                  fontFamily: "var(--font-hero)",
                }}>
                  Bạch Đằng Giang
                </Title>
              </div>
              <Paragraph style={{ 
                color: "rgba(249, 246, 236, 0.8)", 
                marginBottom: "var(--spacing-md)",
                lineHeight: "1.6",
                fontFamily: "var(--font-body)",
              }}>
                Di tích lịch sử vĩ đại nơi Ngô Quyền đã làm nên chiến thắng lẫy lừng năm 938, 
                đánh dấu mốc son trong lịch sử dân tộc Việt Nam.
              </Paragraph>
              <Space size="large">
                <Button
                  type="text"
                  icon={<FacebookOutlined />}
                  style={{ 
                    color: "var(--bronze-gold)", 
                    fontSize: "20px",
                    background: "rgba(201, 164, 77, 0.1)",
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
                    color: "var(--bronze-gold)", 
                    fontSize: "20px",
                    background: "rgba(201, 164, 77, 0.1)",
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
                    color: "var(--bronze-gold)", 
                    fontSize: "20px",
                    background: "rgba(201, 164, 77, 0.1)",
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
                    color: "var(--bronze-gold)", 
                    fontSize: "20px",
                    background: "rgba(201, 164, 77, 0.1)",
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
              color: "var(--bronze-gold)", 
              marginBottom: "var(--spacing-md)",
              fontFamily: "var(--font-heading)",
            }}>
              Liên kết nhanh
            </Title>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
              <Link to="/" style={{ 
                color: "rgba(249, 246, 236, 0.8)", 
                textDecoration: "none",
                transition: "color 0.3s ease",
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--bronze-gold)"}
              onMouseLeave={(e) => e.target.style.color = "rgba(249, 246, 236, 0.8)"}
              >
                Trang chủ
              </Link>
              <Link to="/heritage" style={{ 
                color: "rgba(249, 246, 236, 0.8)", 
                textDecoration: "none",
                transition: "color 0.3s ease",
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--bronze-gold)"}
              onMouseLeave={(e) => e.target.style.color = "rgba(249, 246, 236, 0.8)"}
              >
                Di sản
              </Link>
              <Link to="/history" style={{ 
                color: "rgba(249, 246, 236, 0.8)", 
                textDecoration: "none",
                transition: "color 0.3s ease",
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--bronze-gold)"}
              onMouseLeave={(e) => e.target.style.color = "rgba(249, 246, 236, 0.8)"}
              >
                Lịch sử
              </Link>
              <Link to="/visit" style={{ 
                color: "rgba(249, 246, 236, 0.8)", 
                textDecoration: "none",
                transition: "color 0.3s ease",
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--bronze-gold)"}
              onMouseLeave={(e) => e.target.style.color = "rgba(249, 246, 236, 0.8)"}
              >
                Tham quan
              </Link>
              <Link to="/contact" style={{ 
                color: "rgba(249, 246, 236, 0.8)", 
                textDecoration: "none",
                transition: "color 0.3s ease",
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--bronze-gold)"}
              onMouseLeave={(e) => e.target.style.color = "rgba(249, 246, 236, 0.8)"}
              >
                Liên hệ
              </Link>
            </div>
          </Col>

          {/* Heritage & History */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ 
              color: "var(--bronze-gold)", 
              marginBottom: "var(--spacing-md)",
              fontFamily: "var(--font-heading)",
            }}>
              Di sản & Lịch sử
            </Title>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
              <Link to="/heritage/stakes" style={{ 
                color: "rgba(249, 246, 236, 0.8)", 
                textDecoration: "none",
                transition: "color 0.3s ease",
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--bronze-gold)"}
              onMouseLeave={(e) => e.target.style.color = "rgba(249, 246, 236, 0.8)"}
              >
                <SwordOutlined style={{ marginRight: "8px" }} />
                Bãi cọc cổ
              </Link>
              <Link to="/heritage/ships" style={{ 
                color: "rgba(249, 246, 236, 0.8)", 
                textDecoration: "none",
                transition: "color 0.3s ease",
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--bronze-gold)"}
              onMouseLeave={(e) => e.target.style.color = "rgba(249, 246, 236, 0.8)"}
              >
                <FlagOutlined style={{ marginRight: "8px" }} />
                Thuyền chiến
              </Link>
              <Link to="/history/battle" style={{ 
                color: "rgba(249, 246, 236, 0.8)", 
                textDecoration: "none",
                transition: "color 0.3s ease",
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--bronze-gold)"}
              onMouseLeave={(e) => e.target.style.color = "rgba(249, 246, 236, 0.8)"}
              >
                <HistoryOutlined style={{ marginRight: "8px" }} />
                Trận chiến 938
              </Link>
              <Link to="/heritage/museum" style={{ 
                color: "rgba(249, 246, 236, 0.8)", 
                textDecoration: "none",
                transition: "color 0.3s ease",
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--bronze-gold)"}
              onMouseLeave={(e) => e.target.style.color = "rgba(249, 246, 236, 0.8)"}
              >
                <BookOutlined style={{ marginRight: "8px" }} />
                Bảo tàng
              </Link>
              <Link to="/heritage/artifacts" style={{ 
                color: "rgba(249, 246, 236, 0.8)", 
                textDecoration: "none",
                transition: "color 0.3s ease",
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--bronze-gold)"}
              onMouseLeave={(e) => e.target.style.color = "rgba(249, 246, 236, 0.8)"}
              >
                <CrownOutlined style={{ marginRight: "8px" }} />
                Hiện vật
              </Link>
            </div>
          </Col>

          {/* Contact Info */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ 
              color: "var(--bronze-gold)", 
              marginBottom: "var(--spacing-md)",
              fontFamily: "var(--font-heading)",
            }}>
              Thông tin liên hệ
            </Title>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
                <EnvironmentOutlined style={{ color: "var(--bronze-gold)", fontSize: "16px" }} />
                <Text style={{ color: "rgba(249, 246, 236, 0.8)", fontSize: "14px", fontFamily: "var(--font-body)" }}>
                  Bạch Đằng Giang, Quảng Ninh
                </Text>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
                <PhoneOutlined style={{ color: "var(--deep-blue)", fontSize: "16px" }} />
                <Text style={{ color: "rgba(249, 246, 236, 0.8)", fontSize: "14px", fontFamily: "var(--font-body)" }}>+84 123 456 789</Text>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
                <MailOutlined style={{ color: "var(--red-earth)", fontSize: "16px" }} />
                <Text style={{ color: "rgba(249, 246, 236, 0.8)", fontSize: "14px", fontFamily: "var(--font-body)" }}>info@bachdanggiang.vn</Text>
              </div>
            </div>

            {/* Newsletter */}
            <div style={{ marginTop: "var(--spacing-lg)" }}>
              <Title level={5} style={{ 
                color: "var(--bronze-gold)", 
                marginBottom: "var(--spacing-md)",
                fontFamily: "var(--font-heading)",
              }}>
                Đăng ký nhận tin
              </Title>
              <Space.Compact style={{ width: "100%" }}>
                <Input
                  placeholder="Nhập email của bạn"
                  style={{ 
                    background: "rgba(249, 246, 236, 0.1)", 
                    border: "1px solid rgba(201, 164, 77, 0.3)", 
                    color: "var(--ivory-cream)",
                    borderRadius: "var(--radius-sm) 0 0 var(--radius-sm)",
                  }}
                />
                <Button
                  className="btn-bachdang"
                  style={{
                    background: "var(--bronze-gold)",
                    border: "none",
                    borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
                    color: "var(--charcoal-dark)",
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
          borderColor: "rgba(201, 164, 77, 0.3)", 
          margin: "var(--spacing-xl) 0 var(--spacing-lg) 0" 
        }} />

        {/* Historical Quote */}
        <div style={{ textAlign: "center", marginBottom: "var(--spacing-lg)" }}>
          <blockquote style={{
            fontStyle: "italic",
            fontSize: "18px",
            color: "var(--bronze-gold)",
            fontFamily: "var(--font-heading)",
            margin: 0,
            padding: "var(--spacing-md)",
            borderLeft: "4px solid var(--bronze-gold)",
            background: "rgba(201, 164, 77, 0.1)",
            borderRadius: "var(--radius-sm)",
          }}>
            "Bạch Đằng Giang – dấu ấn ngàn năm còn vọng mãi."
          </blockquote>
        </div>

        {/* Bottom Section */}
        <Row justify="space-between" align="middle">
          <Col xs={24} sm={12}>
            <Text style={{ color: "rgba(249, 246, 236, 0.8)", fontSize: "14px", fontFamily: "var(--font-body)" }}>
              © 2024 Bạch Đằng Giang Heritage. Tất cả quyền được bảo lưu.
            </Text>
          </Col>
          <Col xs={24} sm={12} style={{ textAlign: "right" }}>
            <Space>
              <Link to="/privacy" style={{ 
                color: "rgba(249, 246, 236, 0.8)", 
                textDecoration: "none",
                fontSize: "14px",
                transition: "color 0.3s ease",
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--bronze-gold)"}
              onMouseLeave={(e) => e.target.style.color = "rgba(249, 246, 236, 0.8)"}
              >
                Chính sách bảo mật
              </Link>
              <Text style={{ color: "rgba(201, 164, 77, 0.5)" }}>|</Text>
              <Link to="/terms" style={{ 
                color: "rgba(249, 246, 236, 0.8)", 
                textDecoration: "none",
                fontSize: "14px",
                transition: "color 0.3s ease",
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--bronze-gold)"}
              onMouseLeave={(e) => e.target.style.color = "rgba(249, 246, 236, 0.8)"}
              >
                Điều khoản sử dụng
              </Link>
            </Space>
          </Col>
        </Row>

        {/* Made with pride */}
        <div style={{ textAlign: "center", marginTop: "var(--spacing-lg)" }}>
          <Text style={{ color: "rgba(249, 246, 236, 0.8)", fontSize: "14px", fontFamily: "var(--font-body)" }}>
            Made with <HeartOutlined style={{ color: "var(--red-earth)" }} /> pride in Vietnam
          </Text>
        </div>
      </div>
    </AntFooter>
  )
}

export default FooterBachDang


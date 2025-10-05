import React, { useEffect, useState } from "react"
import { Typography, Row, Col, Spin, Alert, Card, Button, Space, Image, Statistic, Divider } from "antd"
import {
  ShoppingCartOutlined,
  StarFilled,
  FireOutlined,
  TrophyOutlined,
  HeartOutlined,
  ThunderboltOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  TruckOutlined,
  SafetyOutlined,
  CustomerServiceOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../redux/productSlice"
import { addItem } from "../redux/cartSlice"
import ProductCard from "../components/ProductCard"

const { Title, Paragraph, Text } = Typography

const HomePage = () => {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.products)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleAddToCart = (product) => {
    dispatch(addItem({ ...product, quantity: 1 }))
  }

  const heroSlides = [
    {
      title: "Tự Hào Việt Nam",
      subtitle: "Thiết kế độc đáo thể hiện tinh thần dân tộc",
      description: "Khám phá bộ sưu tập áo thun với thiết kế đặc biệt tôn vinh văn hóa và lịch sử Việt Nam",
      image: "https://via.placeholder.com/1200x600/dc2626/ffffff?text=Tự+Hào+Việt+Nam",
      buttonText: "Khám phá ngay",
      buttonColor: "#dc2626"
    },
    {
      title: "Chất Lượng Cao Cấp",
      subtitle: "Cotton 100% nhập khẩu",
      description: "Sản phẩm được làm từ chất liệu cotton cao cấp, mềm mại và bền đẹp theo thời gian",
      image: "https://via.placeholder.com/1200x600/059669/ffffff?text=Chất+Lượng+Cao+Cấp",
      buttonText: "Tìm hiểu thêm",
      buttonColor: "#059669"
    },
    {
      title: "Thiết Kế Riêng",
      subtitle: "Tạo nên phong cách cá nhân",
      description: "Công cụ thiết kế trực tuyến cho phép bạn tạo ra những sản phẩm độc đáo mang dấu ấn riêng",
      image: "https://via.placeholder.com/1200x600/7c3aed/ffffff?text=Thiết+Kế+Riêng",
      buttonText: "Bắt đầu thiết kế",
      buttonColor: "#7c3aed"
    }
  ]

  const features = [
    {
      icon: <TruckOutlined style={{ fontSize: "32px", color: "#667eea" }} />,
      title: "Giao hàng nhanh",
      description: "Miễn phí giao hàng trong 24h tại TP.HCM"
    },
    {
      icon: <SafetyOutlined style={{ fontSize: "32px", color: "#f093fb" }} />,
      title: "Bảo hành chất lượng",
      description: "Đổi trả miễn phí trong 30 ngày"
    },
    {
      icon: <CustomerServiceOutlined style={{ fontSize: "32px", color: "#4facfe" }} />,
      title: "Hỗ trợ 24/7",
      description: "Đội ngũ CSKH chuyên nghiệp"
    },
    {
      icon: <CheckCircleOutlined style={{ fontSize: "32px", color: "#43e97b" }} />,
      title: "Sản phẩm chính hãng",
      description: "Cam kết chất lượng 100%"
    }
  ]

  const stats = [
    { title: "Khách hàng hài lòng", value: "50K+", icon: <HeartOutlined /> },
    { title: "Sản phẩm đã bán", value: "100K+", icon: <ShoppingCartOutlined /> },
    { title: "Năm kinh nghiệm", value: "5+", icon: <TrophyOutlined /> },
    { title: "Tỷ lệ đánh giá 5 sao", value: "98%", icon: <StarFilled /> },
  ]

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "100px 0" }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>
          <Text>Đang tải sản phẩm...</Text>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert
        message="Lỗi tải dữ liệu"
        description={error}
        type="error"
        showIcon
        style={{ margin: "20px" }}
      />
    )
  }

  return (
    <div style={{ background: "#f8fafc" }}>
      {/* Hero Section */}
      <div style={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "600px",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "url('https://via.placeholder.com/1920x1080/667eea/ffffff?text=Pattern')",
          opacity: 0.1,
          backgroundSize: "cover",
        }} />
        
        <div style={{ 
          maxWidth: 1200, 
          margin: "0 auto", 
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
        }}>
          <Row align="middle" gutter={[48, 48]}>
            <Col xs={24} lg={12}>
              <div style={{ color: "#fff" }}>
                <Title 
                  level={1} 
                  style={{ 
                    color: "#fff", 
                    fontSize: "48px",
                    fontWeight: "800",
                    marginBottom: "16px",
                    lineHeight: "1.2",
                  }}
                >
                  {heroSlides[currentSlide].title}
                </Title>
                <Title 
                  level={3} 
                  style={{ 
                    color: "rgba(255,255,255,0.9)", 
                    fontSize: "24px",
                    fontWeight: "400",
                    marginBottom: "16px",
                  }}
                >
                  {heroSlides[currentSlide].subtitle}
                </Title>
                <Paragraph 
                  style={{ 
                    color: "rgba(255,255,255,0.8)", 
                    fontSize: "18px",
                    marginBottom: "32px",
                    lineHeight: "1.6",
                  }}
                >
                  {heroSlides[currentSlide].description}
                </Paragraph>
                <Space size="large">
                  <Button
                    type="primary"
                    size="large"
                    style={{
                      background: heroSlides[currentSlide].buttonColor,
                      border: "none",
                      borderRadius: "8px",
                      height: "48px",
                      padding: "0 32px",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                    icon={<ArrowRightOutlined />}
                  >
                    {heroSlides[currentSlide].buttonText}
                  </Button>
                  <Button
                    size="large"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.3)",
                      color: "#fff",
                      borderRadius: "8px",
                      height: "48px",
                      padding: "0 32px",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                    icon={<PlayCircleOutlined />}
                  >
                    Xem video
                  </Button>
                </Space>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div style={{ textAlign: "center" }}>
                <Image
                  src={heroSlides[currentSlide].image}
                  style={{
                    borderRadius: "16px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    maxWidth: "100%",
                    height: "auto",
                  }}
                  preview={false}
                />
              </div>
            </Col>
          </Row>
        </div>

        {/* Slide indicators */}
        <div style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "12px",
        }}>
          {heroSlides.map((_, index) => (
            <Button
              key={index}
              type="text"
              shape="circle"
              size="small"
              onClick={() => setCurrentSlide(index)}
              style={{
                background: index === currentSlide ? "#fff" : "rgba(255,255,255,0.3)",
                border: "none",
                width: "12px",
                height: "12px",
                minWidth: "12px",
              }}
            />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: "80px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <Title level={2} style={{ marginBottom: "16px" }}>
              Tại sao chọn VN T-Shirts?
            </Title>
            <Paragraph style={{ fontSize: "18px", color: "#666", maxWidth: "600px", margin: "0 auto" }}>
              Chúng tôi cam kết mang đến những sản phẩm chất lượng cao với dịch vụ tốt nhất
            </Paragraph>
          </div>
          
          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <Card
                  hoverable
                  style={{
                    textAlign: "center",
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    borderRadius: "16px",
                    height: "100%",
                  }}
                >
                  <div style={{ marginBottom: "16px" }}>
                    {feature.icon}
                  </div>
                  <Title level={4} style={{ marginBottom: "8px" }}>
                    {feature.title}
                  </Title>
                  <Paragraph style={{ color: "#666", margin: 0 }}>
                    {feature.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ 
        padding: "80px 0", 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <Row gutter={[32, 32]}>
            {stats.map((stat, index) => (
              <Col xs={12} sm={6} key={index}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ 
                    fontSize: "48px", 
                    marginBottom: "16px",
                    color: "rgba(255,255,255,0.9)",
                  }}>
                    {stat.icon}
                  </div>
                  <Statistic
                    value={stat.value}
                    valueStyle={{ color: "#fff", fontSize: "32px", fontWeight: "700" }}
                  />
                  <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px" }}>
                    {stat.title}
                  </Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Featured Products */}
      <div style={{ padding: "80px 0", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <Title level={2} style={{ marginBottom: "16px" }}>
              Sản phẩm nổi bật
            </Title>
            <Paragraph style={{ fontSize: "18px", color: "#666", maxWidth: "600px", margin: "0 auto" }}>
              Khám phá những sản phẩm được yêu thích nhất từ bộ sưu tập của chúng tôi
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {products.slice(0, 8).map((product) => (
              <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
                <ProductCard product={product} onAddToCart={() => handleAddToCart(product)} />
              </Col>
            ))}
          </Row>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Button
              type="primary"
              size="large"
              style={{
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                border: "none",
                borderRadius: "8px",
                height: "48px",
                padding: "0 32px",
                fontSize: "16px",
                fontWeight: "600",
              }}
              icon={<ArrowRightOutlined />}
            >
              Xem tất cả sản phẩm
            </Button>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div style={{ 
        padding: "80px 0", 
        background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <Title level={2} style={{ marginBottom: "16px" }}>
            Đăng ký nhận tin tức
          </Title>
          <Paragraph style={{ fontSize: "18px", color: "#666", marginBottom: "32px" }}>
            Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt
          </Paragraph>
          
          <Space.Compact style={{ width: "100%", maxWidth: "400px" }}>
            <input
              placeholder="Nhập email của bạn"
              style={{
                flex: 1,
                padding: "12px 16px",
                border: "1px solid #ddd",
                borderRadius: "8px 0 0 8px",
                outline: "none",
                fontSize: "16px",
              }}
            />
            <Button
              type="primary"
              style={{
                background: "linear-gradient(45deg, #ff6b6b, #ffd93d)",
                border: "none",
                borderRadius: "0 8px 8px 0",
                padding: "0 24px",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Đăng ký
            </Button>
          </Space.Compact>
        </div>
      </div>
    </div>
  )
}

export default HomePage

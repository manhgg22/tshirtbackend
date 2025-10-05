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
  CrownOutlined,
  BookOutlined,
  TeamOutlined,
} from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../redux/productSlice"
import { addItem } from "../redux/cartSlice"
import ProductCardVietnamese from "../components/ProductCardVietnamese"

const { Title, Paragraph, Text } = Typography

const HomePageVietnamese = () => {
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
      image: "https://via.placeholder.com/1200x600/A61C1C/FAF4E1?text=Tự+Hào+Việt+Nam",
      buttonText: "Khám phá ngay",
      buttonColor: "var(--gold-copper)"
    },
    {
      title: "Chất Lượng Cao Cấp",
      subtitle: "Cotton 100% nhập khẩu",
      description: "Sản phẩm được làm từ chất liệu cotton cao cấp, mềm mại và bền đẹp theo thời gian",
      image: "https://via.placeholder.com/1200x600/2E8B57/FAF4E1?text=Chất+Lượng+Cao+Cấp",
      buttonText: "Tìm hiểu thêm",
      buttonColor: "var(--jade-green)"
    },
    {
      title: "Thiết Kế Riêng",
      subtitle: "Tạo nên phong cách cá nhân",
      description: "Công cụ thiết kế trực tuyến cho phép bạn tạo ra những sản phẩm độc đáo mang dấu ấn riêng",
      image: "https://via.placeholder.com/1200x600/C89B3C/FAF4E1?text=Thiết+Kế+Riêng",
      buttonText: "Bắt đầu thiết kế",
      buttonColor: "var(--mahogany-brown)"
    }
  ]

  const features = [
    {
      icon: <TruckOutlined style={{ fontSize: "32px", color: "var(--jade-green)" }} />,
      title: "Giao hàng nhanh",
      description: "Miễn phí giao hàng trong 24h tại TP.HCM"
    },
    {
      icon: <SafetyOutlined style={{ fontSize: "32px", color: "var(--gold-copper)" }} />,
      title: "Bảo hành chất lượng",
      description: "Đổi trả miễn phí trong 30 ngày"
    },
    {
      icon: <CustomerServiceOutlined style={{ fontSize: "32px", color: "var(--red-son)" }} />,
      title: "Hỗ trợ 24/7",
      description: "Đội ngũ CSKH chuyên nghiệp"
    },
    {
      icon: <CheckCircleOutlined style={{ fontSize: "32px", color: "var(--mahogany-brown)" }} />,
      title: "Sản phẩm chính hãng",
      description: "Cam kết chất lượng 100%"
    }
  ]

  const stats = [
    { title: "Khách hàng hài lòng", value: "50K+", icon: <HeartOutlined />, color: "var(--red-son)" },
    { title: "Sản phẩm đã bán", value: "100K+", icon: <ShoppingCartOutlined />, color: "var(--gold-copper)" },
    { title: "Năm kinh nghiệm", value: "5+", icon: <TrophyOutlined />, color: "var(--jade-green)" },
    { title: "Tỷ lệ đánh giá 5 sao", value: "98%", icon: <StarFilled />, color: "var(--mahogany-brown)" },
  ]

  const culturalElements = [
    {
      icon: <BookOutlined style={{ fontSize: "24px", color: "var(--red-son)" }} />,
      title: "Văn hóa truyền thống",
      description: "Tôn vinh những giá trị văn hóa đặc sắc của Việt Nam"
    },
    {
      icon: <TeamOutlined style={{ fontSize: "24px", color: "var(--gold-copper)" }} />,
      title: "Cộng đồng đoàn kết",
      description: "Kết nối những người yêu thích thời trang Việt"
    },
    {
      icon: <CrownOutlined style={{ fontSize: "24px", color: "var(--jade-green)" }} />,
      title: "Chất lượng cao cấp",
      description: "Cam kết mang đến sản phẩm tốt nhất cho khách hàng"
    }
  ]

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "100px 0" }}>
        <Spin size="large" />
        <div style={{ marginTop: "var(--spacing-md)" }}>
          <Text className="text-traditional">Đang tải sản phẩm...</Text>
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
        style={{ margin: "var(--spacing-lg)" }}
      />
    )
  }

  return (
    <div style={{ background: "var(--ivory-white)" }}>
      {/* Hero Section */}
      <div style={{ 
        background: `linear-gradient(135deg, var(--red-son) 0%, var(--deep-red) 100%)`,
        minHeight: "600px",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Traditional Pattern Overlay */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"vietnamese-pattern\" x=\"0\" y=\"0\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\"><circle cx=\"10\" cy=\"10\" r=\"1\" fill=\"%23C89B3C\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23vietnamese-pattern)\"/></svg>')",
          opacity: 0.3,
        }} />
        
        <div style={{ 
          maxWidth: 1200, 
          margin: "0 auto", 
          padding: "0 var(--spacing-lg)",
          position: "relative",
          zIndex: 1,
        }}>
          <Row align="middle" gutter={[48, 48]}>
            <Col xs={24} lg={12}>
              <div style={{ color: "var(--ivory-white)" }}>
                <Title 
                  level={1} 
                  className="heading-vietnamese"
                  style={{ 
                    color: "var(--ivory-white)", 
                    fontSize: "48px",
                    fontWeight: "700",
                    marginBottom: "var(--spacing-md)",
                    lineHeight: "1.2",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {heroSlides[currentSlide].title}
                </Title>
                <Title 
                  level={3} 
                  style={{ 
                    color: "var(--light-gold)", 
                    fontSize: "24px",
                    fontWeight: "400",
                    marginBottom: "var(--spacing-md)",
                  }}
                >
                  {heroSlides[currentSlide].subtitle}
                </Title>
                <Paragraph 
                  style={{ 
                    color: "rgba(250, 244, 225, 0.9)", 
                    fontSize: "18px",
                    marginBottom: "var(--spacing-xl)",
                    lineHeight: "1.6",
                  }}
                >
                  {heroSlides[currentSlide].description}
                </Paragraph>
                <Space size="large">
                  <Button
                    className="btn-vietnamese"
                    size="large"
                    style={{
                      background: heroSlides[currentSlide].buttonColor,
                      border: "none",
                      borderRadius: "var(--radius-md)",
                      height: "48px",
                      padding: "0 var(--spacing-xl)",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                    icon={<ArrowRightOutlined />}
                  >
                    {heroSlides[currentSlide].buttonText}
                  </Button>
                  <Button
                    className="btn-vietnamese-secondary"
                    size="large"
                    style={{
                      background: "rgba(250, 244, 225, 0.1)",
                      border: "1px solid var(--light-gold)",
                      color: "var(--ivory-white)",
                      borderRadius: "var(--radius-md)",
                      height: "48px",
                      padding: "0 var(--spacing-xl)",
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
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "var(--shadow-strong)",
                    maxWidth: "100%",
                    height: "auto",
                    border: "3px solid var(--light-gold)",
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
          bottom: "var(--spacing-xl)",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "var(--spacing-md)",
        }}>
          {heroSlides.map((_, index) => (
            <Button
              key={index}
              type="text"
              shape="circle"
              size="small"
              onClick={() => setCurrentSlide(index)}
              style={{
                background: index === currentSlide ? "var(--light-gold)" : "rgba(250, 244, 225, 0.3)",
                border: "none",
                width: "12px",
                height: "12px",
                minWidth: "12px",
              }}
            />
          ))}
        </div>
      </div>

      {/* Cultural Features Section */}
      <div style={{ padding: "80px 0", background: "var(--cream)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 var(--spacing-lg)" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <Title level={2} className="heading-vietnamese" style={{ marginBottom: "var(--spacing-md)" }}>
              Giá trị truyền thống Việt Nam
            </Title>
            <Paragraph style={{ fontSize: "18px", color: "var(--mahogany-brown)", maxWidth: "600px", margin: "0 auto" }}>
              Chúng tôi tự hào mang đến những sản phẩm thể hiện tinh thần và văn hóa Việt Nam
            </Paragraph>
          </div>
          
          <Row gutter={[32, 32]}>
            {culturalElements.map((element, index) => (
              <Col xs={24} sm={8} key={index}>
                <Card
                  className="card-vietnamese"
                  style={{
                    textAlign: "center",
                    height: "100%",
                    background: "var(--ivory-white)",
                    border: "1px solid var(--light-gold)",
                  }}
                >
                  <div style={{ marginBottom: "var(--spacing-md)" }}>
                    {element.icon}
                  </div>
                  <Title level={4} className="text-traditional" style={{ marginBottom: "var(--spacing-sm)" }}>
                    {element.title}
                  </Title>
                  <Paragraph style={{ color: "var(--medium-gray)", margin: 0 }}>
                    {element.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: "80px 0", background: "var(--ivory-white)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 var(--spacing-lg)" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <Title level={2} className="heading-vietnamese" style={{ marginBottom: "var(--spacing-md)" }}>
              Tại sao chọn VN T-Shirts?
            </Title>
            <Paragraph style={{ fontSize: "18px", color: "var(--mahogany-brown)", maxWidth: "600px", margin: "0 auto" }}>
              Chúng tôi cam kết mang đến những sản phẩm chất lượng cao với dịch vụ tốt nhất
            </Paragraph>
          </div>
          
          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <Card
                  className="card-vietnamese"
                  style={{
                    textAlign: "center",
                    height: "100%",
                    background: "var(--ivory-white)",
                    border: "1px solid var(--light-gold)",
                  }}
                >
                  <div style={{ marginBottom: "var(--spacing-md)" }}>
                    {feature.icon}
                  </div>
                  <Title level={4} className="text-traditional" style={{ marginBottom: "var(--spacing-sm)" }}>
                    {feature.title}
                  </Title>
                  <Paragraph style={{ color: "var(--medium-gray)", margin: 0 }}>
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
        background: `linear-gradient(135deg, var(--mahogany-brown) 0%, var(--warm-brown) 100%)`,
        color: "var(--ivory-white)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 var(--spacing-lg)" }}>
          <Row gutter={[32, 32]}>
            {stats.map((stat, index) => (
              <Col xs={12} sm={6} key={index}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ 
                    fontSize: "48px", 
                    marginBottom: "var(--spacing-md)",
                    color: stat.color,
                  }}>
                    {stat.icon}
                  </div>
                  <Statistic
                    value={stat.value}
                    valueStyle={{ 
                      color: "var(--light-gold)", 
                      fontSize: "32px", 
                      fontWeight: "700",
                      fontFamily: "var(--font-heading)",
                    }}
                  />
                  <Text style={{ color: "rgba(250, 244, 225, 0.9)", fontSize: "16px" }}>
                    {stat.title}
                  </Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Featured Products */}
      <div style={{ padding: "80px 0", background: "var(--cream)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 var(--spacing-lg)" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <Title level={2} className="heading-vietnamese" style={{ marginBottom: "var(--spacing-md)" }}>
              Sản phẩm nổi bật
            </Title>
            <Paragraph style={{ fontSize: "18px", color: "var(--mahogany-brown)", maxWidth: "600px", margin: "0 auto" }}>
              Khám phá những sản phẩm được yêu thích nhất từ bộ sưu tập của chúng tôi
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {products.slice(0, 8).map((product) => (
              <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
                <ProductCardVietnamese product={product} onAddToCart={() => handleAddToCart(product)} />
              </Col>
            ))}
          </Row>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Button
              className="btn-vietnamese"
              size="large"
              style={{
                background: "linear-gradient(135deg, var(--gold-copper), var(--light-gold))",
                border: "none",
                borderRadius: "var(--radius-md)",
                height: "48px",
                padding: "0 var(--spacing-xl)",
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
        background: `linear-gradient(135deg, var(--light-gold) 0%, var(--gold-copper) 100%)`,
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 var(--spacing-lg)", textAlign: "center" }}>
          <Title level={2} className="heading-vietnamese" style={{ marginBottom: "var(--spacing-md)" }}>
            Đăng ký nhận tin tức
          </Title>
          <Paragraph style={{ fontSize: "18px", color: "var(--mahogany-brown)", marginBottom: "var(--spacing-xl)" }}>
            Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt
          </Paragraph>
          
          <Space.Compact style={{ width: "100%", maxWidth: "400px" }}>
            <input
              placeholder="Nhập email của bạn"
              style={{
                flex: 1,
                padding: "var(--spacing-md)",
                border: "1px solid var(--mahogany-brown)",
                borderRadius: "var(--radius-md) 0 0 var(--radius-md)",
                outline: "none",
                fontSize: "16px",
                background: "var(--ivory-white)",
                color: "var(--charcoal)",
              }}
            />
            <Button
              className="btn-vietnamese"
              style={{
                background: "var(--red-son)",
                border: "none",
                borderRadius: "0 var(--radius-md) var(--radius-md) 0",
                padding: "0 var(--spacing-lg)",
                fontSize: "16px",
                fontWeight: "600",
                color: "var(--ivory-white)",
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

export default HomePageVietnamese

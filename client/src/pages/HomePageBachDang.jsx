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
  HistoryOutlined,
  EnvironmentOutlined,
  FlagOutlined,
  SwordOutlined,
} from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../redux/productSlice"
import { addItem } from "../redux/cartSlice"
import ProductCard from "../components/ProductCard"

const { Title, Paragraph, Text } = Typography

const HomePageBachDang = () => {
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
      title: "Hào khí Bạch Đằng Giang",
      subtitle: "Nơi con sông kể chuyện oai hùng dân tộc",
      description: "Khám phá di tích lịch sử vĩ đại nơi Ngô Quyền đã làm nên chiến thắng lẫy lừng, đánh dấu mốc son trong lịch sử dân tộc Việt Nam",
      image: "/images/tshirt-left.png",
      buttonText: "Khám phá lịch sử",
      buttonColor: "var(--bronze-gold)"
    },
    {
      title: "Bãi cọc nghìn năm",
      subtitle: "Chứng tích oai hùng của cha ông",
      description: "Những chiếc cọc gỗ cổ đại vẫn còn đó, kể lại câu chuyện về trí tuệ và lòng dũng cảm của người Việt trong cuộc chiến bảo vệ Tổ quốc",
      image: "/images/tshirt-real.png",
      buttonText: "Tìm hiểu di tích",
      buttonColor: "var(--red-earth)"
    },
    {
      title: "Thuyền chiến cổ đại",
      subtitle: "Nghệ thuật quân sự tài ba",
      description: "Khám phá những chiếc thuyền chiến cổ đại và chiến thuật quân sự tài ba đã làm nên chiến thắng Bạch Đằng lịch sử",
      image: "/images/tshirt-right.png",
      buttonText: "Xem hiện vật",
      buttonColor: "var(--deep-blue)"
    }
  ]

  const heritageItems = [
    {
      icon: <SwordOutlined style={{ fontSize: "32px", color: "var(--red-earth)" }} />,
      title: "Bãi cọc cổ",
      description: "Những chiếc cọc gỗ nghìn năm tuổi vẫn còn đó, chứng tích của chiến thắng oai hùng"
    },
    {
      icon: <FlagOutlined style={{ fontSize: "32px", color: "var(--bronze-gold)" }} />,
      title: "Thuyền chiến",
      description: "Những chiếc thuyền chiến cổ đại với thiết kế tinh xảo và chiến thuật quân sự tài ba"
    },
    {
      icon: <CrownOutlined style={{ fontSize: "32px", color: "var(--deep-blue)" }} />,
      title: "Di tích lịch sử",
      description: "Khu di tích lịch sử Bạch Đằng Giang - nơi lưu giữ những giá trị văn hóa vô giá"
    }
  ]

  const features = [
    {
      icon: <HistoryOutlined style={{ fontSize: "32px", color: "var(--red-earth)" }} />,
      title: "Lịch sử hào hùng",
      description: "Khám phá những câu chuyện lịch sử đầy tự hào của dân tộc"
    },
    {
      icon: <EnvironmentOutlined style={{ fontSize: "32px", color: "var(--bronze-gold)" }} />,
      title: "Tham quan di tích",
      description: "Trải nghiệm thực tế tại các di tích lịch sử quan trọng"
    },
    {
      icon: <BookOutlined style={{ fontSize: "32px", color: "var(--deep-blue)" }} />,
      title: "Văn hóa truyền thống",
      description: "Tìm hiểu về văn hóa và truyền thống dân tộc Việt Nam"
    },
    {
      icon: <TeamOutlined style={{ fontSize: "32px", color: "var(--wood-brown)" }} />,
      title: "Cộng đồng yêu sử",
      description: "Kết nối với những người yêu thích lịch sử và văn hóa"
    }
  ]

  const stats = [
    { title: "Năm lịch sử", value: "938", icon: <HistoryOutlined />, color: "var(--red-earth)" },
    { title: "Di tích", value: "50+", icon: <EnvironmentOutlined />, color: "var(--bronze-gold)" },
    { title: "Hiện vật", value: "200+", icon: <CrownOutlined />, color: "var(--deep-blue)" },
    { title: "Khách tham quan", value: "100K+", icon: <TeamOutlined />, color: "var(--wood-brown)" },
  ]

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "100px 0" }}>
        <Spin size="large" />
        <div style={{ marginTop: "var(--spacing-md)" }}>
          <Text className="text-historical">Đang tải dữ liệu lịch sử...</Text>
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
    <div style={{ background: "var(--ivory-cream)" }}>
      {/* Hero Section */}
      <div style={{ 
        background: `linear-gradient(135deg, var(--deep-blue) 0%, var(--red-earth) 100%)`,
        minHeight: "700px",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Water Wave Pattern */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 20\"><path d=\"M0,15 Q25,5 50,15 T100,15 L100,20 L0,20 Z\" fill=\"%23C9A44D\" opacity=\"0.1\"/><path d=\"M0,18 Q25,8 50,18 T100,18 L100,20 L0,20 Z\" fill=\"%23C9A44D\" opacity=\"0.05\"/></svg>')",
          opacity: 0.4,
        }} />
        
        {/* Wooden Stakes Pattern */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "100px",
          background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><rect x=\"10\" y=\"20\" width=\"3\" height=\"60\" fill=\"%235B3A29\" opacity=\"0.3\"/><rect x=\"30\" y=\"10\" width=\"3\" height=\"70\" fill=\"%235B3A29\" opacity=\"0.3\"/><rect x=\"50\" y=\"25\" width=\"3\" height=\"55\" fill=\"%235B3A29\" opacity=\"0.3\"/><rect x=\"70\" y=\"15\" width=\"3\" height=\"65\" fill=\"%235B3A29\" opacity=\"0.3\"/><rect x=\"90\" y=\"30\" width=\"3\" height=\"50\" fill=\"%235B3A29\" opacity=\"0.3\"/></svg>')",
          opacity: 0.2,
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
              <div style={{ color: "var(--ivory-cream)" }}>
                <Title 
                  level={1} 
                  className="heading-hero"
                  style={{ 
                    color: "var(--ivory-cream)", 
                    fontSize: "52px",
                    fontWeight: "700",
                    marginBottom: "var(--spacing-md)",
                    lineHeight: "1.2",
                    fontFamily: "var(--font-hero)",
                    textShadow: "3px 3px 6px rgba(0,0,0,0.5)",
                  }}
                >
                  {heroSlides[currentSlide].title}
                </Title>
                <Title 
                  level={3} 
                  style={{ 
                    color: "var(--bronze-gold)", 
                    fontSize: "26px",
                    fontWeight: "400",
                    marginBottom: "var(--spacing-md)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {heroSlides[currentSlide].subtitle}
                </Title>
                <Paragraph 
                  style={{ 
                    color: "rgba(249, 246, 236, 0.9)", 
                    fontSize: "20px",
                    marginBottom: "var(--spacing-xl)",
                    lineHeight: "1.6",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {heroSlides[currentSlide].description}
                </Paragraph>
                <Space size="large">
                  <Button
                    className="btn-bachdang"
                    size="large"
                    style={{
                      background: heroSlides[currentSlide].buttonColor,
                      border: "none",
                      borderRadius: "var(--radius-md)",
                      height: "52px",
                      padding: "0 var(--spacing-xl)",
                      fontSize: "18px",
                      fontWeight: "600",
                      fontFamily: "var(--font-body)",
                    }}
                    icon={<ArrowRightOutlined />}
                  >
                    {heroSlides[currentSlide].buttonText}
                  </Button>
                  <Button
                    className="btn-bachdang-secondary"
                    size="large"
                    style={{
                      background: "rgba(249, 246, 236, 0.1)",
                      border: "1px solid var(--bronze-gold)",
                      color: "var(--ivory-cream)",
                      borderRadius: "var(--radius-md)",
                      height: "52px",
                      padding: "0 var(--spacing-xl)",
                      fontSize: "18px",
                      fontWeight: "600",
                      fontFamily: "var(--font-body)",
                    }}
                    icon={<PlayCircleOutlined />}
                  >
                    Xem phim tài liệu
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
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                    maxWidth: "100%",
                    height: "auto",
                    border: "4px solid var(--bronze-gold)",
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
                background: index === currentSlide ? "var(--bronze-gold)" : "rgba(249, 246, 236, 0.3)",
                border: "none",
                width: "14px",
                height: "14px",
                minWidth: "14px",
              }}
            />
          ))}
        </div>
      </div>

      {/* Heritage Items Section */}
      <div style={{ padding: "80px 0", background: "var(--water-white)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 var(--spacing-lg)" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <Title level={2} className="heading-bachdang" style={{ marginBottom: "var(--spacing-md)" }}>
              Di sản văn hóa Bạch Đằng Giang
            </Title>
            <Paragraph style={{ fontSize: "20px", color: "var(--wood-brown)", maxWidth: "700px", margin: "0 auto", fontFamily: "var(--font-body)" }}>
              Những hiện vật và di tích lịch sử quý giá, chứng tích của chiến thắng oai hùng năm 938
            </Paragraph>
          </div>
          
          <Row gutter={[32, 32]}>
            {heritageItems.map((item, index) => (
              <Col xs={24} sm={8} key={index}>
                <Card
                  style={{
                    textAlign: "center",
                    height: "100%",
                    background: "var(--ivory-cream)",
                    border: "2px solid var(--bronze-gold)",
                    borderRadius: "var(--radius-md)",
                    boxShadow: "0 8px 25px rgba(201, 164, 77, 0.2)",
                    transition: "all 0.3s ease",
                  }}
                  hoverable
                >
                  <div style={{ marginBottom: "var(--spacing-md)" }}>
                    {item.icon}
                  </div>
                  <Title level={4} className="text-historical" style={{ marginBottom: "var(--spacing-sm)", fontFamily: "var(--font-heading)" }}>
                    {item.title}
                  </Title>
                  <Paragraph style={{ color: "var(--medium-stone)", margin: 0, fontFamily: "var(--font-body)" }}>
                    {item.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: "80px 0", background: "var(--ivory-cream)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 var(--spacing-lg)" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <Title level={2} className="heading-bachdang" style={{ marginBottom: "var(--spacing-md)" }}>
              Tại sao chọn Bạch Đằng Giang?
            </Title>
            <Paragraph style={{ fontSize: "20px", color: "var(--wood-brown)", maxWidth: "700px", margin: "0 auto", fontFamily: "var(--font-body)" }}>
              Khám phá những giá trị lịch sử và văn hóa vô giá của dân tộc Việt Nam
            </Paragraph>
          </div>
          
          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <Card
                  style={{
                    textAlign: "center",
                    height: "100%",
                    background: "var(--ivory-cream)",
                    border: "2px solid var(--bronze-gold)",
                    borderRadius: "var(--radius-md)",
                    boxShadow: "0 8px 25px rgba(201, 164, 77, 0.2)",
                    transition: "all 0.3s ease",
                  }}
                  hoverable
                >
                  <div style={{ marginBottom: "var(--spacing-md)" }}>
                    {feature.icon}
                  </div>
                  <Title level={4} className="text-historical" style={{ marginBottom: "var(--spacing-sm)", fontFamily: "var(--font-heading)" }}>
                    {feature.title}
                  </Title>
                  <Paragraph style={{ color: "var(--medium-stone)", margin: 0, fontFamily: "var(--font-body)" }}>
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
        background: `linear-gradient(135deg, var(--wood-brown) 0%, var(--deep-blue) 100%)`,
        color: "var(--ivory-cream)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 var(--spacing-lg)" }}>
          <Row gutter={[32, 32]}>
            {stats.map((stat, index) => (
              <Col xs={12} sm={6} key={index}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ 
                    fontSize: "52px", 
                    marginBottom: "var(--spacing-md)",
                    color: stat.color,
                  }}>
                    {stat.icon}
                  </div>
                  <Statistic
                    value={stat.value}
                    valueStyle={{ 
                      color: "var(--bronze-gold)", 
                      fontSize: "36px", 
                      fontWeight: "700",
                      fontFamily: "var(--font-hero)",
                    }}
                  />
                  <Text style={{ color: "rgba(249, 246, 236, 0.9)", fontSize: "18px", fontFamily: "var(--font-body)" }}>
                    {stat.title}
                  </Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Featured Products */}
      <div style={{ padding: "80px 0", background: "var(--water-white)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 var(--spacing-lg)" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <Title level={2} className="heading-bachdang" style={{ marginBottom: "var(--spacing-md)" }}>
              Sản phẩm lưu niệm
            </Title>
            <Paragraph style={{ fontSize: "20px", color: "var(--wood-brown)", maxWidth: "700px", margin: "0 auto", fontFamily: "var(--font-body)" }}>
              Những món quà lưu niệm đặc biệt mang đậm dấu ấn lịch sử Bạch Đằng Giang
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {Array.isArray(products) && products.slice(0, 8).map((product) => (
              <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
                <ProductCard product={product} onAddToCart={() => handleAddToCart(product)} />
              </Col>
            ))}
          </Row>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Button
              className="btn-bachdang"
              size="large"
              style={{
                background: "linear-gradient(135deg, var(--bronze-gold), var(--ancient-gold))",
                border: "none",
                borderRadius: "var(--radius-md)",
                height: "52px",
                padding: "0 var(--spacing-xl)",
                fontSize: "18px",
                fontWeight: "600",
                fontFamily: "var(--font-body)",
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
        background: `linear-gradient(135deg, var(--bronze-gold) 0%, var(--ancient-gold) 100%)`,
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 var(--spacing-lg)", textAlign: "center" }}>
          <Title level={2} className="heading-bachdang" style={{ marginBottom: "var(--spacing-md)", color: "var(--charcoal-dark)" }}>
            Đăng ký nhận tin tức
          </Title>
          <Paragraph style={{ fontSize: "20px", color: "var(--wood-brown)", marginBottom: "var(--spacing-xl)", fontFamily: "var(--font-body)" }}>
            Nhận thông tin về các sự kiện lịch sử và hoạt động văn hóa
          </Paragraph>
          
          <Space.Compact style={{ width: "100%", maxWidth: "400px" }}>
            <input
              placeholder="Nhập email của bạn"
              style={{
                flex: 1,
                padding: "var(--spacing-md)",
                border: "2px solid var(--wood-brown)",
                borderRadius: "var(--radius-md) 0 0 var(--radius-md)",
                outline: "none",
                fontSize: "16px",
                background: "var(--ivory-cream)",
                color: "var(--charcoal-dark)",
                fontFamily: "var(--font-body)",
              }}
            />
            <Button
              className="btn-bachdang"
              style={{
                background: "var(--red-earth)",
                border: "none",
                borderRadius: "0 var(--radius-md) var(--radius-md) 0",
                padding: "0 var(--spacing-lg)",
                fontSize: "16px",
                fontWeight: "600",
                color: "var(--ivory-cream)",
                fontFamily: "var(--font-body)",
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

export default HomePageBachDang

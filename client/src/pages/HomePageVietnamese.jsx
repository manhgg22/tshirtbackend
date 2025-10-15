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
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchProducts } from "../redux/productSlice"
import { addItem } from "../redux/cartSlice"
import ProductCardVietnamese from "../components/ProductCardVietnamese"
import "./HomePageVietnamese.css"

const { Title, Paragraph, Text } = Typography

const HomePageVietnamese = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { products, loading, error } = useSelector((state) => state.products)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [visibleStats, setVisibleStats] = useState(false)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  // Auto-play hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(timer)
  }, [currentSlide])

  // Stats visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleStats(true)
        }
      },
      { threshold: 0.3 }
    )

    const statsElement = document.getElementById('stats-section')
    if (statsElement) {
      observer.observe(statsElement)
    }

    return () => {
      if (statsElement) {
        observer.unobserve(statsElement)
      }
    }
  }, [])

  const handleAddToCart = (product) => {
    dispatch(addItem({ 
      product, 
      quantity: 1,
      size: product.sizes?.[0] || 'M',
      color: product.colors?.[0] || 'Trắng'
    }))
  }

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setTimeout(() => setIsAnimating(false), 600)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setTimeout(() => setIsAnimating(false), 600)
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
    { title: "Khách hàng hài lòng", value: 50000, suffix: "K+", icon: <HeartOutlined />, color: "var(--red-son)" },
    { title: "Sản phẩm đã bán", value: 100000, suffix: "K+", icon: <ShoppingCartOutlined />, color: "var(--gold-copper)" },
    { title: "Năm kinh nghiệm", value: 5, suffix: "+", icon: <TrophyOutlined />, color: "var(--jade-green)" },
    { title: "Tỷ lệ đánh giá 5 sao", value: 98, suffix: "%", icon: <StarFilled />, color: "var(--mahogany-brown)" },
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

  // Simple CountUp Component
  const CountUpNumber = ({ end, suffix, duration = 2000 }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (!visibleStats) return

      let startTime
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(step)
        }
      }
      requestAnimationFrame(step)
    }, [visibleStats, end, duration])

    return <span>{count}{suffix}</span>
  }

  if (loading) {
    return (
      <div className="loading-container">
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
    <div className="homepage-vietnamese">
      {/* Hero Section with Slider */}
      <div className="hero-section-home">
        {/* Animated Pattern Background */}
        <div className="hero-pattern-animated" />
        
        {/* Particles Effect */}
        <div className="particles-container">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>

        <div className="hero-content-wrapper">
          <Row align="middle" gutter={[48, 48]}>
            <Col xs={24} lg={12}>
              <div className={`hero-text ${isAnimating ? 'fade-out' : 'fade-in'}`}>
                <Title 
                  level={1} 
                  className="hero-title-animated"
                >
                  {heroSlides[currentSlide].title}
                </Title>
                <Title 
                  level={3} 
                  className="hero-subtitle-animated"
                >
                  {heroSlides[currentSlide].subtitle}
                </Title>
                <Paragraph className="hero-description-animated">
                  {heroSlides[currentSlide].description}
                </Paragraph>
                <Space size="large" className="hero-buttons">
                  <Button
                    className="btn-vietnamese-primary"
                    size="large"
                    icon={<ArrowRightOutlined />}
                    onClick={() => navigate('/products')}
                  >
                    {heroSlides[currentSlide].buttonText}
                  </Button>
                  <Button
                    className="btn-vietnamese-ghost"
                    size="large"
                    icon={<PlayCircleOutlined />}
                  >
                    Xem video
                  </Button>
                </Space>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className={`hero-image-wrapper ${isAnimating ? 'zoom-out' : 'zoom-in'}`}>
                <Image
                  src={heroSlides[currentSlide].image}
                  className="hero-image"
                  preview={false}
                />
              </div>
            </Col>
          </Row>
        </div>

        {/* Navigation Arrows */}
        <Button
          className="hero-nav-btn hero-nav-prev"
          shape="circle"
          icon={<LeftOutlined />}
          onClick={prevSlide}
        />
        <Button
          className="hero-nav-btn hero-nav-next"
          shape="circle"
          icon={<RightOutlined />}
          onClick={nextSlide}
        />

        {/* Slide Indicators */}
        <div className="hero-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`hero-indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true)
                  setCurrentSlide(index)
                  setTimeout(() => setIsAnimating(false), 600)
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Cultural Features Section */}
      <div className="cultural-section scroll-fade-in">
        <div className="container-standard">
          <div className="section-header">
            <Title level={2} className="heading-vietnamese section-title">
              Giá trị truyền thống Việt Nam
            </Title>
            <Paragraph className="section-description">
              Chúng tôi tự hào mang đến những sản phẩm thể hiện tinh thần và văn hóa Việt Nam
            </Paragraph>
          </div>
          
          <Row gutter={[32, 32]}>
            {culturalElements.map((element, index) => (
              <Col xs={24} sm={8} key={index}>
                <Card
                  className={`cultural-card scroll-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="cultural-icon icon-bounce">
                    {element.icon}
                  </div>
                  <Title level={4} className="cultural-title">
                    {element.title}
                  </Title>
                  <Paragraph className="cultural-description">
                    {element.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="container-standard">
          <div className="section-header">
            <Title level={2} className="heading-vietnamese section-title">
              Tại sao chọn Inkverse?
            </Title>
            <Paragraph className="section-description">
              Chúng tôi cam kết mang đến những sản phẩm chất lượng cao với dịch vụ tốt nhất
            </Paragraph>
          </div>
          
          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <Card
                  className={`feature-card scroll-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="feature-icon icon-float">
                    {feature.icon}
                  </div>
                  <Title level={4} className="feature-title">
                    {feature.title}
                  </Title>
                  <Paragraph className="feature-description">
                    {feature.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Stats Section */}
      <div id="stats-section" className="stats-section">
        <div className="container-standard">
          <Row gutter={[32, 32]}>
            {stats.map((stat, index) => (
              <Col xs={12} sm={6} key={index}>
                <div className={`stat-card ${visibleStats ? 'visible' : ''}`}
                     style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="stat-icon icon-pulse" style={{ color: stat.color }}>
                    {stat.icon}
                  </div>
                  <div className="stat-value">
                    <CountUpNumber end={stat.value} suffix={stat.suffix} />
                  </div>
                  <Text className="stat-title">
                    {stat.title}
                  </Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Featured Products */}
      <div className="products-section">
        <div className="container-standard">
          <div className="section-header">
            <Title level={2} className="heading-vietnamese section-title">
              Sản phẩm nổi bật
            </Title>
            <Paragraph className="section-description">
              Khám phá những sản phẩm được yêu thích nhất từ bộ sưu tập của chúng tôi
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {loading && <Col span={24}><Spin size="large" /></Col>}
            {error && <Col span={24}><Alert message={error} type="error" /></Col>}
            {Array.isArray(products) && products.length > 0 ? (
              products.slice(0, 8).map((product, index) => (
                <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
                  <div
                    className="product-card-wrapper scroll-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <ProductCardVietnamese 
                      product={product} 
                      onAddToCart={() => handleAddToCart(product)} 
                    />
                  </div>
                </Col>
              ))
            ) : (
              !loading && !error && (
                <Col span={24}>
                  <Alert 
                    message="Không có sản phẩm nào" 
                    description="Vui lòng kiểm tra kết nối hoặc thử lại sau"
                    type="warning"
                  />
                </Col>
              )
            )}
          </Row>

          <div className="products-cta">
            <Button
              className="btn-vietnamese-large"
              size="large"
              icon={<ArrowRightOutlined />}
              onClick={() => navigate('/products')}
            >
              Xem tất cả sản phẩm
            </Button>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="container-narrow">
          <div className="newsletter-content scroll-fade-in">
            <Title level={2} className="newsletter-title">
              Đăng ký nhận tin tức
            </Title>
            <Paragraph className="newsletter-description">
              Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt
            </Paragraph>
            
            <div className="newsletter-form">
              <input
                className="newsletter-input"
                placeholder="Nhập email của bạn"
              />
              <Button className="newsletter-button">
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePageVietnamese

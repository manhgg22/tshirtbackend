import React, { useEffect, useState } from "react"
import { Typography, Row, Col, Spin, Alert, Card, Button, Space, Image, Statistic, Divider, message, Modal, Rate } from "antd"
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
  CoffeeOutlined,
  FlagOutlined,
  HomeOutlined,
  HistoryOutlined,
  GlobalOutlined,
  GiftOutlined,
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
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

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
      product: {
        _id: product._id || product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images?.[0]?.url || product.image || '/images/placeholder.png',
        images: product.images,
        description: product.description,
        shortDescription: product.shortDescription,
        category: product.category,
        brand: product.brand,
        sizes: product.sizes || ['M'],
        colors: product.colors || ['Trắng'],
        inStock: product.inStock !== false,
        rating: product.rating,
        sales: product.sales
      },
      quantity: 1,
      size: product.sizes?.[0] || 'M',
      color: product.colors?.[0] || 'Trắng'
    }));
    message.success(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

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
      title: "Vietnam Heritage Collection",
      subtitle: "Bộ sưu tập tôn vinh văn hóa Việt Nam",
      description: "Khám phá bộ sưu tập áo thun và polo đặc biệt với thiết kế thể hiện tinh thần dân tộc, văn hóa truyền thống và lịch sử vẻ vang của Việt Nam",
      image: "/images/aothuntest/aothun1.webp",
      buttonText: "Khám phá bộ sưu tập",
      buttonColor: "#C1121F",
      culturalElement: "lotus",
      gradient: "linear-gradient(135deg, #C1121F 0%, #8B0000 100%)"
    },
    {
      title: "Cà Phê Việt Nam",
      subtitle: "Thiết kế vintage độc đáo",
      description: "Áo thun Cà phê Việt với hình ảnh vintage café và slogan \"Cà phê Việt\" - tôn vinh văn hóa cà phê đặc sắc của Việt Nam",
      image: "/images/aothuntest/aothun2.webp",
      buttonText: "Xem sản phẩm",
      buttonColor: "#FFD700",
      culturalElement: "coffee",
      gradient: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)"
    },
    {
      title: "Tinh Thần Dân Tộc",
      subtitle: "Độc lập - Tự do - Hạnh phúc",
      description: "Áo thun Phở Việt Nam với khẩu hiệu quốc gia, thể hiện niềm tự hào và tinh thần đoàn kết của dân tộc Việt Nam",
      image: "/images/aothuntest/aothun3.webp",
      buttonText: "Mua ngay",
      buttonColor: "#003DA5",
      culturalElement: "flag",
      gradient: "linear-gradient(135deg, #003DA5 0%, #001F5C 100%)"
    }
  ]

  const features = [
    {
      icon: <TruckOutlined style={{ fontSize: "32px", color: "#52C41A" }} />,
      title: "Giao hàng nhanh",
      description: "Miễn phí giao hàng trong 24h tại TP.HCM",
      color: "#52C41A"
    },
    {
      icon: <SafetyOutlined style={{ fontSize: "32px", color: "#FFD700" }} />,
      title: "Bảo hành chất lượng",
      description: "Đổi trả miễn phí trong 30 ngày",
      color: "#FFD700"
    },
    {
      icon: <CustomerServiceOutlined style={{ fontSize: "32px", color: "#C1121F" }} />,
      title: "Hỗ trợ 24/7",
      description: "Đội ngũ CSKH chuyên nghiệp",
      color: "#C1121F"
    },
    {
      icon: <CheckCircleOutlined style={{ fontSize: "32px", color: "#003DA5" }} />,
      title: "Sản phẩm chính hãng",
      description: "Cam kết chất lượng 100%",
      color: "#003DA5"
    }
  ]

  const stats = [
    { title: "Khách hàng hài lòng", value: 50000, suffix: "K+", icon: <HeartOutlined />, color: "#C1121F" },
    { title: "Sản phẩm đã bán", value: 100000, suffix: "K+", icon: <ShoppingCartOutlined />, color: "#FFD700" },
    { title: "Năm kinh nghiệm", value: 5, suffix: "+", icon: <TrophyOutlined />, color: "#52C41A" },
    { title: "Tỷ lệ đánh giá 5 sao", value: 98, suffix: "%", icon: <StarFilled />, color: "#003DA5" },
  ]

  const culturalElements = [
    {
      icon: <CoffeeOutlined style={{ fontSize: "24px", color: "#C1121F" }} />,
      title: "Di sản văn hóa",
      description: "Tôn vinh những giá trị văn hóa đặc sắc từ cà phê Việt đến phố cổ Hà Nội",
      color: "#C1121F"
    },
    {
      icon: <FlagOutlined style={{ fontSize: "24px", color: "#FFD700" }} />,
      title: "Tinh thần dân tộc",
      description: "Thể hiện niềm tự hào và tinh thần đoàn kết qua thiết kế đặc biệt",
      color: "#FFD700"
    },
    {
      icon: <HistoryOutlined style={{ fontSize: "24px", color: "#003DA5" }} />,
      title: "Chất lượng cao cấp",
      description: "Cotton 100% nhập khẩu với thiết kế tinh tế và bền đẹp",
      color: "#003DA5"
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
              Vietnam Heritage Collection
            </Title>
            <Paragraph className="section-description">
              Bộ sưu tập đặc biệt tôn vinh văn hóa, lịch sử và truyền thống Việt Nam qua thiết kế thời trang hiện đại
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
              Bộ sưu tập nổi bật
            </Title>
            <Paragraph className="section-description">
              Khám phá những sản phẩm đặc biệt từ Vietnam Heritage Collection
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
                      onQuickView={handleQuickView}
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

      {/* Quick View Modal */}
      <Modal
        title={selectedProduct?.name || 'Chi tiết sản phẩm'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
        className="quick-view-modal"
        style={{
          backgroundColor: 'white',
          borderRadius: '16px'
        }}
        bodyStyle={{
          backgroundColor: 'white',
          padding: '24px'
        }}
        maskStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      >
        {selectedProduct && (
          <div style={{ display: 'flex', gap: '20px', backgroundColor: 'white' }}>
            <div style={{ flex: 1 }}>
              <Image
                src={selectedProduct.images?.[0]?.url || selectedProduct.image || '/images/placeholder.png'}
                alt={selectedProduct.name}
                style={{ width: '100%', borderRadius: '8px', backgroundColor: 'white' }}
              />
            </div>
            <div style={{ flex: 1, backgroundColor: 'white' }}>
              <Typography.Title level={3} style={{ color: '#2C2C2C' }}>{selectedProduct.name}</Typography.Title>
              <Typography.Paragraph style={{ color: '#6B6B6B' }}>{selectedProduct.description}</Typography.Paragraph>
              
              <div style={{ marginBottom: '16px' }}>
                <Typography.Text strong style={{ fontSize: '24px', color: '#C1121F' }}>
                  {selectedProduct.price?.toLocaleString('vi-VN')}₫
                </Typography.Text>
                {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                  <Typography.Text delete style={{ marginLeft: '8px', color: '#999' }}>
                    {selectedProduct.originalPrice.toLocaleString('vi-VN')}₫
                  </Typography.Text>
                )}
              </div>

              {selectedProduct.rating && (
                <div style={{ marginBottom: '16px' }}>
                  <Rate disabled value={selectedProduct.rating.average} />
                  <Typography.Text style={{ marginLeft: '8px' }}>
                    ({selectedProduct.rating.count} đánh giá)
                  </Typography.Text>
                </div>
              )}

              <Space>
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    setModalVisible(false);
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #C1121F, #8B0000)',
                    border: 'none',
                    height: '48px',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  Thêm vào giỏ
                </Button>
                <Button
                  onClick={() => {
                    setModalVisible(false);
                    navigate(`/product/${selectedProduct._id || selectedProduct.id}`);
                  }}
                  style={{
                    height: '48px',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  Xem chi tiết
                </Button>
              </Space>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default HomePageVietnamese

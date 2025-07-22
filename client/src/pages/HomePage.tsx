"use client"

import type React from "react"
import { useEffect } from "react"
import { Typography, Row, Col, Spin, Alert, Carousel, Card, Button, Divider, Space, Badge, Image } from "antd"
import {
  ShoppingCartOutlined,
  StarFilled,
  FireOutlined,
  TrophyOutlined,
  HeartOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"
import { fetchProducts } from "../redux/productSlice"
import { addItem } from "../redux/cartSlice"
import ProductCard from "../components/ProductCard"
import type { Product } from "../types" // Đảm bảo import đúng Product từ types.ts

const { Title, Paragraph, Text } = Typography
const { Meta } = Card

// Sample Vietnamese products data for featured section
// Đảm bảo các thuộc tính rating, sold, category, inStock khớp với Product interface trong types.ts
const featuredProducts: Product[] = [
  {
    _id: "1",
    name: "Áo thun Tự hào Việt Nam",
    price: 299000,
    image: "/images/aothuntest/aothun1.webp",
    description: "Áo thun cotton cao cấp với thiết kế cờ đỏ sao vàng hiện đại",
    category: "T-Shirt",
    rating: 4.8,
    sold: 1250,
    inStock: true,
  },
  {
    _id: "2",
    name: "Áo polo Hà Nội phố cổ",
    price: 450000,
    image: "/images/aothuntest/aothun2.webp",
    description: "Polo premium in hình phố cổ Hà Nội vintage",
    category: "Polo",
    rating: 4.9,
    sold: 890,
    inStock: true,
  },
  {
    _id: "3",
    name: "Hoodie Sài Gòn về đêm",
    price: 599000,
    image: "/images/aothuntest/aothun3.webp",
    description: "Hoodie unisex với họa tiết skyline Sài Gòn lung linh",
    category: "Hoodie",
    rating: 4.7,
    sold: 675,
    inStock: true,
  },
  {
    _id: "4",
    name: "Áo tank top Hạ Long Bay",
    price: 199000,
    image: "/images/aothuntest/aothun4.webp",
    description: "Tank top thể thao với art vịnh Hạ Long tuyệt đẹp",
    category: "Tank Top",
    rating: 4.6,
    sold: 432,
    inStock: true,
  },
  {
    _id: "5",
    name: "Áo thun Phở Việt Nam",
    price: 279000,
    image: "/images/aothuntest/aothun5.webp",
    description: "Design độc đáo về món phở truyền thống Việt Nam",
    category: "T-Shirt",
    rating: 4.8,
    sold: 1100,
    inStock: true,
  },
  {
    _id: "6",
    name: "Áo sweatshirt Cà phê Việt",
    price: 520000,
    image: "/images/aothuntest/aothun6.webp",
    description: "Sweatshirt cao cấp tribute to Vietnamese coffee culture",
    category: "Sweatshirt",
    rating: 4.9,
    sold: 756,
    inStock: true,
  },
]

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { products, loading, error } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const carouselContentStyle: React.CSSProperties = {
    height: "500px",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    borderRadius: "12px",
  }
  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: "12px",
  }

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>
          <Text>Đang tải sản phẩm...</Text>
        </div>
      </div>
    )

  if (error)
    return (
      <div style={{ padding: "20px" }}>
        <Alert type="error" message="Đã xảy ra lỗi khi tải sản phẩm." description={error} />
      </div>
    )

  return (
    <div style={{ minHeight: "100vh", background: "#fafafa" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>
        {/* Hero Carousel */}
        <Carousel
          autoplay
          effect="fade"
          dots={{ className: "custom-dots" }}
          style={{
            marginBottom: "64px",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          }}
        >
          <div>
            <div
              style={{
                ...carouselContentStyle,
                backgroundImage: `url('/images/tshirt-left.png')`,
              }}
            >
              <div style={overlayStyle} />
              <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                <Title
                  level={1}
                  style={{
                    color: "#fff",
                    margin: 0,
                    fontSize: "3.5em",
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  🇻🇳 Tự hào Việt Nam
                </Title>
                <Paragraph
                  style={{
                    color: "#fff",
                    fontSize: "1.4em",
                    maxWidth: 600,
                    margin: "16px auto",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                  }}
                >
                  Thể hiện tinh thần dân tộc qua từng thiết kế độc đáo và ý nghĩa
                </Paragraph>
                <Button
                  type="primary"
                  size="large"
                  style={{
                    marginTop: 24,
                    height: 48,
                    fontSize: "1.1em",
                    background: "#E4002B",
                    borderColor: "#E4002B",
                  }}
                >
                  Khám phá ngay <ThunderboltOutlined />
                </Button>
              </div>
            </div>
          </div>
          <div>
            <div
              style={{
                ...carouselContentStyle,
                backgroundImage: `url('/images/tshirt-real.png')`,
              }}
            >
              <div style={overlayStyle} />
              <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                <Title
                  level={1}
                  style={{
                    color: "#fff",
                    margin: 0,
                    fontSize: "3.5em",
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  ✨ Chất lượng Premium
                </Title>
                <Paragraph
                  style={{
                    color: "#fff",
                    fontSize: "1.4em",
                    maxWidth: 600,
                    margin: "16px auto",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                  }}
                >
                  Chất liệu cao cấp, bền đẹp theo thời gian, thoải mái mọi hoạt động
                </Paragraph>
                <Button
                  type="primary"
                  size="large"
                  style={{
                    marginTop: 24,
                    height: 48,
                    fontSize: "1.1em",
                    background: "#00563F",
                    borderColor: "#00563F",
                  }}
                >
                  Xem bộ sưu tập <StarFilled />
                </Button>
              </div>
            </div>
          </div>
          <div>
            <div
              style={{
                ...carouselContentStyle,
                backgroundImage: `url('/images/tshirt-right.png')`,
              }}
            >
              <div style={overlayStyle} />
              <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                <Title
                  level={1}
                  style={{
                    color: "#fff",
                    margin: 0,
                    fontSize: "3.5em",
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  🎨 Thiết kế riêng
                </Title>
                <Paragraph
                  style={{
                    color: "#fff",
                    fontSize: "1.4em",
                    maxWidth: 600,
                    margin: "16px auto",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                  }}
                >
                  Tạo phong cách cá nhân với công cụ thiết kế trực tuyến dễ dàng
                </Paragraph>
                <Button
                  type="primary"
                  size="large"
                  style={{
                    marginTop: 24,
                    height: 48,
                    fontSize: "1.1em",
                    background: "#003366",
                    borderColor: "#003366",
                  }}
                >
                  Bắt đầu thiết kế <FireOutlined />
                </Button>
              </div>
            </div>
          </div>
        </Carousel>
        {/* Stats Section */}
        <Row gutter={[32, 32]} style={{ marginBottom: "64px", textAlign: "center" }}>
          <Col xs={24} sm={6}>
            <Card style={{ borderRadius: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
              <TrophyOutlined style={{ fontSize: "3em", color: "#FFD700", marginBottom: 8 }} />
              <Title level={3} style={{ margin: "8px 0", color: "#333" }}>
                50K+
              </Title>
              <Text style={{ color: "#666" }}>Khách hàng tin tưởng</Text>
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card style={{ borderRadius: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
              <StarFilled style={{ fontSize: "3em", color: "#FF6B35", marginBottom: 8 }} />
              <Title level={3} style={{ margin: "8px 0", color: "#333" }}>
                4.9★
              </Title>
              <Text style={{ color: "#666" }}>Đánh giá trung bình</Text>
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card style={{ borderRadius: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
              <ThunderboltOutlined style={{ fontSize: "3em", color: "#1890FF", marginBottom: 8 }} />
              <Title level={3} style={{ margin: "8px 0", color: "#333" }}>
                24h
              </Title>
              <Text style={{ color: "#666" }}>Giao hàng siêu tốc</Text>
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card style={{ borderRadius: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
              <HeartOutlined style={{ fontSize: "3em", color: "#E4002B", marginBottom: 8 }} />
              <Title level={3} style={{ margin: "8px 0", color: "#333" }}>
                100%
              </Title>
              <Text style={{ color: "#666" }}>Made in Vietnam</Text>
            </Card>
          </Col>
        </Row>
        {/* Featured Products Section */}
        <div
          style={{
            background: "#fff",
            padding: "48px 32px",
            borderRadius: 12,
            marginBottom: "64px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <Title level={2} style={{ color: "#333", fontSize: "2.5em" }}>
              <FireOutlined style={{ color: "#E4002B", marginRight: 16 }} />
              Sản phẩm bán chạy
            </Title>
            <Paragraph style={{ fontSize: "1.2em", color: "#666", maxWidth: 600, margin: "0 auto" }}>
              Những thiết kế được yêu thích nhất, thể hiện tinh thần Việt Nam đương đại
            </Paragraph>
          </div>

          <Row gutter={[24, 32]}>
            {featuredProducts.map((product, index) => (
              <Col xs={24} sm={12} lg={8} key={product._id}>
                <Badge.Ribbon
                  text={index < 2 ? "Bán chạy #1" : `Top ${index + 1}`}
                  color={index < 2 ? "#E4002B" : "#1890FF"}
                >
                  <Card
                    hoverable
                    style={{
                      borderRadius: 12,
                      overflow: "hidden",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                      transition: "all 0.3s ease",
                    }}
                    cover={
                      <div style={{ position: "relative", overflow: "hidden", height: 280 }}>
                        <Image
                          alt={product.name}
                          src={product.image || "/placeholder.svg"}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          preview={false}
                          fallback="/images/logo192.png" // Fallback for local images
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            background: "rgba(255,255,255,0.9)",
                            padding: "4px 8px",
                            borderRadius: 8,
                            backdropFilter: "blur(4px)",
                          }}
                        >
                          <StarFilled style={{ color: "#FFD700", fontSize: 12, marginRight: 4 }} />
                          <Text style={{ fontSize: 12, fontWeight: "bold" }}>{product.rating}</Text>
                        </div>
                      </div>
                    }
                    actions={[
                      <Button
                        key="addToCart"
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        onClick={() => dispatch(addItem({ product, quantity: 1 }))}
                        style={{
                          background: "#E4002B",
                          borderColor: "#E4002B",
                          fontWeight: "bold",
                        }}
                      >
                        Thêm vào giỏ
                      </Button>,
                    ]}
                  >
                    <Meta
                      title={
                        <div>
                          <Text strong style={{ fontSize: "1.1em" }}>
                            {product.name}
                          </Text>
                          <div style={{ marginTop: 8 }}>
                            <Text style={{ fontSize: "1.3em", color: "#E4002B", fontWeight: "bold" }}>
                              {product.price.toLocaleString("vi-VN")}đ
                            </Text>
                          </div>
                        </div>
                      }
                      description={
                        <div>
                          <Paragraph ellipsis={{ rows: 2 }} style={{ margin: "12px 0", color: "#666" }}>
                            {product.description}
                          </Paragraph>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: 12,
                            }}
                          >
                            <Text style={{ fontSize: 12, color: "#999" }}>Đã bán: {product.sold}</Text>
                            <Badge count={product.category} style={{ backgroundColor: "#f0f0f0", color: "#666" }} />
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </Badge.Ribbon>
              </Col>
            ))}
          </Row>
        </div>
        <Divider style={{ margin: "64px 0" }} />
        {/* All Products Section */}
        <div style={{ marginBottom: "64px" }}>
          <Title level={2} style={{ marginBottom: "32px", textAlign: "center", fontSize: "2.2em" }}>
            Tất cả sản phẩm
          </Title>
          <Row gutter={[24, 24]}>
            {products.map((product: Product) => (
              <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
                <ProductCard
                  product={product}
                  onAddToCart={() => dispatch(addItem({ product, quantity: 1 }))}
                />
              </Col>
            ))}
          </Row>
        </div>
        {/* Newsletter Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #E4002B 0%, #FF6B35 100%)",
            padding: "48px 32px",
            borderRadius: 12,
            marginBottom: "32px",
            boxShadow: "0 8px 32px rgba(228, 0, 43, 0.3)",
          }}
        >
          <Title level={2} style={{ color: "#fff", margin: "0 0 16px 0" }}>
            Đăng ký nhận tin mới nhất
          </Title>
          <Paragraph style={{ color: "#fff", fontSize: "1.1em", marginBottom: 24, opacity: 0.9 }}>
            Cập nhật sản phẩm mới, khuyến mãi đặc biệt và các bộ sưu tập limited
          </Paragraph>
          <Space.Compact style={{ maxWidth: 400 }}>
            <Button
              type="default"
              size="large"
              style={{
                background: "#fff",
                color: "#E4002B",
                fontWeight: "bold",
                border: "none",
              }}
            >
              Đăng ký ngay
            </Button>
          </Space.Compact>
        </div>
      </div>
    </div>
  )
}

export default HomePage

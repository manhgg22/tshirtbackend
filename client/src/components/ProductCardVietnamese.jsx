import React, { useState } from "react"
import { Card, Typography, Button, Image, Tooltip, Rate, Badge, Space } from "antd"
import { ShoppingCartOutlined, HeartOutlined, EyeOutlined, StarFilled, CrownOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"

const ProductCard = ({ product, onAddToCart, onQuickView }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()
  
  // Validate product object
  if (!product || typeof product !== 'object') {
    console.error('Invalid product object:', product)
    return <div>Invalid product data</div>
  }
  
  // Debug log
  console.log('🎯 ProductCard rendering:', product.name, product.category, product.description)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  return (
    <Card
      hoverable
      className="card-vietnamese"
      style={{ 
        width: "100%", 
        borderRadius: "var(--radius-md)", 
        overflow: "hidden",
        border: "1px solid var(--light-gold)",
        boxShadow: "var(--shadow-soft)",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        background: "var(--ivory-white)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      cover={
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Image
            alt={product.name || 'Product'}
            src={product.images?.[0]?.url ? `http://localhost:3000${product.images[0].url}` : (product.image ? `http://localhost:3000${product.image}` : '/images/placeholder.png')}
            style={{ 
              objectFit: "cover", 
              height: 300,
              transition: "transform 0.3s ease",
              transform: isHovered ? "scale(1.03)" : "scale(1)",
            }}
            preview={false}
          />
          
          {/* Overlay buttons */}
          <div style={{
            position: "absolute",
            top: "var(--spacing-md)",
            right: "var(--spacing-md)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-sm)",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}>
            <Tooltip title="Xem chi tiết">
              <Button
                type="primary"
                shape="circle"
                icon={<EyeOutlined />}
                onClick={() => navigate(`/product/${product._id || product.id}`)}
                style={{
                  background: "var(--ivory-white)",
                  border: "1px solid var(--light-gold)",
                  color: "var(--mahogany-brown)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "var(--shadow-soft)",
                }}
              />
            </Tooltip>
            <Tooltip title={isLiked ? "Bỏ yêu thích" : "Yêu thích"}>
              <Button
                type="primary"
                shape="circle"
                icon={<HeartOutlined />}
                onClick={() => setIsLiked(!isLiked)}
                style={{
                  background: isLiked ? "var(--red-son)" : "var(--ivory-white)",
                  border: "1px solid var(--light-gold)",
                  color: isLiked ? "var(--ivory-white)" : "var(--mahogany-brown)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "var(--shadow-soft)",
                }}
              />
            </Tooltip>
          </div>

          {/* Premium badge */}
          {product.premium && (
            <Badge
              count={
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "var(--spacing-xs)",
                  background: "linear-gradient(45deg, var(--gold-copper), var(--light-gold))",
                  color: "var(--charcoal)",
                  padding: "var(--spacing-xs) var(--spacing-sm)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "12px",
                  fontWeight: "600",
                }}>
                  <CrownOutlined />
                  Premium
                </div>
              }
              style={{
                position: "absolute",
                top: "var(--spacing-md)",
                left: "var(--spacing-md)",
              }}
            />
          )}

          {/* Sale badge */}
          {product.sale && (
            <Badge
              count={`-${product.sale}%`}
              style={{
                position: "absolute",
                top: "var(--spacing-md)",
                left: product.premium ? "80px" : "var(--spacing-md)",
                background: "linear-gradient(45deg, var(--red-son), var(--deep-red))",
                color: "var(--ivory-white)",
              }}
            />
          )}
        </div>
      }
      actions={[
        <Button
          className="btn-vietnamese"
          icon={<EyeOutlined />}
          onClick={() => onQuickView && onQuickView(product)}
          style={{
            background: "linear-gradient(135deg, var(--red-son), var(--deep-red))",
            border: "none",
            borderRadius: "var(--radius-md)",
            height: "44px",
            fontWeight: "600",
            width: "100%",
            color: "white",
            fontSize: "16px",
            marginBottom: "8px"
          }}
        >
          Xem nhanh
        </Button>,
        <Button
          className="btn-vietnamese"
          icon={<ShoppingCartOutlined />}
          onClick={onAddToCart}
          style={{
            background: "linear-gradient(135deg, var(--gold-copper), var(--light-gold))",
            border: "none",
            borderRadius: "var(--radius-md)",
            height: "44px",
            fontWeight: "600",
            width: "100%",
            color: "var(--charcoal)",
            fontSize: "16px",
          }}
        >
          Thêm vào giỏ
        </Button>,
      ]}
    >
      <div style={{ padding: "var(--spacing-lg) 0" }}>
        {/* Category */}
        <Typography.Text 
          className="text-traditional"
          style={{ 
            fontSize: "12px", 
            textTransform: "uppercase", 
            letterSpacing: "1px",
            fontWeight: "600",
            color: "var(--mahogany-brown)",
          }}
        >
          {typeof product.category === 'string' ? product.category : product.category?.name || 'Uncategorized'}
        </Typography.Text>

        {/* Product Name */}
        <Typography.Title 
          level={4} 
          className="heading-vietnamese"
          style={{ 
            margin: "var(--spacing-sm) 0 var(--spacing-md) 0", 
            fontSize: "18px",
            fontWeight: "600",
            lineHeight: "1.4",
            color: "var(--red-son)",
            fontFamily: "var(--font-heading)",
          }}
        >
          {product.name || 'Unnamed Product'}
        </Typography.Title>

        {/* Description */}
        <Typography.Paragraph 
          ellipsis={{ rows: 2 }} 
          style={{ 
            color: "var(--medium-gray)", 
            fontSize: "14px",
            marginBottom: "var(--spacing-md)",
            lineHeight: "1.6",
          }}
        >
          {typeof product.description === 'string' ? product.description : product.description?.short || 'No description available'}
        </Typography.Paragraph>

        {/* Rating */}
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "var(--spacing-sm)", 
          marginBottom: "var(--spacing-md)" 
        }}>
          <Rate 
            disabled 
            defaultValue={product.rating || 4.5} 
            style={{ 
              fontSize: "14px",
              color: "var(--gold-copper)",
            }}
          />
          <Typography.Text 
            className="text-traditional" 
            style={{ fontSize: "12px", fontWeight: "500" }}
          >
            ({product.reviewCount || 128})
          </Typography.Text>
        </div>

        {/* Price */}
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between" 
        }}>
          <div>
            <Typography.Title 
              level={3} 
              className="text-gold"
              style={{ 
                margin: 0, 
                fontSize: "22px",
                fontWeight: "700",
                color: "var(--gold-copper)",
              }}
            >
              {formatPrice(product.price)}
            </Typography.Title>
            {product.originalPrice && (
              <Typography.Text 
                delete 
                style={{ 
                  fontSize: "14px", 
                  color: "var(--medium-gray)",
                }}
              >
                {formatPrice(product.originalPrice)}
              </Typography.Text>
            )}
          </div>
          
          {/* Stock status */}
          <div style={{ textAlign: "right" }}>
            <Typography.Text 
              className={product.inStock ? "text-jade" : "text-traditional"}
              style={{ 
                fontSize: "12px", 
                fontWeight: "600",
                color: product.inStock ? "var(--jade-green)" : "var(--red-son)",
              }}
            >
              {product.inStock ? "Còn hàng" : "Hết hàng"}
            </Typography.Text>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ProductCard

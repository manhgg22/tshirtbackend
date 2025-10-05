import React, { useState } from "react"
import { Card, Typography, Button, Image, Tooltip, Rate, Badge, Space } from "antd"
import { ShoppingCartOutlined, HeartOutlined, EyeOutlined, StarFilled, CrownOutlined } from "@ant-design/icons"

const ProductCard = ({ product, onAddToCart }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

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
            alt={product.name}
            src={product.image || `https://via.placeholder.com/300x300/A61C1C/FAF4E1?text=${encodeURIComponent(product.name)}`}
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
                  gap: "4px",
                  background: "linear-gradient(45deg, var(--gold-copper), var(--light-gold))",
                  color: "var(--charcoal)",
                  padding: "4px 8px",
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
          {product.category}
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
          {product.name}
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
          {product.description}
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

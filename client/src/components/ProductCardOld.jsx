import React, { useState } from "react"
import { Card, Typography, Button, Image, Tooltip, Rate, Badge, Space } from "antd"
import { ShoppingCartOutlined, HeartOutlined, EyeOutlined, StarFilled } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate()
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
      style={{ 
        width: "100%", 
        borderRadius: 16, 
        overflow: "hidden",
        border: "none",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      cover={
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Image
            alt={product.name}
            src={product.image || `https://via.placeholder.com/300x300/dc2626/ffffff?text=${encodeURIComponent(product.name)}`}
            style={{ 
              objectFit: "cover", 
              height: 280,
              transition: "transform 0.3s ease",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
            preview={false}
          />
          
          {/* Overlay buttons */}
          <div style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}>
            <Tooltip title="Xem chi tiết">
              <Button
                type="primary"
                shape="circle"
                icon={<EyeOutlined />}
                style={{
                  background: "rgba(255,255,255,0.9)",
                  border: "none",
                  color: "#333",
                  backdropFilter: "blur(10px)",
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
                  background: isLiked ? "#ff4757" : "rgba(255,255,255,0.9)",
                  border: "none",
                  color: isLiked ? "#fff" : "#333",
                  backdropFilter: "blur(10px)",
                }}
              />
            </Tooltip>
          </div>

          {/* Sale badge */}
          {product.sale && (
            <Badge
              count={`-${product.sale}%`}
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                background: "linear-gradient(45deg, #ff6b6b, #ffd93d)",
              }}
            />
          )}
        </div>
      }
      actions={[
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          onClick={onAddToCart}
          style={{
            background: "linear-gradient(45deg, #667eea, #764ba2)",
            border: "none",
            borderRadius: "8px",
            height: "40px",
            fontWeight: "600",
            width: "100%",
          }}
        >
          Thêm vào giỏ
        </Button>,
      ]}
    >
      <div style={{ padding: "16px 0" }}>
        {/* Category */}
        <Typography.Text 
          type="secondary" 
          style={{ 
            fontSize: "12px", 
            textTransform: "uppercase", 
            letterSpacing: "1px",
            fontWeight: "600",
          }}
        >
          {product.category}
        </Typography.Text>

        {/* Product Name */}
        <Typography.Title 
          level={4} 
          style={{ 
            margin: "8px 0 12px 0", 
            fontSize: "16px",
            fontWeight: "600",
            lineHeight: "1.4",
          }}
        >
          {product.name}
        </Typography.Title>

        {/* Description */}
        <Typography.Paragraph 
          ellipsis={{ rows: 2 }} 
          style={{ 
            color: "#666", 
            fontSize: "14px",
            marginBottom: "16px",
            lineHeight: "1.5",
          }}
        >
          {product.description}
        </Typography.Paragraph>

        {/* Rating */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <Rate 
            disabled 
            defaultValue={product.rating || 4.5} 
            style={{ fontSize: "14px" }}
          />
          <Typography.Text type="secondary" style={{ fontSize: "12px" }}>
            ({product.reviewCount || 128})
          </Typography.Text>
        </div>

        {/* Price */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <Typography.Title 
              level={3} 
              style={{ 
                margin: 0, 
                color: "#2c3e50",
                fontSize: "20px",
                fontWeight: "700",
              }}
            >
              {formatPrice(product.price)}
            </Typography.Title>
            {product.originalPrice && (
              <Typography.Text 
                delete 
                type="secondary" 
                style={{ fontSize: "14px" }}
              >
                {formatPrice(product.originalPrice)}
              </Typography.Text>
            )}
          </div>
          
          {/* Stock status */}
          <div style={{ textAlign: "right" }}>
            <Typography.Text 
              type={product.inStock ? "success" : "danger"}
              style={{ fontSize: "12px", fontWeight: "600" }}
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
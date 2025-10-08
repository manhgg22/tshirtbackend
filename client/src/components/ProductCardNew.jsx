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

  const handleCardClick = () => {
    navigate(`/products/${product._id}`)
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
            src={product.images?.[0]?.url || product.image || `https://via.placeholder.com/300x300/dc2626/ffffff?text=${encodeURIComponent(product.name)}`}
            style={{ 
              objectFit: "cover", 
              height: 280,
              transition: "transform 0.3s ease",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
            preview={false}
            onClick={handleCardClick}
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
                size="small"
                style={{ 
                  backgroundColor: "rgba(255,255,255,0.9)",
                  border: "none",
                  color: "#A61C1C"
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(`/products/${product._id}`)
                }}
              />
            </Tooltip>
            <Tooltip title={isLiked ? "Bỏ yêu thích" : "Yêu thích"}>
              <Button
                type="primary"
                shape="circle"
                icon={<HeartOutlined />}
                size="small"
                style={{ 
                  backgroundColor: isLiked ? "#A61C1C" : "rgba(255,255,255,0.9)",
                  border: "none",
                  color: isLiked ? "white" : "#A61C1C"
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  setIsLiked(!isLiked)
                }}
              />
            </Tooltip>
          </div>

          {/* Badges */}
          <div style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}>
            {product.isFeatured && (
              <Badge 
                count="Nổi bật" 
                style={{ 
                  backgroundColor: "#C89B3C",
                  fontSize: "10px",
                  height: "20px",
                  lineHeight: "20px"
                }} 
              />
            )}
            {product.originalPrice && product.originalPrice > product.price && (
              <Badge 
                count={`-${Math.round((1 - product.price / product.originalPrice) * 100)}%`}
                style={{ 
                  backgroundColor: "#A61C1C",
                  fontSize: "10px",
                  height: "20px",
                  lineHeight: "20px"
                }} 
              />
            )}
          </div>
        </div>
      }
      actions={[
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          onClick={(e) => {
            e.stopPropagation()
            onAddToCart(product)
          }}
          disabled={!product.inStock}
          style={{
            backgroundColor: "#A61C1C",
            border: "none",
            borderRadius: "8px",
            height: "40px",
            fontWeight: "600"
          }}
        >
          {product.inStock ? "Thêm vào giỏ" : "Hết hàng"}
        </Button>
      ]}
    >
      <div style={{ padding: "0 4px" }}>
        {/* Product Name */}
        <Typography.Title
          level={5}
          style={{
            margin: "0 0 8px 0",
            fontSize: "16px",
            fontWeight: "600",
            color: "#2C2C2C",
            lineHeight: "1.4",
            height: "44px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            cursor: "pointer"
          }}
          onClick={handleCardClick}
        >
          {product.name}
        </Typography.Title>

        {/* Rating */}
        <div style={{ marginBottom: "12px" }}>
          <Space size="small">
            <Rate 
              disabled 
              value={product.rating?.average || 0} 
              allowHalf 
              style={{ fontSize: "14px" }}
            />
            <Typography.Text 
              type="secondary" 
              style={{ fontSize: "12px" }}
            >
              ({product.rating?.count || 0})
            </Typography.Text>
          </Space>
        </div>

        {/* Price */}
        <div style={{ marginBottom: "8px" }}>
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <Typography.Text
              strong
              style={{
                fontSize: "18px",
                color: "#A61C1C",
                fontWeight: "700"
              }}
            >
              {formatPrice(product.price)}
            </Typography.Text>
            {product.originalPrice && product.originalPrice > product.price && (
              <Typography.Text
                delete
                type="secondary"
                style={{ fontSize: "14px" }}
              >
                {formatPrice(product.originalPrice)}
              </Typography.Text>
            )}
          </Space>
        </div>

        {/* Stock Status */}
        <div style={{ marginTop: "8px" }}>
          {product.inStock ? (
            <Typography.Text type="success" style={{ fontSize: "12px" }}>
              ✓ Còn hàng ({product.stock || 0} sản phẩm)
            </Typography.Text>
          ) : (
            <Typography.Text type="danger" style={{ fontSize: "12px" }}>
              ✗ Hết hàng
            </Typography.Text>
          )}
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div style={{ marginTop: "8px" }}>
            <Space size="small" wrap>
              {product.tags.slice(0, 2).map(tag => (
                <Badge 
                  key={tag}
                  count={tag}
                  style={{ 
                    backgroundColor: "#f0f0f0",
                    color: "#666",
                    fontSize: "10px",
                    height: "18px",
                    lineHeight: "18px"
                  }} 
                />
              ))}
              {product.tags.length > 2 && (
                <Typography.Text type="secondary" style={{ fontSize: "10px" }}>
                  +{product.tags.length - 2}
                </Typography.Text>
              )}
            </Space>
          </div>
        )}
      </div>
    </Card>
  )
}

export default ProductCard

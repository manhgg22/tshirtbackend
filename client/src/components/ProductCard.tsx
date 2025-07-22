"use client"

import type React from "react"
import { Card, Typography, Button, Image, Tooltip } from "antd"
import { ShoppingCartOutlined } from "@ant-design/icons"
import type { Product } from "../types"

interface ProductCardProps {
  product: Product
  onAddToCart: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Card
      hoverable
      style={{ width: "100%", borderRadius: 8, overflow: "hidden" }}
      cover={
        <Image
          alt={product.name}
          src={`/placeholder.svg?height=250&width=250&query=vietnamese patriotic t-shirt ${product.name}`}
          style={{ objectFit: "cover", height: 250 }}
          preview={false}
        />
      }
      actions={[
        <Tooltip title="Thêm vào giỏ hàng" key="add-to-cart">
          <Button type="text" icon={<ShoppingCartOutlined />} onClick={onAddToCart}>
            Thêm vào giỏ
          </Button>
        </Tooltip>,
      ]}
    >
      <Card.Meta
        title={<Typography.Title level={4}>{product.name}</Typography.Title>}
        description={
          <>
            <Typography.Paragraph ellipsis={{ rows: 2 }} type="secondary">
              {product.description}
            </Typography.Paragraph>
            <Typography.Title level={3} style={{ marginTop: 8, color: "#E4002B" }}>
              ${product.price.toFixed(2)}
            </Typography.Title>
          </>
        }
      />
    </Card>
  )
}

export default ProductCard

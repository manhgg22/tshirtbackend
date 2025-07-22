"use client"

import type React from "react"
import { Table, Typography, Button, InputNumber, Space, Image, Popconfirm, message } from "antd"
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons"
import type { CartItem } from "../types"

interface CartTableProps {
  items: CartItem[]
  onUpdateQuantity: (productId: string, designId: string | undefined, quantity: number) => void
  onRemoveItem: (productId: string, designId: string | undefined) => void
}

const CartTable: React.FC<CartTableProps> = ({ items, onUpdateQuantity, onRemoveItem }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const columns = [
    {
      title: "Sản phẩm",
      key: "product",
      render: (item: CartItem) => (
        <Space>
          <Image
            src={`/placeholder.svg?height=80&width=80&query=vietnamese t-shirt ${item.product.name}`}
            alt={item.product.name}
            width={80}
            height={80}
            style={{ objectFit: "cover", borderRadius: 4 }}
            preview={false}
          />
          <div>
            <Typography.Text strong>{item.product.name}</Typography.Text>
            {item.design && (
              <Typography.Text type="secondary" style={{ display: "block" }}>
                Thiết kế: {item.design.name}
              </Typography.Text>
            )}
          </div>
        </Space>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Số lượng",
      key: "quantity",
      render: (item: CartItem) => (
        <Space>
          <Button
            icon={<MinusOutlined />}
            onClick={() => onUpdateQuantity(item.productId, item.designId, item.quantity - 1)}
            disabled={item.quantity <= 1}
          />
          <InputNumber
            min={1}
            value={item.quantity}
            onChange={(value) => onUpdateQuantity(item.productId, item.designId, value || 1)}
            style={{ width: 60 }}
          />
          <Button
            icon={<PlusOutlined />}
            onClick={() => onUpdateQuantity(item.productId, item.designId, item.quantity + 1)}
          />
        </Space>
      ),
    },
    {
      title: "Tổng cộng",
      key: "total",
      render: (item: CartItem) => `$${(item.price * item.quantity).toFixed(2)}`,
    },
    {
      title: "Hành động",
      key: "actions",
      render: (item: CartItem) => (
        <Popconfirm
          title="Bạn có chắc muốn xóa sản phẩm này?"
          onConfirm={() => {
            onRemoveItem(item.productId, item.designId)
            message.success("Đã xóa sản phẩm khỏi giỏ hàng!")
          }}
          okText="Có"
          cancelText="Không"
        >
          <Button danger icon={<DeleteOutlined />}>
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ]

  return (
    <div style={{ padding: "24px", background: "#fff", borderRadius: 8 }}>
      <Typography.Title level={2} style={{ marginBottom: "24px" }}>
        Giỏ hàng của bạn
      </Typography.Title>
      <Table
        columns={columns}
        dataSource={items}
        rowKey={(item) => `${item.productId}-${item.designId || "no-design"}`}
        pagination={false}
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={4} align="right">
              <Typography.Title level={3} style={{ margin: 0 }}>
                Tổng cộng:
              </Typography.Title>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={1} colSpan={1} align="left">
              <Typography.Title level={3} style={{ margin: 0, color: "#E4002B" }}>
                ${total.toFixed(2)}
              </Typography.Title>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={2} colSpan={1} />
          </Table.Summary.Row>
        )}
      />
      <div style={{ textAlign: "right", marginTop: "24px" }}>
        <Button type="primary" size="large">
          Tiến hành thanh toán
        </Button>
      </div>
    </div>
  )
}

export default CartTable

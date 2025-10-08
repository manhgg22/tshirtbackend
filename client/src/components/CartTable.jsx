import React from "react"
import { Table, Button, InputNumber, Space, Typography, Image, Tag } from "antd"
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons"

const { Text } = Typography

const CartTable = ({ items, onUpdateQuantity, onRemoveItem }) => {
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-md)" }}>
          <Image
            width={60}
            height={60}
            src={record.image || "/placeholder.svg"}
            style={{ borderRadius: "4px", objectFit: "cover" }}
            fallback="/images/logo192.png"
          />
          <div>
            <Text strong style={{ fontSize: "14px" }}>
              {record.name}
            </Text>
            <br />
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {record.category?.name || record.category}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <Text strong style={{ color: "#E4002B", fontSize: "16px" }}>
          {price.toLocaleString("vi-VN")}đ
        </Text>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <Space>
          <Button
            size="small"
            icon={<MinusOutlined />}
            onClick={() => onUpdateQuantity(record.productId, record.designId, Math.max(1, quantity - 1))}
          />
          <InputNumber
            min={1}
            max={99}
            value={quantity}
            onChange={(value) => onUpdateQuantity(record.productId, record.designId, value)}
            style={{ width: "60px" }}
          />
          <Button
            size="small"
            icon={<PlusOutlined />}
            onClick={() => onUpdateQuantity(record.productId, record.designId, quantity + 1)}
          />
        </Space>
      ),
    },
    {
      title: "Thành tiền",
      key: "total",
      render: (_, record) => (
        <Text strong style={{ color: "#E4002B", fontSize: "16px" }}>
          {(record.price * record.quantity).toLocaleString("vi-VN")}đ
        </Text>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onRemoveItem(record.productId, record.designId)}
        >
          Xóa
        </Button>
      ),
    },
  ]

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div>
      <Table
        columns={columns}
        dataSource={items}
        rowKey={(item) => `${item.productId}-${item.designId || 'no-design'}`}
        pagination={false}
        summary={() => (
          <Table.Summary>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={3}>
                <Text strong style={{ fontSize: "18px" }}>
                  Tổng cộng:
                </Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1}>
                <Text strong style={{ color: "#E4002B", fontSize: "20px" }}>
                  {totalAmount.toLocaleString("vi-VN")}đ
                </Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2} />
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />
    </div>
  )
}

export default CartTable

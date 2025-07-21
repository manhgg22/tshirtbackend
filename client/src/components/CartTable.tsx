import React from 'react';
import { Table, Typography, Button, InputNumber, Space, Image } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { CartItem } from '../types';

interface CartTableProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, designId: string | undefined, quantity: number) => void;
  onRemoveItem: (productId: string, designId: string | undefined) => void;
}

const CartTable: React.FC<CartTableProps> = ({ items, onUpdateQuantity, onRemoveItem }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const columns = [
    {
      title: 'Product',
      key: 'product',
      render: (item: CartItem) => (
        <Space>
          <Image
            src={`http://localhost:5000${item.product.image}`}
            alt={item.product.name}
            width={80}
            height={80}
            style={{ objectFit: 'cover' }}
          />
          <div>
            <Typography.Text strong>{item.product.name}</Typography.Text>
            {item.design && (
              <Typography.Text type="secondary" style={{ display: 'block' }}>
                Custom Design: {item.design.name}
              </Typography.Text>
            )}
          </div>
        </Space>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Quantity',
      key: 'quantity',
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
      title: 'Total',
      key: 'total',
      render: (item: CartItem) => `$${(item.price * item.quantity).toFixed(2)}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (item: CartItem) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => onRemoveItem(item.productId, item.designId)}
        >
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Typography.Title level={2}>Shopping Cart</Typography.Title>
      <Table
        columns={columns}
        dataSource={items}
        rowKey={(item) => `${item.productId}-${item.designId || 'no-design'}`}
        pagination={false}
        footer={() => (
          <Typography.Title level={3} style={{ textAlign: 'right' }}>
            Total: ${total.toFixed(2)}
          </Typography.Title>
        )}
      />
    </div>
  );
};

export default CartTable;

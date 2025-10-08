import { useSelector, useDispatch } from "react-redux"
import { Layout, Button, Typography, Space, Card, Row, Col } from "antd"
import { useNavigate } from "react-router-dom"
import { removeItem, updateQuantity } from "../redux/cartSlice"
import CartTable from "../components/CartTable"

const { Content } = Layout
const { Title, Text } = Typography

const CartPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector((state) => state.cart.items)

  console.log('🛒 CartPage Debug:', {
    cartItems: cartItems,
    cartLength: cartItems.length,
    cartState: useSelector((state) => state.cart)
  });

  const handleUpdateQuantity = (productId, designId, newQuantity) => {
    dispatch(updateQuantity({ productId, designId, quantity: newQuantity }))
  }

  const handleRemoveItem = (productId, designId) => {
    dispatch(removeItem({ productId, designId }))
  }

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <Content style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <Title level={2}>🛒 Giỏ hàng của bạn</Title>
        {cartItems.length === 0 && (
          <Card style={{ textAlign: "center", padding: "40px" }}>
            <Title level={3}>Giỏ hàng trống</Title>
            <Text type="secondary">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm!</Text>
            <br />
            <Button type="primary" onClick={() => navigate("/products")} style={{ marginTop: "16px" }}>
              Xem sản phẩm
            </Button>
          </Card>
        )}
      </div>

      {cartItems.length > 0 && (
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <CartTable items={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} />
          </Col>
          
          <Col xs={24} lg={8}>
            <Card title="📦 Tóm tắt đơn hàng" style={{ position: "sticky", top: "24px" }}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: "bold", color: "#1890ff" }}>
                  <span>Tổng cộng:</span>
                  <span>{total.toLocaleString("vi-VN")}đ</span>
                </div>
                
                <Button
                  type="primary"
                  size="large"
                  onClick={() => navigate("/checkout")}
                  style={{ width: "100%", marginTop: "16px" }}
                >
                  💳 Thanh toán QR
                </Button>
                
                <Button
                  onClick={() => navigate("/products")}
                  style={{ width: "100%" }}
                >
                  Tiếp tục mua sắm
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
      )}
    </Content>
  )
}

export default CartPage
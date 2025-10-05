import { useSelector, useDispatch } from "react-redux"
import { Layout } from "antd"
import { removeItem, updateQuantity } from "../redux/cartSlice"
import CartTable from "../components/CartTable"

const { Content } = Layout

const CartPage = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)

  const handleUpdateQuantity = (productId, designId, newQuantity) => {
    dispatch(updateQuantity({ productId, designId, quantity: newQuantity }))
  }

  const handleRemoveItem = (productId, designId) => {
    dispatch(removeItem({ productId, designId }))
  }

  return (
    <Content style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
      <CartTable items={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} />
    </Content>
  )
}

export default CartPage
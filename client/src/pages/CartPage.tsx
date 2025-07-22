import { useSelector, useDispatch } from "react-redux"
import { Layout } from "antd"
import type { RootState } from "../redux/store"
import { removeItem, updateQuantity } from "../redux/cartSlice"
import CartTable from "../components/CartTable"

const { Content } = Layout

const CartPage = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)

  const handleUpdateQuantity = (productId: string, designId: string | undefined, newQuantity: number) => {
    dispatch(updateQuantity({ productId, designId, quantity: newQuantity }))
  }

  const handleRemoveItem = (productId: string, designId: string | undefined) => {
    dispatch(removeItem({ productId, designId }))
  }

  return (
    <Content style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
      <CartTable items={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} />
    </Content>
  )
}

export default CartPage

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { message } from "antd"
import {
  ShoppingCartOutlined,
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  TagOutlined,
  ShoppingOutlined,
  SafetyOutlined,
  TruckOutlined,
  RocketOutlined,
  GiftOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  InboxOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons"
import { removeItem, updateQuantity, applyPromoCode, removePromoCode } from "../redux/cartSlice"
import "./CartPage.css"

const CartPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items: cartItems, promoCode, discount, shippingFee } = useSelector((state) => state.cart)
  const [promoInput, setPromoInput] = useState("")
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = subtotal * (discount / 100)
  const total = subtotal - discountAmount + shippingFee

  const handleUpdateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) return
    dispatch(
      updateQuantity({
        productId: item.productId,
        designId: item.designId,
        quantity: newQuantity,
        size: item.size,
        color: item.color,
      })
    )
  }

  const handleRemoveItem = (item) => {
    dispatch(
      removeItem({
        productId: item.productId,
        designId: item.designId,
        size: item.size,
        color: item.color,
      })
    )
    message.success("Đã xóa sản phẩm khỏi giỏ hàng")
  }

  const handleApplyPromo = () => {
    setIsApplyingPromo(true)
    setTimeout(() => {
      // Mock promo validation
      const validPromos = {
        WELCOME10: 10,
        SUMMER20: 20,
        VIP30: 30,
      }

      if (validPromos[promoInput.toUpperCase()]) {
        dispatch(
          applyPromoCode({
            code: promoInput.toUpperCase(),
            discount: validPromos[promoInput.toUpperCase()],
          })
        )
        message.success(`Áp dụng mã giảm giá ${promoInput.toUpperCase()} thành công!`)
        setPromoInput("")
      } else {
        message.error("Mã giảm giá không hợp lệ!")
      }
      setIsApplyingPromo(false)
    }, 500)
  }

  const handleRemovePromo = () => {
    dispatch(removePromoCode())
    message.info("Đã xóa mã giảm giá")
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      message.warning("Giỏ hàng trống!")
      return
    }
    navigate("/checkout")
  }

  // Empty State
  if (cartItems.length === 0) {
    return (
      <div className="cart-page-container">
        <div className="cart-page-wrapper">
          <div className="cart-empty-state">
            <div className="cart-empty-illustration">
              <InboxOutlined className="cart-empty-icon" />
            </div>
            <h2 className="cart-empty-title">Giỏ hàng trống</h2>
            <p className="cart-empty-subtitle">
              Hãy thêm sản phẩm yêu thích vào giỏ hàng để tiếp tục mua sắm!
            </p>
            <button className="cart-empty-cta" onClick={() => navigate("/products")}>
              <ShoppingOutlined />
              Khám phá sản phẩm
            </button>

            {/* Suggested Products */}
            <div className="cart-suggested-products">
              <h3 className="cart-suggested-title">Có thể bạn quan tâm</h3>
              <div className="cart-suggested-grid">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="cart-suggested-card" onClick={() => navigate("/products")}>
                    <img
                      src={`/images/aothuntest/aothun${i}.webp`}
                      alt={`Sản phẩm ${i}`}
                      className="cart-suggested-image"
                    />
                    <h4 className="cart-suggested-name">Áo Thun Lịch Sử Việt Nam #{i}</h4>
                    <p className="cart-suggested-price">{(250000 + i * 50000).toLocaleString("vi-VN")}đ</p>
                    <button className="cart-suggested-add-btn">
                      <PlusOutlined /> Thêm vào giỏ
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Cart with Items
  return (
    <div className="cart-page-container">
      <div className="cart-page-wrapper">
        {/* Header */}
        <div className="cart-page-header">
          <h1 className="cart-page-title">
            <ShoppingCartOutlined className="cart-page-title-icon" />
            Giỏ hàng của bạn
          </h1>
          <p className="cart-item-count">{cartItems.length} sản phẩm</p>
        </div>

        {/* Main Layout */}
        <div className="cart-main-layout">
          {/* Cart Items */}
          <div className="cart-items-section">
            {cartItems.map((item, index) => (
              <div key={`${item.productId}-${item.designId}-${item.size}-${item.color}-${index}`} className="cart-item-card">
                <div className="cart-item-content">
                  {/* Image */}
                  <div className="cart-item-image-wrapper">
                    <img
                      src={item.image || "/images/placeholder.png"}
                      alt={item.name}
                      className="cart-item-image"
                    />
                    {item.design && <span className="cart-item-badge">Custom</span>}
                  </div>

                  {/* Info */}
                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{item.name}</h3>

                    <div className="cart-item-meta">
                      <span className="cart-item-meta-tag">
                        <TagOutlined className="cart-item-meta-icon" />
                        {item.category?.name || item.category}
                      </span>
                      <span className="cart-item-meta-tag">
                        Size: <strong>{item.size}</strong>
                      </span>
                      <span className="cart-item-meta-tag">
                        Màu: <strong>{item.color}</strong>
                      </span>
                    </div>

                    <div className="cart-item-price-section">
                      <span className="cart-item-price">
                        {item.price.toLocaleString("vi-VN")}đ
                      </span>
                      <span className="cart-item-subtotal">
                        Thành tiền:{" "}
                        <span className="cart-item-subtotal-amount">
                          {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                        </span>
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="cart-item-actions">
                      <div className="cart-quantity-controls">
                        <button
                          className="cart-quantity-btn"
                          onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <MinusOutlined />
                        </button>
                        <input
                          type="number"
                          className="cart-quantity-input"
                          value={item.quantity}
                          onChange={(e) => handleUpdateQuantity(item, parseInt(e.target.value) || 1)}
                          min="1"
                        />
                        <button
                          className="cart-quantity-btn"
                          onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                        >
                          <PlusOutlined />
                        </button>
                      </div>

                      <button className="cart-remove-btn" onClick={() => handleRemoveItem(item)}>
                        <DeleteOutlined />
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Card */}
          <div className="cart-summary-card">
            <h2 className="cart-summary-title">
              <GiftOutlined className="cart-summary-title-icon" />
              Tóm tắt đơn hàng
            </h2>

            {/* Promo Code */}
            <div className="cart-promo-section">
              {!promoCode ? (
                <div className="cart-promo-input-wrapper">
                  <input
                    type="text"
                    className="cart-promo-input"
                    placeholder="Nhập mã giảm giá"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                    onKeyPress={(e) => e.key === "Enter" && handleApplyPromo()}
                  />
                  <button
                    className="cart-promo-apply-btn"
                    onClick={handleApplyPromo}
                    disabled={!promoInput || isApplyingPromo}
                  >
                    {isApplyingPromo ? "..." : "Áp dụng"}
                  </button>
                </div>
              ) : (
                <div className="cart-promo-applied">
                  <span className="cart-promo-applied-text">
                    <CheckCircleOutlined />
                    Mã: {promoCode} (-{discount}%)
                  </span>
                  <button className="cart-promo-remove-btn" onClick={handleRemovePromo}>
                    <CloseOutlined />
                  </button>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="cart-price-breakdown">
              <div className="cart-price-row">
                <span className="cart-price-label">Tạm tính</span>
                <span className="cart-price-value">{subtotal.toLocaleString("vi-VN")}đ</span>
              </div>

              {discount > 0 && (
                <div className="cart-price-row">
                  <span className="cart-price-label">
                    <TagOutlined /> Giảm giá ({discount}%)
                  </span>
                  <span className="cart-price-value success">
                    -{discountAmount.toLocaleString("vi-VN")}đ
                  </span>
                </div>
              )}

              <div className="cart-price-row">
                <span className="cart-price-label">
                  <TruckOutlined /> Phí vận chuyển
                </span>
                <span className="cart-price-value success">
                  {shippingFee === 0 ? "Miễn phí" : `${shippingFee.toLocaleString("vi-VN")}đ`}
                </span>
              </div>

              <div className="cart-divider" />

              <div className="cart-total-row">
                <span className="cart-total-label">Tổng cộng</span>
                <span className="cart-total-value">{total.toLocaleString("vi-VN")}đ</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="cart-action-buttons">
              <button className="cart-checkout-btn" onClick={handleCheckout}>
                <RocketOutlined />
                Thanh toán ngay
                <ArrowRightOutlined />
              </button>
              <button className="cart-continue-btn" onClick={() => navigate("/products")}>
                <ShoppingOutlined />
                Tiếp tục mua sắm
              </button>
            </div>

            {/* Trust Badges */}
            <div className="cart-trust-badges">
              <div className="cart-trust-badge">
                <SafetyOutlined className="cart-trust-badge-icon" />
                <p className="cart-trust-badge-text">Thanh toán an toàn</p>
              </div>
              <div className="cart-trust-badge">
                <TruckOutlined className="cart-trust-badge-icon" />
                <p className="cart-trust-badge-text">Miễn phí vận chuyển</p>
              </div>
              <div className="cart-trust-badge">
                <GiftOutlined className="cart-trust-badge-icon" />
                <p className="cart-trust-badge-text">Đổi trả dễ dàng</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
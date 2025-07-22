"use client"

import type React from "react"
import { Layout, Menu, Badge, Typography } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../redux/store"
import { logout } from "../redux/authSlice"
import type { CartItem } from "../types"
import {
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  ShopOutlined,
  PlusCircleOutlined,
  HomeOutlined,
} from "@ant-design/icons"

const { Header: AntHeader } = Layout
const { Text } = Typography

const Header: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state: RootState) => state.auth)
  const cartItems = useSelector((state: RootState) => state.cart.items)

  const cartItemCount = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)

  const menuItems = [
    { key: "home", label: "Trang chủ", icon: <HomeOutlined />, onClick: () => navigate("/") },
    { key: "shop", label: "Sản phẩm", icon: <ShopOutlined />, onClick: () => navigate("/products") },
    { key: "design", label: "Thiết kế riêng", icon: <PlusCircleOutlined />, onClick: () => navigate("/custom-design") },
    {
      key: "cart",
      label: (
        <Badge count={cartItemCount} size="small" offset={[5, -5]}>
          <Text>Giỏ hàng</Text>
        </Badge>
      ),
      icon: <ShoppingCartOutlined />,
      onClick: () => navigate("/cart"),
    },
  ]

  const authMenuItems = user
    ? [
        { key: "profile", label: "Hồ sơ", icon: <UserOutlined />, onClick: () => navigate("/profile") },
        { key: "logout", label: "Đăng xuất", icon: <LogoutOutlined />, onClick: () => dispatch(logout()) },
      ]
    : [
        { key: "login", label: "Đăng nhập", onClick: () => navigate("/login") },
        { key: "register", label: "Đăng ký", onClick: () => navigate("/register") },
      ]

  return (
    <AntHeader style={{ background: "#fff", padding: "0 24px", borderBottom: "1px solid #f0f0f0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div className="logo">
          <Link to="/" style={{ color: "#E4002B", fontSize: "28px", fontWeight: "bold", textDecoration: "none" }}>
            VN T-Shirts
          </Link>
        </div>
        <Menu
          mode="horizontal"
          selectedKeys={[window.location.pathname.split("/")[1] || "home"]} // Highlight current path
          items={[...menuItems, ...authMenuItems]}
          style={{ flex: 1, borderBottom: "none", justifyContent: "flex-end" }}
        />
      </div>
    </AntHeader>
  )
}

export default Header

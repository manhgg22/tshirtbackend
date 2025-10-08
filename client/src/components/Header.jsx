import React from "react"
import { Layout, Menu, Badge, Typography, Button, Space, Dropdown, Avatar } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../redux/authSlice"
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

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const cartItems = useSelector((state) => state.cart.items)

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

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

  const handleLogout = () => {
    dispatch(logout())
  }

  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile">Hồ sơ</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  )

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
            Inkverse
          </Link>
        </div>
        <Menu
          mode="horizontal"
          selectedKeys={[window.location.pathname.split("/")[1] || "home"]}
          items={[...menuItems, ...authMenuItems]}
          style={{ flex: 1, borderBottom: "none", justifyContent: "flex-end" }}
        />
        <div className="right-section">
          {isAuthenticated && user ? (
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Space>
                <Avatar icon={<UserOutlined />} />
                <span style={{ color: "#333", marginLeft: 8 }}>{user.name}</span>
              </Space>
            </Dropdown>
          ) : (
            <Space>
              <Link to="/login">
                <Button type="primary">Đăng nhập</Button>
              </Link>
              <Link to="/register">
                <Button>Đăng ký</Button>
              </Link>
            </Space>
          )}
        </div>
      </div>
    </AntHeader>
  )
}

export default Header
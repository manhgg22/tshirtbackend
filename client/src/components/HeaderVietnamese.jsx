import React, { useState } from "react"
import { Layout, Menu, Badge, Typography, Button, Space, Dropdown, Avatar, Drawer } from "antd"
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
  MenuOutlined,
  HeartOutlined,
  SearchOutlined,
  CrownOutlined,
} from "@ant-design/icons"

const { Header: AntHeader } = Layout
const { Text } = Typography

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const cartItems = useSelector((state) => state.cart.items)
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const menuItems = [
    { key: "home", label: "Trang chủ", icon: <HomeOutlined />, onClick: () => navigate("/") },
    { key: "shop", label: "Sản phẩm", icon: <ShopOutlined />, onClick: () => navigate("/products") },
    { key: "design", label: "Thiết kế riêng", icon: <PlusCircleOutlined />, onClick: () => navigate("/custom-design") },
    {
      key: "cart",
      label: (
        <Badge count={cartItemCount} size="small" offset={[5, -5]}>
          <Text style={{ color: "var(--ivory-white)" }}>Giỏ hàng</Text>
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
    <Menu style={{ 
      background: "var(--ivory-white)", 
      border: "1px solid var(--light-gold)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-medium)",
    }}>
      <Menu.Item key="profile" style={{ color: "var(--mahogany-brown)" }}>
        <Link to="/profile" style={{ color: "var(--mahogany-brown)" }}>Hồ sơ</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />} style={{ color: "var(--red-son)" }}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  )

  const mobileMenuItems = [
    ...menuItems,
    ...authMenuItems,
  ]

  return (
    <>
      <AntHeader 
        style={{ 
          background: "linear-gradient(135deg, var(--red-son) 0%, var(--deep-red) 100%)",
          padding: "0 var(--spacing-lg)", 
          borderBottom: "none",
          boxShadow: "var(--shadow-medium)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          height: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: 1200,
            margin: "0 auto",
            height: "100%",
          }}
        >
          {/* Logo */}
          <div className="logo">
            <Link 
              to="/" 
              style={{ 
                color: "var(--ivory-white)", 
                fontSize: "28px", 
                fontWeight: "700", 
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "var(--spacing-sm)",
                fontFamily: "var(--font-heading)",
              }}
            >
              <CrownOutlined style={{ color: "var(--gold-copper)", fontSize: "32px" }} />
              <span style={{ 
                background: "linear-gradient(45deg, var(--gold-copper), var(--light-gold))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                VN T-Shirts
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-lg)" }}>
            <Menu
              mode="horizontal"
              selectedKeys={[window.location.pathname.split("/")[1] || "home"]}
              items={menuItems}
              style={{ 
                background: "transparent", 
                borderBottom: "none", 
                color: "var(--ivory-white)",
                minWidth: "400px",
                fontSize: "16px",
                fontWeight: "500",
              }}
              theme="dark"
            />
            
            {/* Search Bar */}
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              background: "rgba(250, 244, 225, 0.1)", 
              borderRadius: "var(--radius-xl)", 
              padding: "var(--spacing-sm) var(--spacing-md)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(200, 155, 60, 0.2)",
            }}>
              <SearchOutlined style={{ color: "var(--light-gold)", marginRight: "var(--spacing-sm)" }} />
              <input 
                placeholder="Tìm kiếm sản phẩm..." 
                style={{ 
                  background: "transparent", 
                  border: "none", 
                  outline: "none", 
                  color: "var(--ivory-white)",
                  width: "200px",
                  fontSize: "14px",
                }}
              />
            </div>

            {/* Auth Section */}
            <div className="right-section">
              {isAuthenticated && user ? (
                <Dropdown overlay={userMenu} placement="bottomRight">
                  <Space style={{ cursor: "pointer", color: "var(--ivory-white)" }}>
                    <Avatar 
                      style={{ 
                        background: "linear-gradient(45deg, var(--gold-copper), var(--light-gold))",
                        border: "2px solid var(--light-gold)",
                      }} 
                      icon={<UserOutlined />} 
                    />
                    <span style={{ color: "var(--ivory-white)", marginLeft: "var(--spacing-sm)", fontWeight: "500" }}>
                      {user.name}
                    </span>
                  </Space>
                </Dropdown>
              ) : (
                <Space>
                  <Link to="/login">
                    <Button 
                      className="btn-vietnamese"
                      style={{ 
                        background: "rgba(250, 244, 225, 0.1)", 
                        border: "1px solid var(--light-gold)",
                        color: "var(--ivory-white)",
                        backdropFilter: "blur(10px)",
                        fontWeight: "600",
                      }}
                    >
                      Đăng nhập
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button 
                      className="btn-vietnamese-secondary"
                      style={{ 
                        background: "var(--gold-copper)", 
                        border: "1px solid var(--gold-copper)",
                        color: "var(--charcoal)",
                        fontWeight: "600",
                      }}
                    >
                      Đăng ký
                    </Button>
                  </Link>
                </Space>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileMenuVisible(true)}
              style={{ 
                color: "var(--ivory-white)", 
                display: "none",
                fontSize: "20px",
              }}
              className="mobile-menu-btn"
            />
          </div>
        </div>
      </AntHeader>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div style={{ 
            fontFamily: "var(--font-heading)", 
            color: "var(--red-son)",
            fontSize: "20px",
            fontWeight: "600",
          }}>
            🇻🇳 VN T-Shirts
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        style={{ display: "none" }}
        className="mobile-drawer"
        styles={{
          body: {
            background: "var(--ivory-white)",
          },
          header: {
            background: "var(--ivory-white)",
            borderBottom: "1px solid var(--light-gold)",
          }
        }}
      >
        <Menu
          mode="vertical"
          selectedKeys={[window.location.pathname.split("/")[1] || "home"]}
          items={mobileMenuItems}
          style={{ 
            border: "none",
            background: "transparent",
          }}
        />
      </Drawer>

      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block !important;
          }
          
          .mobile-drawer {
            display: block !important;
          }
          
          .right-section {
            display: none;
          }
          
          .ant-menu-horizontal {
            display: none;
          }
        }
      `}</style>
    </>
  )
}

export default Header

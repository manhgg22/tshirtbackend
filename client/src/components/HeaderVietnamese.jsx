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

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const menuItems = [
    { 
      key: "home", 
      label: "Trang chủ", 
      icon: <HomeOutlined style={{ fontSize: "14px" }} />, 
      onClick: () => navigate("/home") 
    },
    { 
      key: "landing", 
      label: "Lịch sử", 
      icon: <CrownOutlined style={{ fontSize: "14px" }} />, 
      onClick: () => navigate("/") 
    },
    { 
      key: "shop", 
      label: "Sản phẩm", 
      icon: <ShopOutlined style={{ fontSize: "14px" }} />, 
      onClick: () => navigate("/products") 
    },
    { 
      key: "design", 
      label: "Thiết kế riêng", 
      icon: <PlusCircleOutlined style={{ fontSize: "14px" }} />, 
      onClick: () => navigate("/custom-design") 
    },
    {
      key: "cart",
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <ShoppingCartOutlined style={{ fontSize: "14px" }} />
          <span>Giỏ hàng</span>
          {cartItemCount > 0 && (
            <Badge 
              count={cartItemCount} 
              size="small" 
              style={{ 
                backgroundColor: "#ff4d4f",
                fontSize: "10px",
                minWidth: "16px",
                height: "16px",
                lineHeight: "16px"
              }} 
            />
          )}
        </div>
      ),
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
            maxWidth: 1400,
            margin: "0 auto",
            height: "100%",
            width: "100%",
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
                Inkverse
              </span>
            </Link>
          </div>

          {/* Navigation Menu */}
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "16px",
            flex: 1,
            justifyContent: "center",
          }}>
            {menuItems.map((item) => {
              const isActive = window.location.pathname.split("/")[1] === item.key || 
                (item.key === "home" && window.location.pathname === "/");
              
              return (
                <div
                  key={item.key}
                  onClick={item.onClick}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    color: "var(--ivory-white)",
                    fontSize: "14px",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                    background: isActive ? "rgba(250, 244, 225, 0.1)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.background = "rgba(250, 244, 225, 0.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.background = "transparent";
                    }
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>

          {/* Search Bar */}
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            background: "rgba(250, 244, 225, 0.1)", 
            borderRadius: "var(--radius-xl)", 
            padding: "6px 12px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(200, 155, 60, 0.2)",
            minWidth: "150px",
          }}>
            <SearchOutlined style={{ color: "var(--light-gold)", marginRight: "6px", fontSize: "12px" }} />
            <input 
              placeholder="Tìm..." 
              style={{ 
                background: "transparent", 
                border: "none", 
                outline: "none", 
                color: "var(--ivory-white)",
                width: "100%",
                fontSize: "12px",
              }}
            />
          </div>

          {/* Auth Section */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {isAuthenticated && user ? (
              <Dropdown overlay={userMenu} placement="bottomRight">
                <Space style={{ cursor: "pointer", color: "var(--ivory-white)" }}>
                  <Avatar 
                    size="small"
                    style={{ 
                      background: "linear-gradient(45deg, var(--gold-copper), var(--light-gold))",
                      border: "2px solid var(--light-gold)",
                      width: "24px",
                      height: "24px",
                    }} 
                    icon={<UserOutlined style={{ fontSize: "12px" }} />} 
                  />
                  <span style={{ color: "var(--ivory-white)", fontWeight: "500", fontSize: "12px" }}>
                    {user.name}
                  </span>
                </Space>
              </Dropdown>
            ) : (
              <Space size="small">
                <Link to="/login">
                  <Button 
                    size="small"
                    style={{ 
                      background: "rgba(250, 244, 225, 0.1)", 
                      border: "1px solid var(--light-gold)",
                      color: "var(--ivory-white)",
                      backdropFilter: "blur(10px)",
                      fontWeight: "600",
                      fontSize: "12px",
                      height: "28px",
                      padding: "0 8px",
                    }}
                  >
                    Đăng nhập
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    size="small"
                    style={{ 
                      background: "var(--gold-copper)", 
                      border: "1px solid var(--gold-copper)",
                      color: "var(--charcoal)",
                      fontWeight: "600",
                      fontSize: "12px",
                      height: "28px",
                      padding: "0 8px",
                    }}
                  >
                    Đăng ký
                  </Button>
                </Link>
              </Space>
            )}
          </div>
        </div>
      </AntHeader>
      
    </>
  )
}

export default Header

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
  HistoryOutlined,
  EnvironmentOutlined,
  BookOutlined,
} from "@ant-design/icons"

const { Header: AntHeader } = Layout
const { Text } = Typography

const HeaderBachDang = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const cartItems = useSelector((state) => state.cart.items)
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const menuItems = [
    { key: "home", label: "Trang chủ", icon: <HomeOutlined />, onClick: () => navigate("/") },
    { key: "heritage", label: "Di sản", icon: <BookOutlined />, onClick: () => navigate("/heritage") },
    { key: "history", label: "Lịch sử", icon: <HistoryOutlined />, onClick: () => navigate("/history") },
    { key: "visit", label: "Tham quan", icon: <EnvironmentOutlined />, onClick: () => navigate("/visit") },
    { key: "products", label: "Sản phẩm", icon: <ShopOutlined />, onClick: () => navigate("/products") },
    {
      key: "cart",
      label: (
        <Badge count={cartItemCount} size="small" offset={[5, -5]}>
          <Text style={{ color: "var(--ivory-cream)" }}>Giỏ hàng</Text>
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
      background: "var(--ivory-cream)", 
      border: "1px solid var(--bronze-gold)",
      borderRadius: "var(--radius-md)",
      boxShadow: "0 4px 20px rgba(201, 164, 77, 0.2)",
    }}>
      <Menu.Item key="profile" style={{ color: "var(--wood-brown)" }}>
        <Link to="/profile" style={{ color: "var(--wood-brown)" }}>Hồ sơ</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />} style={{ color: "var(--red-earth)" }}>
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
          background: "linear-gradient(135deg, var(--deep-blue) 0%, var(--red-earth) 100%)",
          padding: "0 var(--spacing-lg)", 
          borderBottom: "none",
          boxShadow: "0 4px 20px rgba(31, 61, 78, 0.3)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          height: "80px",
        }}
      >
        {/* Water Wave Pattern Overlay */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 20\"><path d=\"M0,10 Q25,0 50,10 T100,10 L100,20 L0,20 Z\" fill=\"%23C9A44D\" opacity=\"0.1\"/></svg>')",
          opacity: 0.3,
        }} />
        
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: 1200,
            margin: "0 auto",
            height: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Logo */}
          <div className="logo">
            <Link 
              to="/" 
              style={{ 
                color: "var(--ivory-cream)", 
                fontSize: "28px", 
                fontWeight: "700", 
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "var(--spacing-sm)",
                fontFamily: "var(--font-hero)",
              }}
            >
              <div style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(45deg, var(--bronze-gold), var(--ancient-gold))",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(201, 164, 77, 0.4)",
              }}>
                <CrownOutlined style={{ color: "var(--charcoal-dark)", fontSize: "20px" }} />
              </div>
              <span style={{ 
                background: "linear-gradient(45deg, var(--bronze-gold), var(--ancient-gold))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              }}>
                Bạch Đằng Giang
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
                color: "var(--ivory-cream)",
                minWidth: "500px",
                fontSize: "16px",
                fontWeight: "500",
                fontFamily: "var(--font-body)",
              }}
              theme="dark"
            />
            
            {/* Search Bar */}
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              background: "rgba(249, 246, 236, 0.1)", 
              borderRadius: "var(--radius-xl)", 
              padding: "var(--spacing-sm) var(--spacing-md)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(201, 164, 77, 0.2)",
            }}>
              <SearchOutlined style={{ color: "var(--bronze-gold)", marginRight: "var(--spacing-sm)" }} />
              <input 
                placeholder="Tìm kiếm di sản..." 
                style={{ 
                  background: "transparent", 
                  border: "none", 
                  outline: "none", 
                  color: "var(--ivory-cream)",
                  width: "200px",
                  fontSize: "14px",
                }}
              />
            </div>

            {/* Auth Section */}
            <div className="right-section">
              {isAuthenticated && user ? (
                <Dropdown overlay={userMenu} placement="bottomRight">
                  <Space style={{ cursor: "pointer", color: "var(--ivory-cream)" }}>
                    <Avatar 
                      style={{ 
                        background: "linear-gradient(45deg, var(--bronze-gold), var(--ancient-gold))",
                        border: "2px solid var(--bronze-gold)",
                      }} 
                      icon={<UserOutlined />} 
                    />
                    <span style={{ color: "var(--ivory-cream)", marginLeft: "var(--spacing-sm)", fontWeight: "500" }}>
                      {user.name}
                    </span>
                  </Space>
                </Dropdown>
              ) : (
                <Space>
                  <Link to="/login">
                    <Button 
                      className="btn-bachdang-secondary"
                      style={{ 
                        background: "rgba(249, 246, 236, 0.1)", 
                        border: "1px solid var(--bronze-gold)",
                        color: "var(--ivory-cream)",
                        backdropFilter: "blur(10px)",
                        fontWeight: "600",
                      }}
                    >
                      Đăng nhập
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button 
                      className="btn-bachdang"
                      style={{ 
                        background: "var(--bronze-gold)", 
                        border: "1px solid var(--bronze-gold)",
                        color: "var(--charcoal-dark)",
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
                color: "var(--ivory-cream)", 
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
            fontFamily: "var(--font-hero)", 
            color: "var(--red-earth)",
            fontSize: "20px",
            fontWeight: "700",
          }}>
            ⚓ Bạch Đằng Giang
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        style={{ display: "none" }}
        className="mobile-drawer"
        styles={{
          body: {
            background: "var(--ivory-cream)",
          },
          header: {
            background: "var(--ivory-cream)",
            borderBottom: "1px solid var(--bronze-gold)",
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

export default HeaderBachDang


import React, { useState, useEffect } from 'react';
import {
  DashboardOutlined,
  ShoppingOutlined,
  InboxOutlined,
  UserOutlined,
  SettingOutlined,
  BarChartOutlined,
  SearchOutlined,
  BellOutlined,
  LogoutOutlined,
  DollarOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  MenuOutlined
} from '@ant-design/icons';
import axios from 'axios';
import './AdminDashboardPage.css';

const AdminDashboardPage = () => {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    customers: 0,
    pending: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [chartFilter, setChartFilter] = useState('7days');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load stats
      const statsResponse = await axios.get('/api/admin/stats');
      setStats(statsResponse.data);

      // Load recent orders
      const ordersResponse = await axios.get('/api/admin/orders?limit=5');
      setRecentOrders(ordersResponse.data.orders || []);

      // Load top products
      const productsResponse = await axios.get('/api/admin/products/top?limit=5');
      setTopProducts(productsResponse.data.products || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Use mock data for demo
      setStats({
        revenue: 125000000,
        revenueChange: 12.5,
        orders: 156,
        ordersChange: 8.2,
        customers: 89,
        customersChange: 15.3,
        pending: 12,
        pendingChange: -5.1,
      });
      
      setRecentOrders([
        {
          _id: '1',
          orderCode: 'ORD12345',
          customerInfo: { name: 'Nguyễn Văn A' },
          totalAmount: 1500000,
          status: 'paid',
          items: [{ quantity: 2 }],
          createdAt: new Date().toISOString(),
        },
        {
          _id: '2',
          orderCode: 'ORD12346',
          customerInfo: { name: 'Trần Thị B' },
          totalAmount: 890000,
          status: 'pending',
          items: [{ quantity: 1 }],
          createdAt: new Date().toISOString(),
        },
        {
          _id: '3',
          orderCode: 'ORD12347',
          customerInfo: { name: 'Lê Văn C' },
          totalAmount: 2100000,
          status: 'shipped',
          items: [{ quantity: 3 }],
          createdAt: new Date().toISOString(),
        },
      ]);

      setTopProducts([
        {
          _id: '1',
          name: 'Áo Thun Lịch Sử Việt Nam',
          images: [{ url: '/images/placeholder.png' }],
          sold: 145,
          revenue: 18500000,
          maxRevenue: 25000000,
        },
        {
          _id: '2',
          name: 'Áo Hoodie Trận Bạch Đằng',
          images: [{ url: '/images/placeholder.png' }],
          sold: 98,
          revenue: 14200000,
          maxRevenue: 25000000,
        },
        {
          _id: '3',
          name: 'Áo Polo Tinh Thần Việt',
          images: [{ url: '/images/placeholder.png' }],
          sold: 76,
          revenue: 9800000,
          maxRevenue: 25000000,
        },
      ]);
    }
  };

  const navItems = [
    { id: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard', badge: null },
    { id: 'orders', icon: <ShoppingOutlined />, label: 'Đơn hàng', badge: stats.pending },
    { id: 'products', icon: <InboxOutlined />, label: 'Sản phẩm', badge: null },
    { id: 'customers', icon: <TeamOutlined />, label: 'Khách hàng', badge: null },
    { id: 'analytics', icon: <BarChartOutlined />, label: 'Phân tích', badge: null },
    { id: 'settings', icon: <SettingOutlined />, label: 'Cài đặt', badge: null },
  ];

  return (
    <div className="admin-dashboard">
      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className={`dashboard-sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">👕</div>
            <div className="sidebar-logo-text">
              <h2>Vietnamese Spirit</h2>
              <p>Admin Panel</p>
            </div>
          </div>

          <nav className="sidebar-nav">
            {navItems.map(item => (
              <div
                key={item.id}
                className={`sidebar-nav-item ${activeNav === item.id ? 'active' : ''}`}
                onClick={() => setActiveNav(item.id)}
              >
                <span className="sidebar-nav-icon">{item.icon}</span>
                <span className="sidebar-nav-text">{item.label}</span>
                {item.badge && <span className="sidebar-nav-badge">{item.badge}</span>}
              </div>
            ))}
          </nav>

          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              <UserOutlined />
            </div>
            <div className="sidebar-user-info">
              <h4>Admin</h4>
              <p>admin@vietnam.vn</p>
            </div>
            <button className="topbar-icon-btn" title="Đăng xuất">
              <LogoutOutlined />
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="dashboard-main">
          {/* Top Bar */}
          <div className="dashboard-topbar">
            <div className="topbar-left">
              <button
                className="topbar-icon-btn"
                style={{ marginRight: '12px', display: 'none' }}
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <MenuOutlined />
              </button>
              <div>
                <h1>Dashboard</h1>
                <div className="topbar-breadcrumb">Trang chủ / Dashboard</div>
              </div>
            </div>

            <div className="topbar-right">
              <div className="topbar-search">
                <SearchOutlined className="topbar-search-icon" />
                <input type="text" placeholder="Tìm kiếm..." />
              </div>
              <button className="topbar-icon-btn">
                <BellOutlined />
                <span className="badge">3</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="dashboard-content">
            {/* Welcome Section */}
            <div className="dashboard-welcome">
              <div className="welcome-text">
                <h2>👋 Chào mừng trở lại, Admin!</h2>
                <p>Đây là tổng quan về hiệu suất kinh doanh của bạn hôm nay</p>
                <div className="welcome-date">
                  {new Date().toLocaleDateString('vi-VN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
              <div className="welcome-stats">
                <div className="welcome-stat">
                  <span className="welcome-stat-number">24</span>
                  <span className="welcome-stat-label">Đơn hôm nay</span>
                </div>
                <div className="welcome-stat">
                  <span className="welcome-stat-number">12</span>
                  <span className="welcome-stat-label">Đang xử lý</span>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="dashboard-stats">
              <div className="stat-card revenue">
                <div className="stat-card-header">
                  <div className="stat-card-icon">
                    <DollarOutlined />
                  </div>
                  <div className={`stat-card-trend ${stats.revenueChange >= 0 ? 'up' : 'down'}`}>
                    {stats.revenueChange >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    {Math.abs(stats.revenueChange || 12.5)}%
                  </div>
                </div>
                <div className="stat-card-value">
                  {(stats.revenue || 125000000).toLocaleString('vi-VN')}đ
                </div>
                <div className="stat-card-label">Tổng doanh thu</div>
              </div>

              <div className="stat-card orders">
                <div className="stat-card-header">
                  <div className="stat-card-icon">
                    <ShoppingOutlined />
                  </div>
                  <div className={`stat-card-trend ${stats.ordersChange >= 0 ? 'up' : 'down'}`}>
                    {stats.ordersChange >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    {Math.abs(stats.ordersChange || 8.2)}%
                  </div>
                </div>
                <div className="stat-card-value">{stats.orders || 156}</div>
                <div className="stat-card-label">Tổng đơn hàng</div>
              </div>

              <div className="stat-card customers">
                <div className="stat-card-header">
                  <div className="stat-card-icon">
                    <TeamOutlined />
                  </div>
                  <div className={`stat-card-trend ${stats.customersChange >= 0 ? 'up' : 'down'}`}>
                    {stats.customersChange >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    {Math.abs(stats.customersChange || 15.3)}%
                  </div>
                </div>
                <div className="stat-card-value">{stats.customers || 89}</div>
                <div className="stat-card-label">Khách hàng mới</div>
              </div>

              <div className="stat-card pending">
                <div className="stat-card-header">
                  <div className="stat-card-icon">
                    <ClockCircleOutlined />
                  </div>
                  <div className={`stat-card-trend ${stats.pendingChange >= 0 ? 'down' : 'up'}`}>
                    {stats.pendingChange >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    {Math.abs(stats.pendingChange || 5.1)}%
                  </div>
                </div>
                <div className="stat-card-value">{stats.pending || 12}</div>
                <div className="stat-card-label">Đơn chờ xử lý</div>
              </div>
            </div>

            {/* Charts */}
            <div className="dashboard-charts">
              <div className="chart-card">
                <div className="chart-card-header">
                  <h3 className="chart-card-title">📈 Doanh thu</h3>
                  <div className="chart-card-actions">
                    <button
                      className={`chart-filter-btn ${chartFilter === '7days' ? 'active' : ''}`}
                      onClick={() => setChartFilter('7days')}
                    >
                      7 ngày
                    </button>
                    <button
                      className={`chart-filter-btn ${chartFilter === '30days' ? 'active' : ''}`}
                      onClick={() => setChartFilter('30days')}
                    >
                      30 ngày
                    </button>
                    <button
                      className={`chart-filter-btn ${chartFilter === '1year' ? 'active' : ''}`}
                      onClick={() => setChartFilter('1year')}
                    >
                      1 năm
                    </button>
                  </div>
                </div>
                <div className="chart-placeholder">
                  📊 Biểu đồ doanh thu (Tích hợp Chart.js hoặc Recharts)
                </div>
              </div>

              <div className="chart-card">
                <div className="chart-card-header">
                  <h3 className="chart-card-title">🎯 Trạng thái đơn hàng</h3>
                </div>
                <div className="chart-placeholder">
                  🍩 Biểu đồ tròn trạng thái
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="dashboard-orders">
              <div className="orders-card">
                <div className="orders-card-header">
                  <h3 className="chart-card-title">📦 Đơn hàng gần đây</h3>
                  <button className="chart-filter-btn">Xem tất cả →</button>
                </div>
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Mã đơn</th>
                      <th>Khách hàng</th>
                      <th>Sản phẩm</th>
                      <th>Tổng tiền</th>
                      <th>Trạng thái</th>
                      <th>Ngày đặt</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map(order => (
                      <tr key={order._id}>
                        <td className="order-id">#{order.orderCode || order._id?.slice(-6)}</td>
                        <td>
                          <div className="order-customer">
                            <div className="customer-avatar">
                              {order.customerInfo?.name?.charAt(0) || 'U'}
                            </div>
                            <span>{order.customerInfo?.name || 'Khách hàng'}</span>
                          </div>
                        </td>
                        <td>{order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0} SP</td>
                        <td>{order.totalAmount?.toLocaleString('vi-VN')}đ</td>
                        <td>
                          <span className={`order-status-badge status-${order.status}`}>
                            {order.status === 'paid' ? 'Đã thanh toán' :
                             order.status === 'pending' ? 'Chờ thanh toán' :
                             order.status === 'shipped' ? 'Đang giao' :
                             order.status === 'delivered' ? 'Đã giao' :
                             order.status === 'cancelled' ? 'Đã hủy' : order.status}
                          </span>
                        </td>
                        <td>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                        <td>
                          <div className="order-actions">
                            <button className="action-btn" title="Xem">
                              <EyeOutlined />
                            </button>
                            <button className="action-btn" title="Sửa">
                              <EditOutlined />
                            </button>
                            <button className="action-btn" title="Xóa">
                              <DeleteOutlined />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Products */}
            <div className="dashboard-top-products">
              <div className="chart-card-header" style={{ marginBottom: '24px' }}>
                <h3 className="chart-card-title">🏆 Sản phẩm bán chạy</h3>
                <button className="chart-filter-btn">Xem tất cả →</button>
              </div>
              {topProducts.map((product, index) => (
                <div key={product._id} className="top-product-item">
                  <div className="product-rank">#{index + 1}</div>
                  <img
                    src={product.images?.[0]?.url || '/images/placeholder.png'}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                    <div className="product-meta">{product.sold} đã bán</div>
                    <div className="product-progress">
                      <div
                        className="product-progress-bar"
                        style={{ width: `${(product.revenue / (product.maxRevenue || 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="product-revenue">
                    <span className="revenue-amount">
                      {product.revenue?.toLocaleString('vi-VN')}đ
                    </span>
                    <span className="revenue-units">{product.sold} sp</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;


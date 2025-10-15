import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import {
  SearchOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  CheckCircleFilled,
  ClockCircleOutlined,
  CopyOutlined,
  FileTextOutlined,
  CustomerServiceOutlined,
  CloseCircleOutlined,
  TruckOutlined,
  ShoppingOutlined,
  CreditCardOutlined,
  InboxOutlined,
  RocketOutlined,
  SmileOutlined
} from '@ant-design/icons';
import axios from 'axios';
import './OrderTrackingPage.css';

const OrderTrackingPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);

  // Load recent orders from localStorage
  useEffect(() => {
    const recent = localStorage.getItem('recentOrderSearches');
    if (recent) {
      setRecentOrders(JSON.parse(recent));
    }
  }, []);

  // Search order by ID or email
  const handleSearch = async (orderNumber) => {
    const searchTerm = orderNumber || searchValue;
    if (!searchTerm.trim()) {
      message.warning('Vui lòng nhập mã đơn hàng hoặc email');
      return;
    }

    setLoading(true);
    setError(null);
    setOrderData(null);

    try {
      // Call API to search order
      const response = await axios.get(`/api/orders/track/${searchTerm}`);
      setOrderData(response.data);

      // Save to recent searches
      const updated = [searchTerm, ...recentOrders.filter(o => o !== searchTerm)].slice(0, 5);
      setRecentOrders(updated);
      localStorage.setItem('recentOrderSearches', JSON.stringify(updated));

      message.success('Tìm thấy đơn hàng!');
    } catch (err) {
      console.error('Error fetching order:', err);
      setError(err.response?.data?.message || 'Không tìm thấy đơn hàng. Vui lòng kiểm tra lại mã đơn hàng hoặc email.');
    } finally {
      setLoading(false);
    }
  };

  // Copy tracking number
  const handleCopyTracking = (trackingNumber) => {
    navigator.clipboard.writeText(trackingNumber);
    message.success('Đã sao chép mã vận đơn!');
  };

  // Download invoice
  const handleDownloadInvoice = () => {
    message.info('Đang tải hóa đơn...');
    // Implement PDF download
  };

  // Contact support
  const handleContactSupport = () => {
    message.info('Đang kết nối với hỗ trợ khách hàng...');
    // Open chat or redirect to support
  };

  // Cancel order
  const handleCancelOrder = () => {
    if (window.confirm('Bạn có chắc muốn hủy đơn hàng này?')) {
      message.success('Yêu cầu hủy đơn đã được gửi');
      // Call API to cancel order
    }
  };

  // Get status badge class
  const getStatusClass = (status) => {
    const statusMap = {
      'pending': 'status-pending',
      'paid': 'status-paid',
      'processing': 'status-processing',
      'shipped': 'status-shipped',
      'delivered': 'status-delivered',
      'cancelled': 'status-cancelled',
    };
    return statusMap[status] || 'status-pending';
  };

  // Get status text
  const getStatusText = (status) => {
    const statusMap = {
      'pending': 'Chờ thanh toán',
      'paid': 'Đã thanh toán',
      'processing': 'Đang xử lý',
      'shipped': 'Đang giao',
      'delivered': 'Đã giao',
      'cancelled': 'Đã hủy',
    };
    return statusMap[status] || status;
  };

  // Timeline stages
  const getTimelineStages = () => {
    if (!orderData) return [];

    const stages = [
      {
        id: 'placed',
        title: 'Đơn hàng đã đặt',
        description: 'Đơn hàng của bạn đã được tiếp nhận',
        icon: <ShoppingOutlined />,
        timestamp: orderData.createdAt,
      },
      {
        id: 'paid',
        title: 'Thanh toán thành công',
        description: 'Đã xác nhận thanh toán',
        icon: <CreditCardOutlined />,
        timestamp: orderData.paidAt,
      },
      {
        id: 'processing',
        title: 'Đang chuẩn bị hàng',
        description: 'Nhân viên đang đóng gói sản phẩm của bạn',
        icon: <InboxOutlined />,
        timestamp: orderData.processingAt,
      },
      {
        id: 'shipped',
        title: 'Đang vận chuyển',
        description: orderData.shippingInfo?.trackingNumber 
          ? `Mã vận đơn: ${orderData.shippingInfo.trackingNumber}`
          : 'Đơn hàng đang trên đường giao đến bạn',
        icon: <TruckOutlined />,
        timestamp: orderData.shippedAt,
      },
      {
        id: 'delivered',
        title: 'Đã giao hàng',
        description: 'Đơn hàng đã được giao thành công',
        icon: <SmileOutlined />,
        timestamp: orderData.deliveredAt,
      },
    ];

    // Determine current stage
    const statusStage = {
      'pending': 0,
      'paid': 1,
      'processing': 2,
      'shipped': 3,
      'delivered': 4,
    };

    const currentStageIndex = statusStage[orderData.status] || 0;

    return stages.map((stage, index) => ({
      ...stage,
      status: index < currentStageIndex ? 'completed' 
            : index === currentStageIndex ? 'current' 
            : 'pending',
    }));
  };

  // Calculate delivery countdown
  const getDeliveryCountdown = () => {
    if (!orderData?.estimatedDelivery) return null;
    
    const now = new Date();
    const delivery = new Date(orderData.estimatedDelivery);
    const diff = delivery - now;
    
    if (diff < 0) return 'Đã quá hạn giao';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `Còn ${days} ngày ${hours} giờ`;
    return `Còn ${hours} giờ`;
  };

  return (
    <div className="order-tracking-page">
      <div className="tracking-container">
        {/* Search Section */}
        <div className="tracking-search-section">
          <h1 className="tracking-search-title">🔍 Tra Cứu Đơn Hàng</h1>
          <p className="tracking-search-subtitle">
            Nhập mã đơn hàng hoặc email để theo dõi tình trạng giao hàng
          </p>
          
          <div className="tracking-search-form">
            <input
              type="text"
              className="tracking-search-input"
              placeholder="Nhập mã đơn hàng (VD: ORD123456) hoặc email..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="tracking-search-btn" onClick={() => handleSearch()}>
              <SearchOutlined />
              Tra cứu
            </button>
          </div>

          {/* Recent Searches */}
          {recentOrders.length > 0 && (
            <div className="recent-orders">
              <p className="recent-orders-title">Tìm kiếm gần đây:</p>
              <div className="recent-orders-list">
                {recentOrders.map((order, idx) => (
                  <div
                    key={idx}
                    className="recent-order-chip"
                    onClick={() => handleSearch(order)}
                  >
                    {order}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="tracking-result">
            <div className="tracking-loading">
              <div className="loading-spinner" />
              <p className="loading-text">Đang tra cứu đơn hàng...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="tracking-result">
            <div className="tracking-error">
              <div className="error-icon">📦</div>
              <h3 className="error-title">Không tìm thấy đơn hàng</h3>
              <p className="error-message">{error}</p>
              <button className="tracking-search-btn" onClick={() => setError(null)}>
                Thử lại
              </button>
            </div>
          </div>
        )}

        {/* Order Details */}
        {orderData && !loading && !error && (
          <div className="tracking-result">
            {/* Order Header */}
            <div className="tracking-order-header">
              <div className="tracking-order-info">
                <h2>Đơn hàng #{orderData.orderCode || orderData._id?.slice(-8).toUpperCase()}</h2>
                <div className="tracking-order-meta">
                  <span>
                    <CalendarOutlined />
                    {new Date(orderData.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                  <span>
                    <ShoppingOutlined />
                    {orderData.items?.length || 0} sản phẩm
                  </span>
                </div>
              </div>
              <div className={`tracking-status-badge ${getStatusClass(orderData.status)}`}>
                {getStatusText(orderData.status)}
              </div>
            </div>

            {/* Estimated Delivery */}
            {orderData.estimatedDelivery && orderData.status !== 'delivered' && orderData.status !== 'cancelled' && (
              <div className="tracking-delivery-estimate">
                <div className="delivery-icon">🚚</div>
                <div className="delivery-info">
                  <h3>Dự kiến giao hàng</h3>
                  <div className="delivery-date">
                    {new Date(orderData.estimatedDelivery).toLocaleDateString('vi-VN', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                    })}
                  </div>
                  <div className="delivery-countdown">{getDeliveryCountdown()}</div>
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="tracking-timeline">
              <div className="timeline-line" />
              {getTimelineStages().map((stage) => (
                <div key={stage.id} className={`timeline-item ${stage.status}`}>
                  <div className="timeline-dot">
                    {stage.status === 'completed' ? <CheckCircleFilled /> : stage.icon}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-title">{stage.title}</div>
                    <div className="timeline-description">{stage.description}</div>
                    {stage.timestamp && (
                      <div className="timeline-timestamp">
                        <ClockCircleOutlined />
                        {new Date(stage.timestamp).toLocaleString('vi-VN')}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Items */}
            <div className="tracking-items-section">
              <h3 className="tracking-section-title">
                <InboxOutlined />
                Sản phẩm đã đặt
              </h3>
              {orderData.items?.map((item, index) => (
                <div key={index} className="tracking-item-card">
                  <img
                    src={item.productId?.images?.[0]?.url || item.image || '/images/placeholder.png'}
                    alt={item.productId?.name || item.name || 'Sản phẩm'}
                    className="tracking-item-image"
                  />
                  <div className="tracking-item-info">
                    <div className="tracking-item-name">
                      {item.productId?.name || item.name || 'Sản phẩm'}
                    </div>
                    <div className="tracking-item-variant">
                      {item.size && `Size: ${item.size}`}
                      {item.size && item.color && ' • '}
                      {item.color && `Màu: ${item.color}`}
                    </div>
                    <div className="tracking-item-price">
                      {item.price?.toLocaleString('vi-VN')}đ × {item.quantity}
                    </div>
                  </div>
                  <div className="tracking-item-quantity">
                    <div className="quantity-label">Số lượng</div>
                    <div className="quantity-value">×{item.quantity}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping Info */}
            <div className="tracking-shipping-info">
              <h3 className="tracking-section-title">
                <TruckOutlined />
                Thông tin giao hàng
              </h3>
              <div className="shipping-info-grid">
                <div className="shipping-info-item">
                  <h4><EnvironmentOutlined /> Địa chỉ giao hàng</h4>
                  <p>
                    <strong>{orderData.customerInfo?.name}</strong><br />
                    {orderData.customerInfo?.phone}<br />
                    {[
                      orderData.customerInfo?.address,
                      orderData.customerInfo?.ward,
                      orderData.customerInfo?.district,
                      orderData.customerInfo?.city
                    ].filter(Boolean).join(', ')}
                  </p>
                </div>

                {orderData.shippingInfo?.trackingNumber && (
                  <div className="shipping-info-item">
                    <h4><RocketOutlined /> Đơn vị vận chuyển</h4>
                    <div className="courier-info">
                      <div className="courier-logo">🚚</div>
                      <div>
                        <p><strong>{orderData.shippingInfo.courier || 'Giao hàng nhanh'}</strong></p>
                        <div
                          className="tracking-number-copy"
                          onClick={() => handleCopyTracking(orderData.shippingInfo.trackingNumber)}
                        >
                          <span>{orderData.shippingInfo.trackingNumber}</span>
                          <CopyOutlined />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="tracking-actions">
              <button className="tracking-action-btn btn-primary" onClick={handleDownloadInvoice}>
                <FileTextOutlined />
                Tải hóa đơn
              </button>
              <button className="tracking-action-btn btn-secondary" onClick={handleContactSupport}>
                <CustomerServiceOutlined />
                Liên hệ hỗ trợ
              </button>
              {(orderData.status === 'pending' || orderData.status === 'paid') && (
                <button className="tracking-action-btn btn-danger" onClick={handleCancelOrder}>
                  <CloseCircleOutlined />
                  Hủy đơn hàng
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTrackingPage;


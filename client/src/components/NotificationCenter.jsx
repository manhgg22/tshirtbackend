import React, { useState, useEffect } from 'react';
import { 
  BellOutlined, 
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  CloseOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import './NotificationCenter.css';

const NotificationCenter = ({ position = 'top-right' }) => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Load notifications from localStorage
    const saved = localStorage.getItem('notifications');
    if (saved) {
      const parsed = JSON.parse(saved);
      setNotifications(parsed);
      setUnreadCount(parsed.filter(n => !n.read).length);
    }

    // Listen for new notifications
    window.addEventListener('newNotification', handleNewNotification);
    return () => window.removeEventListener('newNotification', handleNewNotification);
  }, []);

  const handleNewNotification = (event) => {
    const newNotif = {
      id: Date.now(),
      ...event.detail,
      read: false,
      timestamp: new Date().toISOString(),
    };
    
    const updated = [newNotif, ...notifications];
    setNotifications(updated);
    setUnreadCount(prev => prev + 1);
    localStorage.setItem('notifications', JSON.stringify(updated));
    
    // Show toast notification
    showToast(newNotif);
  };

  const showToast = (notif) => {
    const toast = document.createElement('div');
    toast.className = `notification-toast ${notif.type || 'info'}`;
    toast.innerHTML = `
      <div class="toast-icon">${getIcon(notif.type)}</div>
      <div class="toast-content">
        <div class="toast-title">${notif.title}</div>
        <div class="toast-message">${notif.message}</div>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  };

  const getIcon = (type) => {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️',
    };
    return icons[type] || icons.info;
  };

  const markAsRead = (id) => {
    const updated = notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    setUnreadCount(updated.filter(n => !n.read).length);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const deleteNotification = (id) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    setUnreadCount(updated.filter(n => !n.read).length);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    setUnreadCount(0);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
    localStorage.removeItem('notifications');
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (days > 0) return `${days} ngày trước`;
    if (hours > 0) return `${hours} giờ trước`;
    if (minutes > 0) return `${minutes} phút trước`;
    return 'Vừa xong';
  };

  return (
    <>
      {/* Bell Icon */}
      <div className="notification-bell" onClick={() => setIsOpen(!isOpen)}>
        <BellOutlined />
        {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
      </div>

      {/* Notification Panel */}
      {isOpen && (
        <>
          <div className="notification-overlay" onClick={() => setIsOpen(false)} />
          <div className={`notification-panel ${position}`}>
            <div className="notification-header">
              <h3>
                <BellOutlined /> Thông báo
                {unreadCount > 0 && <span className="unread-count">({unreadCount})</span>}
              </h3>
              <div className="notification-header-actions">
                {notifications.length > 0 && (
                  <>
                    <button onClick={markAllAsRead} title="Đánh dấu đã đọc">
                      <CheckCircleOutlined />
                    </button>
                    <button onClick={clearAll} title="Xóa tất cả">
                      <DeleteOutlined />
                    </button>
                  </>
                )}
                <button onClick={() => setIsOpen(false)}>
                  <CloseOutlined />
                </button>
              </div>
            </div>

            <div className="notification-list">
              {notifications.length === 0 ? (
                <div className="notification-empty">
                  <BellOutlined style={{ fontSize: 48, opacity: 0.3 }} />
                  <p>Chưa có thông báo mới</p>
                </div>
              ) : (
                notifications.map(notif => (
                  <div
                    key={notif.id}
                    className={`notification-item ${notif.type} ${notif.read ? 'read' : 'unread'}`}
                    onClick={() => markAsRead(notif.id)}
                  >
                    <div className="notification-item-icon">
                      {notif.type === 'success' && <CheckCircleOutlined />}
                      {notif.type === 'error' && <CloseCircleOutlined />}
                      {notif.type === 'warning' && <WarningOutlined />}
                      {notif.type === 'info' && <InfoCircleOutlined />}
                    </div>
                    <div className="notification-item-content">
                      <div className="notification-item-title">{notif.title}</div>
                      <div className="notification-item-message">{notif.message}</div>
                      <div className="notification-item-time">{getTimeAgo(notif.timestamp)}</div>
                    </div>
                    <button
                      className="notification-item-delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notif.id);
                      }}
                    >
                      <CloseOutlined />
                    </button>
                    {!notif.read && <div className="notification-item-unread-dot" />}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

// Utility function to send notifications
export const sendNotification = (notification) => {
  const event = new CustomEvent('newNotification', { detail: notification });
  window.dispatchEvent(event);
};

export default NotificationCenter;


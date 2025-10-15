/**
 * Email Templates for Vietnamese Spirit E-commerce
 * These templates can be used with email services like SendGrid, Mailgun, etc.
 */

// Color scheme
const colors = {
  primary: '#667eea',
  secondary: '#764ba2',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  text: '#1a202c',
  textLight: '#718096',
  background: '#f7fafc',
  white: '#ffffff',
};

// Base email template
const baseTemplate = (content) => `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vietnamese Spirit</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: ${colors.background};
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: ${colors.white};
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
      color: ${colors.white};
      padding: 40px 30px;
      text-align: center;
    }
    .logo { font-size: 32px; margin-bottom: 8px; }
    .header h1 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
    .header p { font-size: 16px; opacity: 0.9; }
    .content { padding: 40px 30px; }
    .footer {
      background: ${colors.background};
      padding: 30px;
      text-align: center;
      font-size: 14px;
      color: ${colors.textLight};
    }
    .button {
      display: inline-block;
      padding: 14px 32px;
      background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
      color: ${colors.white};
      text-decoration: none;
      border-radius: 10px;
      font-weight: 600;
      margin: 20px 0;
    }
    .order-info {
      background: ${colors.background};
      border-radius: 12px;
      padding: 20px;
      margin: 20px 0;
    }
    .order-info-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #e2e8f0;
    }
    .order-info-row:last-child { border-bottom: none; }
    .label { color: ${colors.textLight}; font-size: 14px; }
    .value { color: ${colors.text}; font-weight: 600; font-size: 14px; }
    .product-item {
      display: flex;
      gap: 15px;
      padding: 15px;
      background: ${colors.background};
      border-radius: 10px;
      margin-bottom: 12px;
    }
    .product-image {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 8px;
    }
    .product-info { flex: 1; }
    .product-name { font-weight: 600; color: ${colors.text}; margin-bottom: 6px; }
    .product-meta { font-size: 13px; color: ${colors.textLight}; }
    .total { 
      font-size: 24px; 
      font-weight: 700; 
      color: ${colors.primary}; 
      text-align: right;
      margin-top: 20px;
    }
    .status-badge {
      display: inline-block;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .status-success { background: #d1fae5; color: #065f46; }
    .status-warning { background: #fef3c7; color: #92400e; }
    .status-info { background: #dbeafe; color: #1e40af; }
  </style>
</head>
<body>
  ${content}
</body>
</html>
`;

/**
 * Order Confirmation Email
 */
export const orderConfirmationEmail = (order) => {
  const content = `
    <div class="container">
      <div class="header">
        <div class="logo">👕</div>
        <h1>Đặt hàng thành công!</h1>
        <p>Cảm ơn bạn đã tin tưởng Vietnamese Spirit</p>
      </div>
      
      <div class="content">
        <h2 style="color: ${colors.text}; margin-bottom: 20px;">Xin chào ${order.customerInfo?.name},</h2>
        <p style="color: ${colors.textLight}; line-height: 1.6; margin-bottom: 20px;">
          Chúng tôi đã nhận được đơn hàng của bạn và đang xử lý. Dưới đây là thông tin chi tiết:
        </p>

        <div class="order-info">
          <div class="order-info-row">
            <span class="label">Mã đơn hàng:</span>
            <span class="value">#${order.orderCode || order._id?.slice(-8)}</span>
          </div>
          <div class="order-info-row">
            <span class="label">Ngày đặt:</span>
            <span class="value">${new Date(order.createdAt).toLocaleDateString('vi-VN')}</span>
          </div>
          <div class="order-info-row">
            <span class="label">Trạng thái:</span>
            <span class="value">
              <span class="status-badge status-${order.status === 'paid' ? 'success' : 'warning'}">
                ${order.status === 'paid' ? 'Đã thanh toán' : 'Chờ thanh toán'}
              </span>
            </span>
          </div>
          <div class="order-info-row">
            <span class="label">Dự kiến giao:</span>
            <span class="value">${order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString('vi-VN') : '2-3 ngày'}</span>
          </div>
        </div>

        <h3 style="color: ${colors.text}; margin: 30px 0 16px;">Sản phẩm đã đặt:</h3>
        ${order.items?.map(item => `
          <div class="product-item">
            <img src="${item.productId?.images?.[0]?.url || item.image || 'https://via.placeholder.com/80'}" 
                 alt="${item.productId?.name || item.name}" 
                 class="product-image" />
            <div class="product-info">
              <div class="product-name">${item.productId?.name || item.name}</div>
              <div class="product-meta">
                ${item.size ? `Size: ${item.size}` : ''} 
                ${item.size && item.color ? ' • ' : ''}
                ${item.color ? `Màu: ${item.color}` : ''}
                <br />
                Số lượng: ${item.quantity} × ${item.price?.toLocaleString('vi-VN')}đ
              </div>
            </div>
            <div style="text-align: right; font-weight: 600; color: ${colors.primary};">
              ${(item.price * item.quantity).toLocaleString('vi-VN')}đ
            </div>
          </div>
        `).join('')}

        <div class="total">
          Tổng cộng: ${order.totalAmount?.toLocaleString('vi-VN')}đ
        </div>

        <h3 style="color: ${colors.text}; margin: 30px 0 16px;">Địa chỉ giao hàng:</h3>
        <div style="background: ${colors.background}; border-radius: 10px; padding: 16px; line-height: 1.8;">
          <strong>${order.customerInfo?.name}</strong><br />
          ${order.customerInfo?.phone}<br />
          ${[
            order.customerInfo?.address,
            order.customerInfo?.ward,
            order.customerInfo?.district,
            order.customerInfo?.city
          ].filter(Boolean).join(', ')}
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="${process.env.REACT_APP_BASE_URL || 'http://localhost:3000'}/track?order=${order.orderCode || order._id}" 
             class="button">
            Theo dõi đơn hàng
          </a>
        </div>
      </div>

      <div class="footer">
        <p>Cần hỗ trợ? Liên hệ: <strong>support@vietnamesespirit.vn</strong></p>
        <p style="margin-top: 8px;">Hotline: <strong>1900 xxxx</strong></p>
        <p style="margin-top: 16px; font-size: 12px;">
          © ${new Date().getFullYear()} Vietnamese Spirit. All rights reserved.
        </p>
      </div>
    </div>
  `;
  
  return baseTemplate(content);
};

/**
 * Shipping Notification Email
 */
export const shippingNotificationEmail = (order) => {
  const content = `
    <div class="container">
      <div class="header">
        <div class="logo">🚚</div>
        <h1>Đơn hàng đang được giao!</h1>
        <p>Gói hàng của bạn đang trên đường tới</p>
      </div>
      
      <div class="content">
        <h2 style="color: ${colors.text}; margin-bottom: 20px;">Xin chào ${order.customerInfo?.name},</h2>
        <p style="color: ${colors.textLight}; line-height: 1.6; margin-bottom: 20px;">
          Đơn hàng <strong>#${order.orderCode || order._id?.slice(-8)}</strong> của bạn đã được giao cho đơn vị vận chuyển!
        </p>

        <div style="background: linear-gradient(135deg, ${colors.primary}20 0%, ${colors.secondary}20 100%); 
                    border-radius: 12px; padding: 24px; margin: 20px 0; text-align: center;">
          <h3 style="color: ${colors.text}; margin-bottom: 12px;">Mã vận đơn</h3>
          <div style="font-size: 24px; font-weight: 700; color: ${colors.primary}; letter-spacing: 2px;">
            ${order.shippingInfo?.trackingNumber || 'Đang cập nhật'}
          </div>
          <p style="color: ${colors.textLight}; margin-top: 8px; font-size: 13px;">
            Đơn vị vận chuyển: ${order.shippingInfo?.courier || 'Giao hàng nhanh'}
          </p>
        </div>

        <div class="order-info">
          <div class="order-info-row">
            <span class="label">Dự kiến giao hàng:</span>
            <span class="value" style="color: ${colors.success};">
              ${order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString('vi-VN', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              }) : '2-3 ngày'}
            </span>
          </div>
          <div class="order-info-row">
            <span class="label">Địa chỉ giao hàng:</span>
            <span class="value">
              ${[order.customerInfo?.ward, order.customerInfo?.district, order.customerInfo?.city].filter(Boolean).join(', ')}
            </span>
          </div>
        </div>

        <div style="background: ${colors.background}; border-radius: 10px; padding: 20px; margin-top: 24px;">
          <h4 style="color: ${colors.text}; margin-bottom: 12px;">💡 Lưu ý khi nhận hàng:</h4>
          <ul style="color: ${colors.textLight}; line-height: 2; padding-left: 20px;">
            <li>Kiểm tra tình trạng bên ngoài hộp hàng</li>
            <li>Đối chiếu số lượng sản phẩm với đơn hàng</li>
            <li>Quay video khi mở hộp (nếu cần bảo hành)</li>
            <li>Ký xác nhận đã nhận hàng</li>
          </ul>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="${process.env.REACT_APP_BASE_URL || 'http://localhost:3000'}/track?order=${order.orderCode || order._id}" 
             class="button">
            Theo dõi vận chuyển
          </a>
        </div>
      </div>

      <div class="footer">
        <p>Cần hỗ trợ? Liên hệ: <strong>support@vietnamesespirit.vn</strong></p>
        <p style="margin-top: 16px; font-size: 12px;">
          © ${new Date().getFullYear()} Vietnamese Spirit. All rights reserved.
        </p>
      </div>
    </div>
  `;
  
  return baseTemplate(content);
};

/**
 * Order Delivered Email
 */
export const orderDeliveredEmail = (order) => {
  const content = `
    <div class="container">
      <div class="header">
        <div class="logo">✅</div>
        <h1>Giao hàng thành công!</h1>
        <p>Cảm ơn bạn đã mua hàng</p>
      </div>
      
      <div class="content">
        <h2 style="color: ${colors.text}; margin-bottom: 20px;">Xin chào ${order.customerInfo?.name},</h2>
        <p style="color: ${colors.textLight}; line-height: 1.6; margin-bottom: 20px;">
          Đơn hàng <strong>#${order.orderCode || order._id?.slice(-8)}</strong> đã được giao thành công! 
          Hy vọng bạn hài lòng với sản phẩm.
        </p>

        <div style="background: linear-gradient(135deg, ${colors.success}20 0%, ${colors.success}40 100%); 
                    border-radius: 12px; padding: 24px; margin: 20px 0; text-align: center;">
          <div style="font-size: 48px; margin-bottom: 12px;">🎉</div>
          <h3 style="color: ${colors.success};">Cảm ơn bạn đã tin tưởng!</h3>
          <p style="color: ${colors.textLight}; margin-top: 8px;">
            Chúng tôi rất mong nhận được đánh giá của bạn
          </p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.REACT_APP_BASE_URL || 'http://localhost:3000'}/orders/${order._id}/review" 
             class="button">
            Đánh giá sản phẩm
          </a>
        </div>

        <div style="background: ${colors.background}; border-radius: 10px; padding: 20px;">
          <h4 style="color: ${colors.text}; margin-bottom: 12px;">🎁 Ưu đãi dành cho bạn:</h4>
          <p style="color: ${colors.textLight}; line-height: 1.8;">
            Sử dụng mã <strong style="color: ${colors.primary};">THANKSLOYALTY10</strong> 
            để nhận giảm giá 10% cho đơn hàng tiếp theo!
          </p>
        </div>
      </div>

      <div class="footer">
        <p>Hỗ trợ & bảo hành: <strong>support@vietnamesespirit.vn</strong></p>
        <p style="margin-top: 16px; font-size: 12px;">
          © ${new Date().getFullYear()} Vietnamese Spirit. All rights reserved.
        </p>
      </div>
    </div>
  `;
  
  return baseTemplate(content);
};

/**
 * Order Cancelled Email
 */
export const orderCancelledEmail = (order, reason) => {
  const content = `
    <div class="container">
      <div class="header" style="background: linear-gradient(135deg, #64748b 0%, #475569 100%);">
        <div class="logo">❌</div>
        <h1>Đơn hàng đã bị hủy</h1>
        <p>Thông báo hủy đơn hàng</p>
      </div>
      
      <div class="content">
        <h2 style="color: ${colors.text}; margin-bottom: 20px;">Xin chào ${order.customerInfo?.name},</h2>
        <p style="color: ${colors.textLight}; line-height: 1.6; margin-bottom: 20px;">
          Đơn hàng <strong>#${order.orderCode || order._id?.slice(-8)}</strong> đã bị hủy.
        </p>

        ${reason ? `
          <div style="background: #fee2e2; border-left: 4px solid ${colors.danger}; border-radius: 8px; padding: 16px; margin: 20px 0;">
            <strong>Lý do hủy:</strong><br />
            <p style="margin-top: 8px;">${reason}</p>
          </div>
        ` : ''}

        <div class="order-info">
          <div class="order-info-row">
            <span class="label">Tổng tiền đã thanh toán:</span>
            <span class="value">${order.totalAmount?.toLocaleString('vi-VN')}đ</span>
          </div>
          <div class="order-info-row">
            <span class="label">Trạng thái hoàn tiền:</span>
            <span class="value" style="color: ${colors.warning};">Đang xử lý</span>
          </div>
          <div class="order-info-row">
            <span class="label">Thời gian hoàn tiền:</span>
            <span class="value">3-5 ngày làm việc</span>
          </div>
        </div>

        <p style="color: ${colors.textLight}; line-height: 1.6; margin-top: 20px;">
          Nếu bạn đã thanh toán, số tiền sẽ được hoàn lại trong vòng 3-5 ngày làm việc.
          Mọi thắc mắc xin vui lòng liên hệ bộ phận chăm sóc khách hàng.
        </p>
      </div>

      <div class="footer">
        <p>Liên hệ hỗ trợ: <strong>support@vietnamesespirit.vn</strong> | Hotline: <strong>1900 xxxx</strong></p>
        <p style="margin-top: 16px; font-size: 12px;">
          © ${new Date().getFullYear()} Vietnamese Spirit. All rights reserved.
        </p>
      </div>
    </div>
  `;
  
  return baseTemplate(content);
};

// Export utility function to send emails
export const sendEmail = async (to, subject, htmlContent) => {
  try {
    // This would integrate with your email service (SendGrid, Mailgun, etc.)
    const response = await fetch('/api/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, html: htmlContent }),
    });
    return response.json();
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export default {
  orderConfirmationEmail,
  shippingNotificationEmail,
  orderDeliveredEmail,
  orderCancelledEmail,
  sendEmail,
};


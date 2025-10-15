import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import {
  ShoppingCartOutlined,
  CheckCircleOutlined,
  UserOutlined,
  HomeOutlined,
  CreditCardOutlined,
  DownOutlined,
  LoadingOutlined,
  CheckOutlined,
  CopyOutlined,
  ClockCircleOutlined,
  SafetyOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { clearCart } from '../redux/cartSlice';
import axios from 'axios';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: cartItems, promoCode, discount, shippingFee } = useSelector((state) => state.cart);

  // Step management
  const [currentStep, setCurrentStep] = useState(1);

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    province: '',
    provinceCode: '',
    district: '',
    districtCode: '',
    ward: '',
    note: '',
  });

  // Form validation errors
  const [errors, setErrors] = useState({});

  // Provinces API data
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [loadingProvinces, setLoadingProvinces] = useState(true);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);

  // Order & Payment
  const [orderCreated, setOrderCreated] = useState(null);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [countdown, setCountdown] = useState(900); // 15 minutes
  const [loading, setLoading] = useState(false);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal - discountAmount + shippingFee;

  // Load provinces on mount
  useEffect(() => {
    fetchProvinces();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (orderCreated && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [orderCreated, countdown]);

  // Format countdown time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Fetch provinces from API
  const fetchProvinces = async () => {
    setLoadingProvinces(true);
    try {
      const response = await axios.get('https://provinces.open-api.vn/api/p/');
      console.log('✅ Provinces loaded:', response.data.length);
      console.log('📋 Provinces data:', response.data.slice(0, 5)); // Show first 5
      setProvinces(response.data);
    } catch (error) {
      console.error('❌ Error fetching provinces:', error);
      message.error('Không thể tải danh sách tỉnh/thành phố');
      // Fallback to manual data if API fails
      const fallbackProvinces = [
        { code: '01', name: 'Thành phố Hà Nội' },
        { code: '79', name: 'Thành phố Hồ Chí Minh' },
        { code: '48', name: 'Thành phố Đà Nẵng' },
        { code: '92', name: 'Thành phố Cần Thơ' },
        { code: '31', name: 'Thành phố Hải Phòng' },
        { code: '27', name: 'Tỉnh Bắc Ninh' },
      ];
      setProvinces(fallbackProvinces);
      console.log('📋 Using fallback provinces:', fallbackProvinces);
    } finally {
      setLoadingProvinces(false);
    }
  };

  // Fetch districts when province changes
  const fetchDistricts = async (provinceCode) => {
    setLoadingDistricts(true);
    try {
      const response = await axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
      console.log('✅ Districts loaded:', response.data.districts?.length);
      setDistricts(response.data.districts || []);
      setWards([]);
    } catch (error) {
      console.error('❌ Error fetching districts:', error);
      message.error('Không thể tải danh sách quận/huyện. Vui lòng nhập thủ công.');
      setDistricts([]);
    } finally {
      setLoadingDistricts(false);
    }
  };

  // Fetch wards when district changes
  const fetchWards = async (districtCode) => {
    setLoadingWards(true);
    try {
      const response = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
      console.log('✅ Wards loaded:', response.data.wards?.length);
      setWards(response.data.wards || []);
      } catch (error) {
      console.error('❌ Error fetching wards:', error);
      message.error('Không thể tải danh sách phường/xã. Vui lòng nhập thủ công.');
      setWards([]);
      } finally {
      setLoadingWards(false);
    }
  };

  // Handle province selection
  const handleProvinceChange = (e) => {
    const provinceCode = e.target.value;
    const selectedOption = e.target.options[e.target.selectedIndex];
    const provinceName = selectedOption?.text || '';
    
    console.log('🏙️ Province selected CODE:', provinceCode);
    console.log('🏙️ Province selected NAME:', provinceName);
    
    const province = provinces.find((p) => p.code === provinceCode);
    console.log('🏙️ Province found in array:', province);
    
    // Update form data first - use text from option if province not found
    setFormData((prev) => {
      const newData = {
        ...prev,
        province: province?.name || provinceName || provinceCode,
        provinceCode,
        district: '',
        districtCode: '',
        ward: '',
      };
      console.log('📝 Updated formData:', newData);
      return newData;
    });
    
    // Then fetch districts
    if (provinceCode) {
      console.log('🔄 Fetching districts for:', provinceCode);
      fetchDistricts(provinceCode);
    } else {
      setDistricts([]);
      setWards([]);
    }
  };

  // Handle district selection
  const handleDistrictChange = (e) => {
    const districtCode = e.target.value;
    const selectedOption = e.target.options[e.target.selectedIndex];
    const districtName = selectedOption?.text || '';
    
    console.log('🏘️ District selected CODE:', districtCode);
    console.log('🏘️ District selected NAME:', districtName);
    
    const district = districts.find((d) => d.code === districtCode);
    console.log('🏘️ District found in array:', district);
    
    // Update form data first - use text from option if district not found
    setFormData((prev) => ({
      ...prev,
      district: district?.name || districtName || districtCode,
      districtCode,
      ward: '',
    }));
    
    // Then fetch wards
    if (districtCode) {
      fetchWards(districtCode);
    } else {
      setWards([]);
    }
  };

  // Handle ward selection
  const handleWardChange = (e) => {
    const wardValue = e.target.value;
    setFormData((prev) => ({ ...prev, ward: wardValue }));
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Use functional update to avoid stale state
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    console.log('🔍 Validating form data:', formData);
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập họ tên';
    if (!formData.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại';
    else if (!/^[0-9]{10,11}$/.test(formData.phone)) newErrors.phone = 'Số điện thoại không hợp lệ';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email không hợp lệ';
    if (!formData.address.trim()) newErrors.address = 'Vui lòng nhập địa chỉ';
    if (!formData.province) {
      console.log('❌ Province missing:', formData.province);
      newErrors.province = 'Vui lòng chọn tỉnh/thành phố';
    }
    if (!formData.district) {
      console.log('❌ District missing:', formData.district);
      newErrors.district = 'Vui lòng chọn quận/huyện';
    }
    if (!formData.ward) {
      console.log('❌ Ward missing:', formData.ward);
      newErrors.ward = 'Vui lòng chọn phường/xã';
    }

    console.log('❌ Validation errors:', newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Go to next step
  const handleNext = () => {
    if (currentStep === 1) {
      // Validate cart
    if (cartItems.length === 0) {
        message.warning('Giỏ hàng trống!');
      return;
    }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Validate form
      console.log('🚀 Attempting to submit form...');
      console.log('📋 Current formData:', JSON.stringify(formData, null, 2));
      
      if (!validateForm()) {
        message.error('Vui lòng điền đầy đủ thông tin!');
        
        // Show detailed error in alert for debugging
        const missingFields = [];
        if (!formData.province) missingFields.push('Tỉnh/Thành phố');
        if (!formData.district) missingFields.push('Quận/Huyện');
        if (!formData.ward) missingFields.push('Phường/Xã');
        
        if (missingFields.length > 0) {
          console.error('❌ Missing fields:', missingFields.join(', '));
          alert(`DEBUG: Thiếu thông tin:\n${missingFields.join('\n')}\n\nFormData hiện tại:\nProvince: "${formData.province}"\nDistrict: "${formData.district}"\nWard: "${formData.ward}"`);
        }
      return;
      }
      setCurrentStep(3);
    }
  };

  // Go to previous step
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Create order
  const handleCreateOrder = async () => {
    setLoading(true);
    try {
      const orderData = {
        items: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        total: total,
        customerInfo: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email || '',
          address: formData.address,
          city: formData.province,
          district: formData.district,
          ward: formData.ward,
          note: formData.note || '',
        },
        shippingAddress: {
          street: formData.address,
          city: formData.province,
          state: formData.district,
          zipCode: '000000',
          country: 'Vietnam',
        },
        promoCode: promoCode,
        discount: discountAmount,
        shippingFee: shippingFee,
      };

      const response = await axios.post('http://localhost:5000/api/orders/create', orderData);
      setOrderCreated(response.data);
      
      // Generate QR Code data
      const qrData = {
        bankCode: 'TPBank',
        accountNumber: '0359937294',
        accountName: 'LE DUC MANH',
        amount: total,
        message: `Thanh toan don hang ${response.data.orderCode}`,
      };
      setQrCodeData(qrData);

      message.success('Tạo đơn hàng thành công!');
      dispatch(clearCart());
    } catch (error) {
      console.error('Error creating order:', error);
      message.error('Lỗi tạo đơn hàng: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    message.success('Đã sao chép!');
  };

  // Mark as paid
  const markAsPaid = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/${orderCreated._id}/mark-paid`);
      message.success('Đã xác nhận thanh toán!');
      navigate('/orders');
    } catch (error) {
      console.error('Error marking as paid:', error);
      message.error('Lỗi cập nhật trạng thái thanh toán');
    }
  };

  // Render success state (after order created)
  if (orderCreated) {
    return (
      <div className="checkout-container">
        <div className="checkout-wrapper">
          <div className="checkout-success-container">
            <div className="checkout-success-icon">
              <CheckCircleOutlined />
            </div>
            <h1 className="checkout-success-title">Đặt hàng thành công!</h1>
            <p className="checkout-success-subtitle">
              Cảm ơn bạn đã đặt hàng. Vui lòng thanh toán để hoàn tất đơn hàng.
            </p>
            <div className="checkout-order-code">
              Mã đơn hàng: #{orderCreated.orderCode}
        </div>

            <div className="checkout-main-layout">
              {/* Order Details */}
              <div className="checkout-form-section">
                <div className="checkout-form-card">
                  <h3 className="checkout-section-title">
                    <ShoppingCartOutlined className="checkout-section-icon" />
                    Thông tin đơn hàng
                  </h3>

                  <div className="checkout-cart-items">
                    {orderCreated.items.map((item, index) => {
                      // Get product info from either productId or cartItems
                      const cartItem = cartItems.find(ci => ci.productId === item.productId?._id || ci.productId === item.productId);
                      const productImage = item.productId?.images?.[0]?.url || cartItem?.image || '/images/placeholder.png';
                      const productName = item.productId?.name || cartItem?.name || 'Sản phẩm';
                      
                      return (
                        <div key={index} className="checkout-cart-item">
                          <img
                            src={productImage}
                            alt={productName}
                            className="checkout-cart-image"
                            onError={(e) => {
                              e.target.src = '/images/placeholder.png';
                            }}
                          />
                          <div className="checkout-cart-info">
                            <h4 className="checkout-cart-name">{productName}</h4>
                            <div className="checkout-cart-meta">
                              <span>Số lượng: {item.quantity}</span>
                              <span>{item.price.toLocaleString('vi-VN')}đ/sp</span>
                            </div>
                          </div>
                          <div className="checkout-cart-price">
                            {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ marginTop: '20px' }}>
                    <h4 style={{ marginBottom: '12px' }}>
                      <HomeOutlined /> Địa chỉ giao hàng
                    </h4>
                    <p><strong>Người nhận:</strong> {orderCreated.customerInfo?.name}</p>
                    <p><strong>SĐT:</strong> {orderCreated.customerInfo?.phone}</p>
                    <p>
                      <strong>Địa chỉ:</strong> {[
                        orderCreated.customerInfo?.address,
                        orderCreated.customerInfo?.ward,
                        orderCreated.customerInfo?.district,
                        orderCreated.customerInfo?.city
                      ].filter(Boolean).join(', ')}
                    </p>
                    {orderCreated.customerInfo?.note && (
                      <p><strong>Ghi chú:</strong> {orderCreated.customerInfo.note}</p>
                    )}
                  </div>
                </div>
        </div>

              {/* QR Payment */}
              <div className="checkout-summary-card">
                <h3 className="checkout-summary-title">
                  <CreditCardOutlined /> Thanh toán QR
                </h3>

                {qrCodeData && (
                  <div className="checkout-qr-modal">
                    <img
                      src={orderCreated.qrCode?.imageUrl || 'https://via.placeholder.com/300x300?text=QR+Code'}
              alt="QR Code" 
                      className="checkout-qr-code"
                    />

                    <div className="checkout-bank-info">
                      <h4 className="checkout-bank-title">Thông tin chuyển khoản</h4>
                      <div className="checkout-bank-row">
                        <span className="checkout-bank-label">Ngân hàng:</span>
                        <span className="checkout-bank-value">{qrCodeData.bankCode}</span>
                      </div>
                      <div className="checkout-bank-row">
                        <span className="checkout-bank-label">Số tài khoản:</span>
                        <span className="checkout-bank-value">
                          {qrCodeData.accountNumber}
                          <CopyOutlined
                            className="checkout-copy-btn"
                            onClick={() => copyToClipboard(qrCodeData.accountNumber)}
                          />
                        </span>
                      </div>
                      <div className="checkout-bank-row">
                        <span className="checkout-bank-label">Chủ tài khoản:</span>
                        <span className="checkout-bank-value">{qrCodeData.accountName}</span>
                      </div>
                      <div className="checkout-bank-row">
                        <span className="checkout-bank-label">Số tiền:</span>
                        <span className="checkout-bank-value" style={{ color: '#1890FF', fontSize: '18px' }}>
                          {qrCodeData.amount.toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                      <div className="checkout-bank-row">
                        <span className="checkout-bank-label">Nội dung:</span>
                        <span className="checkout-bank-value">
                          {qrCodeData.message}
                          <CopyOutlined
                            className="checkout-copy-btn"
                            onClick={() => copyToClipboard(qrCodeData.message)}
                          />
                        </span>
                      </div>
                    </div>

                    <div className="checkout-countdown">
                      <ClockCircleOutlined className="checkout-countdown-icon" />
                      <span className="checkout-countdown-text">Thời gian còn lại:</span>
                      <span className="checkout-countdown-time">{formatTime(countdown)}</span>
                    </div>

                    <div className="checkout-action-buttons">
                      <button className="checkout-submit-btn" onClick={markAsPaid}>
                        <CheckOutlined />
                        Tôi đã thanh toán
                      </button>
                      <button className="checkout-back-btn" onClick={() => navigate('/products')}>
                        Tiếp tục mua sắm
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render checkout form
  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        {/* Progress Steps */}
        <div className="checkout-progress">
          <div className="checkout-steps">
            <div className={`checkout-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
              <div className="checkout-step-circle">
                {currentStep > 1 ? <CheckOutlined /> : '1'}
              </div>
              <span className="checkout-step-label">Giỏ hàng</span>
              <div className="checkout-step-line" />
            </div>
            <div className={`checkout-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
              <div className="checkout-step-circle">
                {currentStep > 2 ? <CheckOutlined /> : '2'}
              </div>
              <span className="checkout-step-label">Thông tin</span>
              <div className="checkout-step-line" />
            </div>
            <div className={`checkout-step ${currentStep >= 3 ? 'active' : ''}`}>
              <div className="checkout-step-circle">3</div>
              <span className="checkout-step-label">Thanh toán</span>
            </div>
          </div>
        </div>

        <div className="checkout-main-layout">
          {/* Form Section */}
          <div className="checkout-form-section">
            {/* Step 1: Cart Review */}
            {currentStep === 1 && (
              <div className="checkout-form-card">
                <h3 className="checkout-section-title">
                  <ShoppingCartOutlined className="checkout-section-icon" />
                  Xem lại giỏ hàng
                </h3>
                <div className="checkout-cart-items">
                  {cartItems.map((item, index) => (
                    <div key={index} className="checkout-cart-item">
                      <img
                        src={item.image || '/images/placeholder.png'}
                        alt={item.name}
                        className="checkout-cart-image"
                      />
                      <div className="checkout-cart-info">
                        <h4 className="checkout-cart-name">{item.name}</h4>
                        <div className="checkout-cart-meta">
                          <span>Size: {item.size}</span>
                          <span>Màu: {item.color}</span>
                          <span>SL: {item.quantity}</span>
                        </div>
                      </div>
                      <div className="checkout-cart-price">
                        {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Shipping Info */}
            {currentStep === 2 && (
              <div className="checkout-form-card">
                <h3 className="checkout-section-title">
                  <UserOutlined className="checkout-section-icon" />
                  Thông tin giao hàng
                </h3>

                {/* Name & Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="checkout-form-group">
                    <input
          type="text" 
                      name="name"
                      className={`checkout-form-input ${errors.name ? 'error' : formData.name ? 'success' : ''}`}
                      placeholder=" "
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    <label className="checkout-form-label">Họ và tên *</label>
                    {formData.name && !errors.name && <CheckOutlined className="checkout-form-success-icon" />}
                    {errors.name && <div className="checkout-form-error">{errors.name}</div>}
      </div>

                  <div className="checkout-form-group">
                    <input
                      type="tel"
                    name="phone"
                      className={`checkout-form-input ${errors.phone ? 'error' : formData.phone ? 'success' : ''}`}
                      placeholder=" "
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    <label className="checkout-form-label">Số điện thoại *</label>
                    {formData.phone && !errors.phone && <CheckOutlined className="checkout-form-success-icon" />}
                    {errors.phone && <div className="checkout-form-error">{errors.phone}</div>}
                  </div>
                </div>

                {/* Email */}
                <div className="checkout-form-group">
                  <input
                    type="email"
                name="email"
                    className={`checkout-form-input ${errors.email ? 'error' : ''}`}
                    placeholder=" "
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <label className="checkout-form-label">Email (tùy chọn)</label>
                  {errors.email && <div className="checkout-form-error">{errors.email}</div>}
                </div>

                {/* Address Detail */}
                <div className="checkout-form-group">
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontSize: '14px', 
                    fontWeight: 600, 
                    color: '#262626' 
                  }}>
                    Địa chỉ chi tiết <span style={{ color: '#FF4D4F' }}>*</span>
                  </label>
                  <textarea
                name="address"
                    className={`checkout-textarea ${errors.address ? 'error' : formData.address ? 'success' : ''}`}
                    placeholder="Ví dụ: Số 123, Ngõ 456, Đường Nguyễn Trãi..."
                    value={formData.address}
                    onChange={handleInputChange}
                  rows={3} 
                  />
                  <div style={{ fontSize: '12px', color: '#8C8C8C', marginTop: '6px' }}>
                    Nhập số nhà, tên ngõ/ngách, tên đường
                  </div>
                  {errors.address && <div className="checkout-form-error">{errors.address}</div>}
                </div>

                {/* Province, District, Ward */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '12px', 
                    fontSize: '14px', 
                    fontWeight: 600, 
                    color: '#262626' 
                  }}>
                    Tỉnh/Thành phố - Quận/Huyện - Phường/Xã <span style={{ color: '#FF4D4F' }}>*</span>
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <div className="checkout-form-group">
                      <div className="checkout-select-wrapper">
                        <select
                          className={`checkout-select ${errors.province ? 'error' : formData.province ? 'success' : ''}`}
                          value={formData.provinceCode || ''}
                          onChange={handleProvinceChange}
                        >
                          <option value="">Chọn tỉnh/thành phố</option>
                          {provinces.map((province) => (
                            <option key={province.code} value={province.code}>
                              {province.name}
                            </option>
                          ))}
                        </select>
                        {loadingProvinces ? (
                          <LoadingOutlined className="checkout-select-loading" />
                        ) : (
                          <DownOutlined className="checkout-select-icon" />
                        )}
                      </div>
                      {errors.province && <div className="checkout-form-error">{errors.province}</div>}
                    </div>

                  <div className="checkout-form-group">
                    {districts.length > 0 ? (
                      <div className="checkout-select-wrapper">
                        <select
                          className={`checkout-select ${errors.district ? 'error' : formData.district ? 'success' : ''}`}
                          value={formData.districtCode || ''}
                          onChange={handleDistrictChange}
                          disabled={!formData.provinceCode}
                        >
                          <option value="">Chọn quận/huyện</option>
                          {districts.map((district) => (
                            <option key={district.code} value={district.code}>
                              {district.name}
                            </option>
                          ))}
                        </select>
                        {loadingDistricts ? (
                          <LoadingOutlined className="checkout-select-loading" />
                        ) : (
                          <DownOutlined className="checkout-select-icon" />
                        )}
                      </div>
                    ) : (
                      <input
                        type="text"
                        name="districtManual"
                        className={`checkout-form-input ${errors.district ? 'error' : formData.district ? 'success' : ''}`}
                        placeholder="Nhập quận/huyện"
                        value={formData.district}
                        onChange={(e) => setFormData((prev) => ({ ...prev, district: e.target.value }))}
                        disabled={!formData.province}
                      />
                    )}
                    {errors.district && <div className="checkout-form-error">{errors.district}</div>}
                  </div>

                  <div className="checkout-form-group">
                    {wards.length > 0 ? (
                      <div className="checkout-select-wrapper">
                        <select
                          className={`checkout-select ${errors.ward ? 'error' : formData.ward ? 'success' : ''}`}
                          value={formData.ward}
                          onChange={handleWardChange}
                          disabled={!formData.districtCode}
                        >
                          <option value="">Chọn phường/xã</option>
                          {wards.map((ward) => (
                            <option key={ward.code} value={ward.name}>
                              {ward.name}
                            </option>
                          ))}
                        </select>
                        {loadingWards ? (
                          <LoadingOutlined className="checkout-select-loading" />
                        ) : (
                          <DownOutlined className="checkout-select-icon" />
                        )}
                      </div>
                    ) : (
                      <input
                        type="text"
                        name="wardManual"
                        className={`checkout-form-input ${errors.ward ? 'error' : formData.ward ? 'success' : ''}`}
                        placeholder="Nhập phường/xã"
                        value={formData.ward}
                        onChange={(e) => setFormData((prev) => ({ ...prev, ward: e.target.value }))}
                        disabled={!formData.district}
                      />
                    )}
                    {errors.ward && <div className="checkout-form-error">{errors.ward}</div>}
                    </div>
                  </div>
                </div>

                {/* Note */}
                <div className="checkout-form-group">
                  <textarea
                name="note"
                    className="checkout-textarea"
                    placeholder="Ghi chú đơn hàng (tùy chọn)"
                    value={formData.note}
                    onChange={handleInputChange}
                  rows={2} 
                  />
                </div>
              </div>
            )}

            {/* Step 3: Payment Confirmation */}
            {currentStep === 3 && (
              <div className="checkout-form-card">
                <h3 className="checkout-section-title">
                  <CreditCardOutlined className="checkout-section-icon" />
                  Xác nhận thanh toán
                </h3>

                <div style={{ background: '#F0F7FF', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
                  <h4 style={{ marginBottom: '12px' }}>
                    <HomeOutlined /> Địa chỉ giao hàng
                  </h4>
                  <p><strong>Người nhận:</strong> {formData.name}</p>
                  <p><strong>SĐT:</strong> {formData.phone}</p>
                  <p>
                    <strong>Địa chỉ:</strong> {formData.address}, {formData.ward}, {formData.district}, {formData.province}
                  </p>
                  {formData.note && <p><strong>Ghi chú:</strong> {formData.note}</p>}
                </div>

                <div style={{ background: '#FFF7E6', padding: '20px', borderRadius: '12px' }}>
                  <h4 style={{ marginBottom: '12px' }}>
                    <CreditCardOutlined /> Phương thức thanh toán
                  </h4>
                  <p>✅ Chuyển khoản qua mã QR TPBank</p>
                  <p style={{ fontSize: '13px', color: '#8C8C8C', marginTop: '8px' }}>
                    Sau khi bấm "Tạo đơn hàng", bạn sẽ nhận được mã QR để quét và thanh toán.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="checkout-action-buttons">
              {currentStep > 1 && (
                <button className="checkout-back-btn" onClick={handlePrev}>
                  <LeftOutlined />
                  Quay lại
                </button>
              )}
              {currentStep < 3 ? (
                <button className="checkout-submit-btn" onClick={handleNext}>
                  Tiếp tục
                  <RightOutlined />
                </button>
              ) : (
                <button className="checkout-submit-btn" onClick={handleCreateOrder} disabled={loading}>
                  {loading ? <LoadingOutlined /> : <CheckOutlined />}
                  {loading ? 'Đang tạo đơn hàng...' : 'Tạo đơn hàng & Thanh toán'}
                </button>
              )}
            </div>
          </div>

          {/* Summary Card */}
          <div className="checkout-summary-card">
            <h3 className="checkout-summary-title">
              <ShoppingCartOutlined /> Tóm tắt đơn hàng
            </h3>

            <div className="checkout-cart-items">
              {cartItems.map((item, index) => (
                <div key={index} className="checkout-cart-item">
                  <img
                    src={item.image || '/images/placeholder.png'}
                    alt={item.name}
                    className="checkout-cart-image"
                  />
                  <div className="checkout-cart-info">
                    <h4 className="checkout-cart-name">{item.name}</h4>
                    <div className="checkout-cart-meta">
                      <span>SL: {item.quantity}</span>
                    </div>
                  </div>
                  <div className="checkout-cart-price">
                    {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-price-summary">
              <div className="checkout-price-row">
                <span className="checkout-price-label">Tạm tính</span>
                <span className="checkout-price-value">{subtotal.toLocaleString('vi-VN')}đ</span>
              </div>

              {discount > 0 && (
                <div className="checkout-price-row">
                  <span className="checkout-price-label">Giảm giá ({discount}%)</span>
                  <span className="checkout-price-value discount">
                    -{discountAmount.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              )}

              <div className="checkout-price-row">
                <span className="checkout-price-label">Phí vận chuyển</span>
                <span className="checkout-price-value discount">
                  {shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString('vi-VN')}đ`}
                </span>
              </div>

              <div className="checkout-total-row">
                <span className="checkout-total-label">Tổng cộng</span>
                <span className="checkout-total-value">{total.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>

            <div className="checkout-security">
              <SafetyOutlined className="checkout-security-icon" />
              <div className="checkout-security-text">
                <strong>Thanh toán an toàn</strong>
                <br />
                Thông tin của bạn được mã hóa và bảo vệ
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;



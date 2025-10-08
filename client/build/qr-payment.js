// Configuration
const API_BASE_URL = 'http://localhost:5000/api';
let currentOrder = null;
let cart = [];
let products = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    try {
        // Load products
        await loadProducts();
        
        // Create navigation tabs
        createNavigationTabs();
        
        // Show products page by default
        showProductsPage();
        
        // Setup modal event listeners
        setupModalEventListeners();
        
    } catch (error) {
        console.error('Error initializing app:', error);
        antd.message.error('Lỗi khởi tạo ứng dụng');
    }
}

// Create navigation tabs
function createNavigationTabs() {
    const tabsContainer = document.getElementById('tabs-container');
    
    const tabItems = [
        { key: 'products', label: '🛍️ Sản phẩm', icon: '🛍️' },
        { key: 'cart', label: '🛒 Giỏ hàng', icon: '🛒' },
        { key: 'orders', label: '📋 Đơn hàng', icon: '📋' },
        { key: 'admin', label: '⚙️ Quản trị', icon: '⚙️' }
    ];
    
    const tabsHtml = `
        <div class="ant-tabs ant-tabs-top">
            <div class="ant-tabs-nav">
                <div class="ant-tabs-nav-wrap">
                    <div class="ant-tabs-nav-list">
                        ${tabItems.map(item => `
                            <div class="ant-tabs-tab" onclick="switchTab('${item.key}')">
                                <span class="ant-tabs-tab-btn">
                                    <span class="ant-tabs-tab-icon">${item.icon}</span>
                                    <span class="ant-tabs-tab-label">${item.label}</span>
                                </span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    tabsContainer.innerHTML = tabsHtml;
}

// Switch between tabs
function switchTab(tabKey) {
    // Remove active class from all tabs
    document.querySelectorAll('.ant-tabs-tab').forEach(tab => {
        tab.classList.remove('ant-tabs-tab-active');
    });
    
    // Add active class to clicked tab
    event.target.closest('.ant-tabs-tab').classList.add('ant-tabs-tab-active');
    
    // Show corresponding content
    switch(tabKey) {
        case 'products':
            showProductsPage();
            break;
        case 'cart':
            showCartPage();
            break;
        case 'orders':
            showOrdersPage();
            break;
        case 'admin':
            showAdminPage();
            break;
    }
}

// Load products from API
async function loadProducts() {
    try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        products = response.data;
        console.log('Products loaded:', products);
    } catch (error) {
        console.error('Error loading products:', error);
        // Use mock data if API fails
        products = [
            {
                _id: '1',
                name: 'Áo thun Việt Nam',
                price: 150000,
                image: 'https://via.placeholder.com/300x200/1890ff/ffffff?text=Ao+Thun+Viet+Nam',
                description: 'Áo thun chất lượng cao với thiết kế Việt Nam'
            },
            {
                _id: '2',
                name: 'Áo polo cổ điển',
                price: 200000,
                image: 'https://via.placeholder.com/300x200/52c41a/ffffff?text=Ao+Polo+Co+Dien',
                description: 'Áo polo cổ điển phong cách'
            },
            {
                _id: '3',
                name: 'Áo hoodie trẻ trung',
                price: 300000,
                image: 'https://via.placeholder.com/300x200/722ed1/ffffff?text=Ao+Hoodie',
                description: 'Áo hoodie trẻ trung và năng động'
            },
            {
                _id: '4',
                name: 'Áo khoác gió',
                price: 250000,
                image: 'https://via.placeholder.com/300x200/faad14/ffffff?text=Ao+Khoac+Gio',
                description: 'Áo khoác gió chống nước'
            }
        ];
    }
}

// Show products page
function showProductsPage() {
    const contentArea = document.getElementById('content-area');
    
    const productsHtml = `
        <div>
            <h2>🛍️ Danh sách sản phẩm</h2>
            <div class="ant-row" style="gap: 16px;">
                ${products.map(product => `
                    <div class="ant-col ant-col-xs-24 ant-col-sm-12 ant-col-md-8 ant-col-lg-6">
                        <div class="product-card">
                            <img src="${product.image}" alt="${product.name}" class="product-image">
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
                                <span style="font-size: 18px; font-weight: bold; color: #1890ff;">
                                    ${product.price.toLocaleString('vi-VN')}đ
                                </span>
                                <button class="ant-btn ant-btn-primary" onclick="addToCart('${product._id}')">
                                    Thêm vào giỏ
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    contentArea.innerHTML = productsHtml;
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p._id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            product: product,
            quantity: 1,
            price: product.price
        });
    }
    
    antd.message.success(`Đã thêm ${product.name} vào giỏ hàng`);
    updateCartBadge();
}

// Update cart badge
function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    // You can update a badge element here if needed
}

// Show cart page
function showCartPage() {
    const contentArea = document.getElementById('content-area');
    
    if (cart.length === 0) {
        contentArea.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <h2>🛒 Giỏ hàng trống</h2>
                <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm!</p>
                <button class="ant-btn ant-btn-primary" onclick="switchTab('products')">
                    Xem sản phẩm
                </button>
            </div>
        `;
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const cartHtml = `
        <div>
            <h2>🛒 Giỏ hàng của bạn</h2>
            <div class="ant-row">
                <div class="ant-col ant-col-xs-24 ant-col-lg-16">
                    ${cart.map((item, index) => `
                        <div class="product-card">
                            <div class="ant-row">
                                <div class="ant-col ant-col-xs-24 ant-col-sm-6">
                                    <img src="${item.product.image}" alt="${item.product.name}" 
                                         style="width: 100%; height: 120px; object-fit: cover; border-radius: 6px;">
                                </div>
                                <div class="ant-col ant-col-xs-24 ant-col-sm-18" style="padding-left: 16px;">
                                    <h3>${item.product.name}</h3>
                                    <p>${item.product.description}</p>
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
                                        <div>
                                            <span style="font-size: 16px; font-weight: bold; color: #1890ff;">
                                                ${item.price.toLocaleString('vi-VN')}đ
                                            </span>
                                            <div style="margin-top: 8px;">
                                                <button class="ant-btn ant-btn-sm" onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
                                                <span style="margin: 0 12px; font-weight: bold;">${item.quantity}</span>
                                                <button class="ant-btn ant-btn-sm" onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
                                            </div>
                                        </div>
                                        <button class="ant-btn ant-btn-danger ant-btn-sm" onclick="removeFromCart(${index})">
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="ant-col ant-col-xs-24 ant-col-lg-8">
                    <div class="cart-summary">
                        <h3>Tổng cộng</h3>
                        <div style="font-size: 24px; font-weight: bold; color: #1890ff; margin: 16px 0;">
                            ${total.toLocaleString('vi-VN')}đ
                        </div>
                        <button class="ant-btn ant-btn-primary ant-btn-lg" style="width: 100%;" onclick="proceedToCheckout()">
                            💳 Thanh toán QR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    contentArea.innerHTML = cartHtml;
}

// Update item quantity in cart
function updateQuantity(index, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(index);
        return;
    }
    
    cart[index].quantity = newQuantity;
    showCartPage();
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    showCartPage();
    antd.message.success('Đã xóa sản phẩm khỏi giỏ hàng');
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        antd.message.error('Giỏ hàng trống!');
        return;
    }
    
    showCheckoutForm();
}

// Show checkout form with address
function showCheckoutForm() {
    const contentArea = document.getElementById('content-area');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const checkoutHtml = `
        <div>
            <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <button class="ant-btn ant-btn-text" onclick="showCartPage()" style="margin-right: 12px;">
                    ← Quay lại giỏ hàng
                </button>
                <h2>💳 Thanh toán đơn hàng</h2>
            </div>
            
            <div class="ant-row">
                <div class="ant-col ant-col-xs-24 ant-col-lg-16">
                    <div style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <h3>📋 Thông tin giao hàng</h3>
                        <form id="checkout-form">
                            <div class="ant-row" style="gap: 16px;">
                                <div class="ant-col ant-col-xs-24 ant-col-sm-12">
                                    <div style="margin-bottom: 16px;">
                                        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Họ và tên *</label>
                                        <input type="text" id="customer-name" required 
                                               style="width: 100%; padding: 8px 12px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: 14px;"
                                               placeholder="Nhập họ và tên">
                                    </div>
                                </div>
                                <div class="ant-col ant-col-xs-24 ant-col-sm-12">
                                    <div style="margin-bottom: 16px;">
                                        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Số điện thoại *</label>
                                        <input type="tel" id="customer-phone" required 
                                               style="width: 100%; padding: 8px 12px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: 14px;"
                                               placeholder="Nhập số điện thoại">
                                    </div>
                                </div>
                            </div>
                            
                            <div style="margin-bottom: 16px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 500;">Email</label>
                                <input type="email" id="customer-email" 
                                       style="width: 100%; padding: 8px 12px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: 14px;"
                                       placeholder="Nhập email (không bắt buộc)">
                            </div>
                            
                            <div style="margin-bottom: 16px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 500;">Địa chỉ *</label>
                                <textarea id="customer-address" required rows="3"
                                          style="width: 100%; padding: 8px 12px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: 14px; resize: vertical;"
                                          placeholder="Nhập địa chỉ chi tiết (số nhà, tên đường, phường/xã, quận/huyện)"></textarea>
                            </div>
                            
                            <div class="ant-row" style="gap: 16px;">
                                <div class="ant-col ant-col-xs-24 ant-col-sm-8">
                                    <div style="margin-bottom: 16px;">
                                        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Tỉnh/Thành phố *</label>
                                        <select id="customer-city" required 
                                                style="width: 100%; padding: 8px 12px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: 14px;">
                                            <option value="">Chọn tỉnh/thành phố</option>
                                            <option value="Ho Chi Minh">TP. Hồ Chí Minh</option>
                                            <option value="Ha Noi">Hà Nội</option>
                                            <option value="Da Nang">Đà Nẵng</option>
                                            <option value="Can Tho">Cần Thơ</option>
                                            <option value="Hai Phong">Hải Phòng</option>
                                            <option value="An Giang">An Giang</option>
                                            <option value="Ba Ria - Vung Tau">Bà Rịa - Vũng Tàu</option>
                                            <option value="Bac Lieu">Bạc Liêu</option>
                                            <option value="Bac Kan">Bắc Kạn</option>
                                            <option value="Bac Giang">Bắc Giang</option>
                                            <option value="Bac Ninh">Bắc Ninh</option>
                                            <option value="Ben Tre">Bến Tre</option>
                                            <option value="Binh Dinh">Bình Định</option>
                                            <option value="Binh Duong">Bình Dương</option>
                                            <option value="Binh Phuoc">Bình Phước</option>
                                            <option value="Binh Thuan">Bình Thuận</option>
                                            <option value="Ca Mau">Cà Mau</option>
                                            <option value="Cao Bang">Cao Bằng</option>
                                            <option value="Dak Lak">Đắk Lắk</option>
                                            <option value="Dak Nong">Đắk Nông</option>
                                            <option value="Dien Bien">Điện Biên</option>
                                            <option value="Dong Nai">Đồng Nai</option>
                                            <option value="Dong Thap">Đồng Tháp</option>
                                            <option value="Gia Lai">Gia Lai</option>
                                            <option value="Ha Giang">Hà Giang</option>
                                            <option value="Ha Nam">Hà Nam</option>
                                            <option value="Ha Tinh">Hà Tĩnh</option>
                                            <option value="Hai Duong">Hải Dương</option>
                                            <option value="Hau Giang">Hậu Giang</option>
                                            <option value="Hoa Binh">Hòa Bình</option>
                                            <option value="Hung Yen">Hưng Yên</option>
                                            <option value="Khanh Hoa">Khánh Hòa</option>
                                            <option value="Kien Giang">Kiên Giang</option>
                                            <option value="Kon Tum">Kon Tum</option>
                                            <option value="Lai Chau">Lai Châu</option>
                                            <option value="Lam Dong">Lâm Đồng</option>
                                            <option value="Lang Son">Lạng Sơn</option>
                                            <option value="Lao Cai">Lào Cai</option>
                                            <option value="Long An">Long An</option>
                                            <option value="Nam Dinh">Nam Định</option>
                                            <option value="Nghe An">Nghệ An</option>
                                            <option value="Ninh Binh">Ninh Bình</option>
                                            <option value="Ninh Thuan">Ninh Thuận</option>
                                            <option value="Phu Tho">Phú Thọ</option>
                                            <option value="Phu Yen">Phú Yên</option>
                                            <option value="Quang Binh">Quảng Bình</option>
                                            <option value="Quang Nam">Quảng Nam</option>
                                            <option value="Quang Ngai">Quảng Ngãi</option>
                                            <option value="Quang Ninh">Quảng Ninh</option>
                                            <option value="Quang Tri">Quảng Trị</option>
                                            <option value="Soc Trang">Sóc Trăng</option>
                                            <option value="Son La">Sơn La</option>
                                            <option value="Tay Ninh">Tây Ninh</option>
                                            <option value="Thai Binh">Thái Bình</option>
                                            <option value="Thai Nguyen">Thái Nguyên</option>
                                            <option value="Thanh Hoa">Thanh Hóa</option>
                                            <option value="Thua Thien Hue">Thừa Thiên Huế</option>
                                            <option value="Tien Giang">Tiền Giang</option>
                                            <option value="Tra Vinh">Trà Vinh</option>
                                            <option value="Tuyen Quang">Tuyên Quang</option>
                                            <option value="Vinh Long">Vĩnh Long</option>
                                            <option value="Vinh Phuc">Vĩnh Phúc</option>
                                            <option value="Yen Bai">Yên Bái</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="ant-col ant-col-xs-24 ant-col-sm-8">
                                    <div style="margin-bottom: 16px;">
                                        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Quận/Huyện *</label>
                                        <input type="text" id="customer-district" required 
                                               style="width: 100%; padding: 8px 12px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: 14px;"
                                               placeholder="Nhập quận/huyện">
                                    </div>
                                </div>
                                <div class="ant-col ant-col-xs-24 ant-col-sm-8">
                                    <div style="margin-bottom: 16px;">
                                        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Mã bưu điện</label>
                                        <input type="text" id="customer-zipcode" 
                                               style="width: 100%; padding: 8px 12px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: 14px;"
                                               placeholder="Mã bưu điện (không bắt buộc)">
                                    </div>
                                </div>
                            </div>
                            
                            <div style="margin-bottom: 16px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 500;">Ghi chú đơn hàng</label>
                                <textarea id="order-note" rows="2"
                                          style="width: 100%; padding: 8px 12px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: 14px; resize: vertical;"
                                          placeholder="Ghi chú thêm cho đơn hàng (không bắt buộc)"></textarea>
                            </div>
                        </form>
                    </div>
                </div>
                
                <div class="ant-col ant-col-xs-24 ant-col-lg-8">
                    <div class="cart-summary">
                        <h3>📦 Tóm tắt đơn hàng</h3>
                        <div style="margin: 16px 0;">
                            ${cart.map(item => `
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px; padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                                    <div>
                                        <div style="font-weight: 500;">${item.product.name}</div>
                                        <div style="font-size: 12px; color: #666;">Số lượng: ${item.quantity}</div>
                                    </div>
                                    <div style="font-weight: 500;">
                                        ${(item.price * item.quantity).toLocaleString('vi-VN')}đ
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div style="border-top: 2px solid #e8e8e8; padding-top: 16px;">
                            <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #1890ff;">
                                <span>Tổng cộng:</span>
                                <span>${total.toLocaleString('vi-VN')}đ</span>
                            </div>
                        </div>
                        
                        <div style="margin-top: 20px;">
                            <button class="ant-btn ant-btn-primary ant-btn-lg" style="width: 100%;" onclick="createOrder()">
                                💳 Tạo đơn hàng & Thanh toán QR
                            </button>
                        </div>
                        
                        <div style="margin-top: 12px; padding: 12px; background: #f6ffed; border: 1px solid #b7eb8f; border-radius: 6px;">
                            <div style="font-size: 12px; color: #52c41a;">
                                <strong>💡 Lưu ý:</strong> Sau khi tạo đơn hàng, bạn sẽ nhận được mã QR để quét và thanh toán qua TPBank (0359937294)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    contentArea.innerHTML = checkoutHtml;
}

// Create order with full address information
async function createOrder() {
    // Validate form
    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    const email = document.getElementById('customer-email').value.trim();
    const address = document.getElementById('customer-address').value.trim();
    const city = document.getElementById('customer-city').value;
    const district = document.getElementById('customer-district').value.trim();
    const zipcode = document.getElementById('customer-zipcode').value.trim();
    const note = document.getElementById('order-note').value.trim();
    
    if (!name || !phone || !address || !city || !district) {
        antd.message.error('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }
    
    // Validate phone number
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phone)) {
        antd.message.error('Số điện thoại không hợp lệ!');
        return;
    }
    
    try {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        const orderData = {
            items: cart.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            })),
            total: total,
            customerInfo: {
                name: name,
                phone: phone,
                email: email,
                address: address,
                city: city,
                district: district,
                zipcode: zipcode,
                note: note
            },
            shippingAddress: {
                street: address,
                city: city,
                state: district,
                zipCode: zipcode || '000000',
                country: 'Vietnam'
            }
        };
        
        antd.message.loading('Đang tạo đơn hàng...', 0);
        
        const response = await axios.post(`${API_BASE_URL}/orders/create`, orderData);
        currentOrder = response.data;
        
        antd.message.destroy();
        antd.message.success('Tạo đơn hàng thành công!');
        
        // Show order confirmation page
        showOrderConfirmation();
        
    } catch (error) {
        antd.message.destroy();
        console.error('Error creating order:', error);
        antd.message.error('Lỗi tạo đơn hàng: ' + (error.response?.data?.message || error.message));
    }
}

// Show order confirmation page
function showOrderConfirmation() {
    const contentArea = document.getElementById('content-area');
    
    const confirmationHtml = `
        <div>
            <div style="text-align: center; margin-bottom: 30px;">
                <div style="font-size: 48px; margin-bottom: 16px;">✅</div>
                <h2 style="color: #52c41a;">Đơn hàng đã được tạo thành công!</h2>
                <p style="font-size: 18px; color: #666;">Mã đơn hàng: <strong>#${currentOrder.orderCode}</strong></p>
            </div>
            
            <div class="ant-row">
                <div class="ant-col ant-col-xs-24 ant-col-lg-12">
                    <div style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 20px;">
                        <h3>📋 Thông tin đơn hàng</h3>
                        <div style="margin: 16px 0;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span><strong>Mã đơn hàng:</strong></span>
                                <span>#${currentOrder.orderCode}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span><strong>Ngày tạo:</strong></span>
                                <span>${new Date(currentOrder.createdAt).toLocaleString('vi-VN')}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span><strong>Tổng tiền:</strong></span>
                                <span style="font-weight: bold; color: #1890ff;">${currentOrder.total.toLocaleString('vi-VN')}đ</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span><strong>Trạng thái:</strong></span>
                                <span class="status-badge status-${currentOrder.paymentStatus}">${getStatusText(currentOrder.paymentStatus)}</span>
                            </div>
                        </div>
                        
                        <h4>Sản phẩm đã đặt:</h4>
                        <div style="margin: 12px 0;">
                            ${currentOrder.items.map(item => `
                                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                                    <div>
                                        <div style="font-weight: 500;">${item.productId?.name || 'Sản phẩm'}</div>
                                        <div style="font-size: 12px; color: #666;">Số lượng: ${item.quantity}</div>
                                    </div>
                                    <div style="font-weight: 500;">
                                        ${(item.price * item.quantity).toLocaleString('vi-VN')}đ
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="ant-col ant-col-xs-24 ant-col-lg-12">
                    <div style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 20px;">
                        <h3>🏠 Thông tin giao hàng</h3>
                        <div style="margin: 16px 0;">
                            <div style="margin-bottom: 8px;">
                                <strong>Người nhận:</strong> ${currentOrder.shippingAddress?.street || 'N/A'}
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>Địa chỉ:</strong> ${currentOrder.shippingAddress?.street || 'N/A'}
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>Thành phố:</strong> ${currentOrder.shippingAddress?.city || 'N/A'}
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>Quận/Huyện:</strong> ${currentOrder.shippingAddress?.state || 'N/A'}
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>Mã bưu điện:</strong> ${currentOrder.shippingAddress?.zipCode || 'N/A'}
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: #f6ffed; padding: 20px; border-radius: 8px; border: 1px solid #b7eb8f;">
                        <h3 style="color: #52c41a; margin-bottom: 16px;">💳 Hướng dẫn thanh toán</h3>
                        <div style="margin-bottom: 12px;">
                            <strong>Bước 1:</strong> Quét mã QR bên dưới bằng ứng dụng ngân hàng
                        </div>
                        <div style="margin-bottom: 12px;">
                            <strong>Bước 2:</strong> Kiểm tra thông tin chuyển khoản
                        </div>
                        <div style="margin-bottom: 12px;">
                            <strong>Bước 3:</strong> Thực hiện chuyển khoản
                        </div>
                        <div style="margin-bottom: 16px;">
                            <strong>Bước 4:</strong> Admin sẽ xác nhận thanh toán
                        </div>
                        
                        <button class="ant-btn ant-btn-primary" style="width: 100%;" onclick="showQRModal()">
                            📱 Xem mã QR thanh toán
                        </button>
                    </div>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
                <button class="ant-btn ant-btn-default" onclick="showProductsPage()" style="margin-right: 12px;">
                    🛍️ Tiếp tục mua sắm
                </button>
                <button class="ant-btn ant-btn-primary" onclick="showOrdersPage()">
                    📋 Xem đơn hàng của tôi
                </button>
            </div>
        </div>
    `;
    
    contentArea.innerHTML = confirmationHtml;
    
    // Clear cart after successful order
    cart = [];
}

// Show QR code modal
function showQRModal() {
    if (!currentOrder) return;
    
    const modal = document.getElementById('qr-modal');
    const qrImageContainer = document.getElementById('qr-image-container');
    const paymentAmount = document.getElementById('payment-amount');
    const paymentMessage = document.getElementById('payment-message');
    
    // Display QR code
    qrImageContainer.innerHTML = `
        <img src="${currentOrder.qrCode.imageUrl}" alt="QR Code" class="qr-code-image">
    `;
    
    // Display payment info
    paymentAmount.textContent = currentOrder.total.toLocaleString('vi-VN') + 'đ';
    paymentMessage.textContent = `Thanh toan don hang ${currentOrder.orderCode}`;
    
    // Show modal
    modal.style.display = 'block';
}

// Setup modal event listeners
function setupModalEventListeners() {
    // Close QR modal
    document.getElementById('close-qr-modal').addEventListener('click', function() {
        document.getElementById('qr-modal').style.display = 'none';
    });
    
    // Mark as paid
    document.getElementById('mark-as-paid').addEventListener('click', async function() {
        if (!currentOrder) return;
        
        try {
            await axios.patch(`${API_BASE_URL}/orders/${currentOrder._id}/mark-paid`);
            antd.message.success('Đã đánh dấu đơn hàng là đã thanh toán!');
            document.getElementById('qr-modal').style.display = 'none';
            
            // Refresh orders page if it's currently shown
            if (document.querySelector('.ant-tabs-tab-active').textContent.includes('Đơn hàng')) {
                showOrdersPage();
            }
        } catch (error) {
            console.error('Error marking as paid:', error);
            antd.message.error('Lỗi cập nhật trạng thái thanh toán');
        }
    });
}

// Show orders page
async function showOrdersPage() {
    const contentArea = document.getElementById('content-area');
    
    try {
        const response = await axios.get(`${API_BASE_URL}/orders/all`);
        const orders = response.data;
        
        const ordersHtml = `
            <div>
                <h2>📋 Danh sách đơn hàng</h2>
                ${orders.length === 0 ? `
                    <div style="text-align: center; padding: 40px;">
                        <p>Chưa có đơn hàng nào!</p>
                    </div>
                ` : `
                    <div>
                        ${orders.map(order => `
                            <div class="order-item">
                                <div class="ant-row">
                                    <div class="ant-col ant-col-xs-24 ant-col-md-16">
                                        <h3>Đơn hàng #${order.orderCode}</h3>
                                        <p><strong>Ngày tạo:</strong> ${new Date(order.createdAt).toLocaleString('vi-VN')}</p>
                                        <p><strong>Tổng tiền:</strong> ${order.total.toLocaleString('vi-VN')}đ</p>
                                        <p><strong>Số sản phẩm:</strong> ${order.items.length} sản phẩm</p>
                                    </div>
                                    <div class="ant-col ant-col-xs-24 ant-col-md-8" style="text-align: right;">
                                        <div class="status-badge status-${order.paymentStatus}">
                                            ${getStatusText(order.paymentStatus)}
                                        </div>
                                        <div style="margin-top: 8px;">
                                            <button class="ant-btn ant-btn-sm" onclick="viewOrderDetails('${order._id}')">
                                                Xem chi tiết
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `}
            </div>
        `;
        
        contentArea.innerHTML = ordersHtml;
        
    } catch (error) {
        console.error('Error loading orders:', error);
        contentArea.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <h2>📋 Danh sách đơn hàng</h2>
                <p style="color: #ff4d4f;">Lỗi tải danh sách đơn hàng</p>
            </div>
        `;
    }
}

// Get status text
function getStatusText(status) {
    const statusMap = {
        'pending': '⏳ Chờ thanh toán',
        'paid': '✅ Đã thanh toán',
        'processing': '🔄 Đang xử lý',
        'shipped': '🚚 Đang giao',
        'delivered': '✅ Đã giao',
        'cancelled': '❌ Đã hủy'
    };
    return statusMap[status] || status;
}

// View order details
async function viewOrderDetails(orderId) {
    try {
        const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`);
        const order = response.data;
        
        const detailsHtml = `
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>Chi tiết đơn hàng #${order.orderCode}</h3>
                <div class="ant-row">
                    <div class="ant-col ant-col-xs-24 ant-col-md-12">
                        <h4>Sản phẩm:</h4>
                        ${order.items.map(item => `
                            <div style="border: 1px solid #e8e8e8; padding: 12px; margin: 8px 0; border-radius: 6px;">
                                <p><strong>${item.productId?.name || 'Sản phẩm'}</strong></p>
                                <p>Số lượng: ${item.quantity}</p>
                                <p>Giá: ${item.price.toLocaleString('vi-VN')}đ</p>
                            </div>
                        `).join('')}
                    </div>
                    <div class="ant-col ant-col-xs-24 ant-col-md-12">
                        <h4>Thông tin khách hàng:</h4>
                        <p><strong>Họ tên:</strong> ${order.customerInfo?.name || 'N/A'}</p>
                        <p><strong>Số điện thoại:</strong> ${order.customerInfo?.phone || 'N/A'}</p>
                        <p><strong>Email:</strong> ${order.customerInfo?.email || 'N/A'}</p>
                        <p><strong>Địa chỉ:</strong> ${order.customerInfo?.address || 'N/A'}</p>
                        <p><strong>Thành phố:</strong> ${order.customerInfo?.city || 'N/A'}</p>
                        <p><strong>Quận/Huyện:</strong> ${order.customerInfo?.district || 'N/A'}</p>
                        ${order.customerInfo?.note ? `<p><strong>Ghi chú:</strong> ${order.customerInfo.note}</p>` : ''}
                        
                        <h4 style="margin-top: 20px;">Thông tin thanh toán:</h4>
                        <p><strong>Tổng tiền:</strong> ${order.total.toLocaleString('vi-VN')}đ</p>
                        <p><strong>Trạng thái:</strong> <span class="status-badge status-${order.paymentStatus}">${getStatusText(order.paymentStatus)}</span></p>
                        <p><strong>Ngân hàng:</strong> ${order.qrCode?.bankName || 'TPBank'}</p>
                        <p><strong>Số tài khoản:</strong> ${order.qrCode?.bankAccount || '0359937294'}</p>
                        ${order.paidAt ? `<p><strong>Ngày thanh toán:</strong> ${new Date(order.paidAt).toLocaleString('vi-VN')}</p>` : ''}
                    </div>
                </div>
                <div style="margin-top: 20px;">
                    <button class="ant-btn ant-btn-primary" onclick="showOrdersPage()">
                        Quay lại
                    </button>
                </div>
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = detailsHtml;
        
    } catch (error) {
        console.error('Error loading order details:', error);
        antd.message.error('Lỗi tải chi tiết đơn hàng');
    }
}

// Show admin page
async function showAdminPage() {
    const contentArea = document.getElementById('content-area');
    
    try {
        const response = await axios.get(`${API_BASE_URL}/orders/all`);
        const orders = response.data;
        
        const adminHtml = `
            <div>
                <h2>⚙️ Quản trị hệ thống</h2>
                <div class="admin-panel">
                    <h3>📊 Thống kê</h3>
                    <div class="ant-row">
                        <div class="ant-col ant-col-xs-12 ant-col-sm-6">
                            <div style="text-align: center; padding: 16px; background: white; border-radius: 8px;">
                                <div style="font-size: 24px; font-weight: bold; color: #1890ff;">${orders.length}</div>
                                <div>Tổng đơn hàng</div>
                            </div>
                        </div>
                        <div class="ant-col ant-col-xs-12 ant-col-sm-6">
                            <div style="text-align: center; padding: 16px; background: white; border-radius: 8px;">
                                <div style="font-size: 24px; font-weight: bold; color: #52c41a;">${orders.filter(o => o.paymentStatus === 'paid').length}</div>
                                <div>Đã thanh toán</div>
                            </div>
                        </div>
                        <div class="ant-col ant-col-xs-12 ant-col-sm-6">
                            <div style="text-align: center; padding: 16px; background: white; border-radius: 8px;">
                                <div style="font-size: 24px; font-weight: bold; color: #faad14;">${orders.filter(o => o.paymentStatus === 'pending').length}</div>
                                <div>Chờ thanh toán</div>
                            </div>
                        </div>
                        <div class="ant-col ant-col-xs-12 ant-col-sm-6">
                            <div style="text-align: center; padding: 16px; background: white; border-radius: 8px;">
                                <div style="font-size: 24px; font-weight: bold; color: #722ed1;">${orders.reduce((sum, o) => sum + o.total, 0).toLocaleString('vi-VN')}đ</div>
                                <div>Tổng doanh thu</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <h3>📋 Quản lý đơn hàng</h3>
                <div>
                    ${orders.map(order => `
                        <div class="order-item">
                            <div class="ant-row">
                                <div class="ant-col ant-col-xs-24 ant-col-md-16">
                                    <h4>Đơn hàng #${order.orderCode}</h4>
                                    <p><strong>Khách hàng:</strong> ${order.customerInfo?.name || order.userId?.name || 'Demo User'}</p>
                                    <p><strong>SĐT:</strong> ${order.customerInfo?.phone || 'N/A'}</p>
                                    <p><strong>Địa chỉ:</strong> ${order.customerInfo?.address || 'N/A'}, ${order.customerInfo?.city || 'N/A'}</p>
                                    <p><strong>Ngày tạo:</strong> ${new Date(order.createdAt).toLocaleString('vi-VN')}</p>
                                    <p><strong>Tổng tiền:</strong> ${order.total.toLocaleString('vi-VN')}đ</p>
                                </div>
                                <div class="ant-col ant-col-xs-24 ant-col-md-8" style="text-align: right;">
                                    <div class="status-badge status-${order.paymentStatus}" style="margin-bottom: 8px;">
                                        ${getStatusText(order.paymentStatus)}
                                    </div>
                                    <div>
                                        ${order.paymentStatus === 'pending' ? `
                                            <button class="ant-btn ant-btn-success ant-btn-sm" onclick="markOrderAsPaid('${order._id}')">
                                                Đánh dấu đã thanh toán
                                            </button>
                                        ` : ''}
                                        <button class="ant-btn ant-btn-sm" onclick="viewOrderDetails('${order._id}')" style="margin-left: 8px;">
                                            Chi tiết
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        contentArea.innerHTML = adminHtml;
        
    } catch (error) {
        console.error('Error loading admin data:', error);
        contentArea.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <h2>⚙️ Quản trị hệ thống</h2>
                <p style="color: #ff4d4f;">Lỗi tải dữ liệu quản trị</p>
            </div>
        `;
    }
}

// Mark order as paid (admin function)
async function markOrderAsPaid(orderId) {
    try {
        await axios.patch(`${API_BASE_URL}/orders/${orderId}/mark-paid`);
        antd.message.success('Đã đánh dấu đơn hàng là đã thanh toán!');
        showAdminPage(); // Refresh admin page
    } catch (error) {
        console.error('Error marking order as paid:', error);
        antd.message.error('Lỗi cập nhật trạng thái thanh toán');
    }
}

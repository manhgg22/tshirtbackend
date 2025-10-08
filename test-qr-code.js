// Test script để kiểm tra QR code
const testQRCode = async () => {
  console.log('🔍 Bắt đầu test QR code...');
  
  try {
    // 1. Test API products
    console.log('📦 1. Test API products...');
    const productsResponse = await fetch('http://localhost:5000/api/products');
    const products = await productsResponse.json();
    console.log('✅ Products:', products.length, 'sản phẩm');
    
    if (products.length === 0) {
      console.error('❌ Không có sản phẩm nào!');
      return;
    }
    
    const firstProduct = products[0];
    console.log('📋 Product đầu tiên:', {
      _id: firstProduct._id,
      name: firstProduct.name,
      price: firstProduct.price
    });
    
    // 2. Test tạo đơn hàng
    console.log('🛒 2. Test tạo đơn hàng...');
    const orderData = {
      items: [{
        productId: firstProduct._id,
        quantity: 1,
        price: firstProduct.price
      }],
      total: firstProduct.price,
      customerInfo: {
        name: 'Test User',
        phone: '0123456789',
        email: 'test@gmail.com',
        address: 'Test Address',
        city: 'TP. Hồ Chí Minh',
        district: 'District 1',
        zipcode: '700000',
        note: 'Test order'
      },
      shippingAddress: {
        street: 'Test Address',
        city: 'TP. Hồ Chí Minh',
        state: 'District 1',
        zipCode: '700000',
        country: 'Vietnam'
      }
    };
    
    console.log('📤 Order data:', orderData);
    
    const orderResponse = await fetch('http://localhost:5000/api/orders/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });
    
    if (!orderResponse.ok) {
      const errorText = await orderResponse.text();
      console.error('❌ Lỗi tạo đơn hàng:', orderResponse.status, errorText);
      return;
    }
    
    const order = await orderResponse.json();
    console.log('✅ Đơn hàng tạo thành công:', {
      _id: order._id,
      orderCode: order.orderCode,
      total: order.total,
      qrCode: order.qrCode ? 'Có QR code' : 'Không có QR code'
    });
    
    // 3. Kiểm tra QR code
    console.log('🔍 3. Kiểm tra QR code...');
    if (order.qrCode) {
      console.log('✅ QR Code có sẵn:', {
        bankAccount: order.qrCode.bankAccount,
        bankName: order.qrCode.bankName,
        imageUrl: order.qrCode.imageUrl ? 'Có image' : 'Không có image',
        data: order.qrCode.data ? 'Có data' : 'Không có data'
      });
      
      if (order.qrCode.imageUrl) {
        console.log('🖼️ QR Image URL:', order.qrCode.imageUrl.substring(0, 50) + '...');
      }
      
      if (order.qrCode.data) {
        console.log('📄 QR Data:', order.qrCode.data);
      }
    } else {
      console.error('❌ Không có QR code trong response!');
    }
    
    // 4. Test API cities
    console.log('🏙️ 4. Test API cities...');
    const citiesResponse = await fetch('http://localhost:5000/api/cities');
    const cities = await citiesResponse.json();
    console.log('✅ Cities:', cities.data ? cities.data.length : 'Lỗi', 'tỉnh thành phố');
    
    console.log('🎉 Test hoàn thành!');
    
  } catch (error) {
    console.error('❌ Lỗi test:', error);
  }
};

// Chạy test
testQRCode();


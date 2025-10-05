// Script để xem dữ liệu trong database vietnam-tshirts
// Chạy: mongosh --file view-vietnam-tshirts.js

use('vietnam-tshirts');

print('📊 DỮ LIỆU TRONG DATABASE vietnam-tshirts:');
print('==========================================');

print('\n🛍️  SẢN PHẨM (' + db.products.countDocuments() + ' items):');
print('----------------------------------------');
db.products.find({}, {name: 1, price: 1, category: 1}).forEach(function(product) {
  print('- ' + product.name + ' (' + product.price.toLocaleString() + 'đ) - ' + product.category);
});

print('\n👥 NGƯỜI DÙNG (' + db.users.countDocuments() + ' accounts):');
print('----------------------------------------');
db.users.find({}, {name: 1, email: 1, role: 1}).forEach(function(user) {
  print('- ' + user.name + ' (' + user.email + ') - ' + user.role);
});

print('\n🎨 THIẾT KẾ (' + db.designs.countDocuments() + ' designs):');
print('----------------------------------------');
db.designs.find({}, {name: 1, isPublic: 1}).forEach(function(design) {
  print('- ' + design.name + ' (' + (design.isPublic ? 'Công khai' : 'Riêng tư') + ')');
});

print('\n📦 ĐƠN HÀNG (' + db.orders.countDocuments() + ' orders):');
print('----------------------------------------');
db.orders.find({}, {orderCode: 1, status: 1, total: 1}).forEach(function(order) {
  print('- ' + order.orderCode + ' - ' + order.status + ' - ' + order.total.toLocaleString() + 'đ');
});

print('\n🔑 TÀI KHOẢN TEST:');
print('------------------');
print('Admin: admin@vietnam-tshirts.com / admin123');
print('User: an.nguyen@email.com / user123');
print('User: binh.tran@email.com / user123');
print('User: cuong.le@email.com / user123');
print('User: dung.pham@email.com / user123');

print('\n✅ Dữ liệu đã sẵn sàng để test ứng dụng!');

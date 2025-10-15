import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import {
  HeartOutlined,
  HeartFilled,
  ShoppingCartOutlined,
  EyeOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  CloseCircleOutlined,
  PlusOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { removeFromWishlist, clearWishlist, selectWishlistItems } from '../redux/wishlistSlice';
import { addItem } from '../redux/cartSlice';
import './WishlistPage.css';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector(selectWishlistItems);

  // Mock suggested products (in real app, fetch from API)
  const suggestedProducts = [
    {
      _id: '1',
      name: 'Áo Thun Trống Đồng',
      price: 299000,
      image: '/images/aothuntest/aothun1.webp',
    },
    {
      _id: '2',
      name: 'Áo Thun Hạ Long',
      price: 349000,
      image: '/images/aothuntest/aothun2.webp',
    },
    {
      _id: '3',
      name: 'Áo Thun Phố Cổ',
      price: 279000,
      image: '/images/aothuntest/aothun3.webp',
    },
    {
      _id: '4',
      name: 'Áo Thun Lý Thái Tổ',
      price: 329000,
      image: '/images/aothuntest/aothun4.webp',
    },
  ];

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist({ productId }));
    message.success('Đã xóa khỏi danh sách yêu thích');
  };

  const handleClearWishlist = () => {
    if (wishlistItems.length === 0) {
      message.warning('Danh sách yêu thích trống!');
      return;
    }
    dispatch(clearWishlist());
    message.success('Đã xóa tất cả sản phẩm yêu thích');
  };

  const handleAddToCart = (item) => {
    dispatch(
      addItem({
        product: item.product,
        quantity: 1,
        size: item.product.sizes?.[0] || 'M',
        color: item.product.colors?.[0] || 'Trắng',
      })
    );
    message.success(`Đã thêm ${item.name} vào giỏ hàng!`);
  };

  const handleViewProduct = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleShareWishlist = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    message.success('Đã sao chép link danh sách yêu thích!');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Empty State
  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-container">
        <div className="wishlist-wrapper">
          <div className="wishlist-empty">
            <div className="wishlist-empty-icon">
              <HeartOutlined />
            </div>
            <h2 className="wishlist-empty-title">Chưa có sản phẩm yêu thích</h2>
            <p className="wishlist-empty-subtitle">
              Hãy thêm những sản phẩm bạn yêu thích vào danh sách để tiện theo dõi!
            </p>
            <button className="wishlist-empty-cta" onClick={() => navigate('/products')}>
              <ShoppingCartOutlined />
              Khám phá sản phẩm
            </button>

            {/* Suggested Products */}
            <div className="wishlist-suggested">
              <h3 className="wishlist-suggested-title">Có thể bạn quan tâm</h3>
              <div className="wishlist-suggested-grid">
                {suggestedProducts.map((product) => (
                  <div
                    key={product._id}
                    className="wishlist-suggested-card"
                    onClick={() => navigate(`/products/${product._id}`)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="wishlist-suggested-image"
                    />
                    <h4 className="wishlist-suggested-name">{product.name}</h4>
                    <p className="wishlist-suggested-price">
                      {product.price.toLocaleString('vi-VN')}đ
                    </p>
                    <button
                      className="wishlist-suggested-add-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to wishlist logic here
                      }}
                    >
                      <HeartOutlined /> Thêm vào yêu thích
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Wishlist with items
  return (
    <div className="wishlist-container">
      <div className="wishlist-wrapper">
        {/* Header */}
        <div className="wishlist-header">
          <h1 className="wishlist-title">
            <HeartFilled className="wishlist-title-icon" />
            Sản phẩm yêu thích
          </h1>
          <p className="wishlist-count">{wishlistItems.length} sản phẩm</p>

          <div className="wishlist-actions">
            <button className="wishlist-share-btn" onClick={handleShareWishlist}>
              <ShareAltOutlined />
              Chia sẻ danh sách
            </button>
            <button className="wishlist-clear-btn" onClick={handleClearWishlist}>
              <DeleteOutlined />
              Xóa tất cả
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="wishlist-grid">
          {wishlistItems.map((item) => (
            <div key={item.productId} className="wishlist-item-card">
              {/* Remove Button */}
              <button
                className="wishlist-remove-btn"
                onClick={() => handleRemoveFromWishlist(item.productId)}
                title="Xóa khỏi yêu thích"
              >
                <CloseCircleOutlined />
              </button>

              {/* Image */}
              <div className="wishlist-item-image-wrapper">
                <img
                  src={item.image || '/images/placeholder.png'}
                  alt={item.name}
                  className="wishlist-item-image"
                />
                {item.product?.isFeatured && (
                  <div className="wishlist-item-badge">Nổi bật</div>
                )}
              </div>

              {/* Info */}
              <div className="wishlist-item-info">
                <p className="wishlist-item-category">
                  {item.category?.name || item.category || 'Áo thun'}
                </p>
                <h3 className="wishlist-item-name">{item.name}</h3>
                <div className="wishlist-item-price">
                  {item.price.toLocaleString('vi-VN')}đ
                </div>
                <p className="wishlist-item-added">
                  Đã thêm: {formatDate(item.addedAt)}
                </p>

                {/* Actions */}
                <div className="wishlist-item-actions">
                  <button
                    className="wishlist-add-cart-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCartOutlined />
                    Thêm vào giỏ
                  </button>
                  <button
                    className="wishlist-view-btn"
                    onClick={() => handleViewProduct(item.productId)}
                  >
                    <EyeOutlined />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Products */}
        <div className="wishlist-suggested">
          <h3 className="wishlist-suggested-title">Gợi ý thêm cho bạn</h3>
          <div className="wishlist-suggested-grid">
            {suggestedProducts.map((product) => (
              <div
                key={product._id}
                className="wishlist-suggested-card"
                onClick={() => navigate(`/products/${product._id}`)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="wishlist-suggested-image"
                />
                <h4 className="wishlist-suggested-name">{product.name}</h4>
                <p className="wishlist-suggested-price">
                  {product.price.toLocaleString('vi-VN')}đ
                </p>
                <button
                  className="wishlist-suggested-add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/products');
                  }}
                >
                  <PlusOutlined /> Xem chi tiết
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;


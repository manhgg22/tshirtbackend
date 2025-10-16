import React, { useEffect, useState } from 'react';
import { Card, Button, Input, Select, Row, Col, Spin, message, Badge, Rate, Tag } from 'antd';
import { 
  SearchOutlined, 
  ShoppingCartOutlined, 
  HeartOutlined, 
  EyeOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  StarFilled,
  FireOutlined,
  CrownOutlined
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductsPage.css';

const { Option } = Select;

const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [wishlist, setWishlist] = useState(new Set());

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Lấy sản phẩm từ Vietnam Heritage Collection
        const productsResponse = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/products`);
        console.log('Products response:', productsResponse.data);
        
        // Xử lý response từ API backend
        let productsData = [];
        if (productsResponse.data && productsResponse.data.success) {
          // API trả về: {success: true, data: {products: [...]}}
          if (productsResponse.data.data && productsResponse.data.data.products) {
            productsData = productsResponse.data.data.products;
          } else if (Array.isArray(productsResponse.data.data)) {
            productsData = productsResponse.data.data;
          }
        } else if (Array.isArray(productsResponse.data)) {
          // API trả về array trực tiếp
          productsData = productsResponse.data;
        }
        
        // Filter only Vietnam Heritage Collection products
        const heritageProducts = productsData.filter(product => 
          product.brand === 'Vietnam Heritage Collection' || 
          product.category?.name === 'Vietnam Heritage Collection'
        );
        
        setProducts(heritageProducts);
        
        // Lấy danh mục từ database
        const categoriesResponse = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/categories`);
        console.log('Categories response:', categoriesResponse.data);
        
        // Xử lý response categories
        let categoriesData = [];
        if (categoriesResponse.data && categoriesResponse.data.success) {
          // API trả về: {success: true, data: [...]}
          if (Array.isArray(categoriesResponse.data.data)) {
            categoriesData = categoriesResponse.data.data;
          }
        } else if (Array.isArray(categoriesResponse.data)) {
          // API trả về array trực tiếp
          categoriesData = categoriesResponse.data;
        }
        
        // Filter for Vietnam Heritage Collection category
        const heritageCategory = categoriesData.find(cat => 
          cat.name === 'Vietnam Heritage Collection'
        );
        
        setCategories(heritageCategory ? [heritageCategory] : []);
        
      } catch (error) {
        console.error('Error fetching products:', error);
        message.error('Không thể tải sản phẩm Vietnam Heritage Collection');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addItem({
      product: {
        _id: product._id || product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images?.[0]?.url || product.image || '/images/placeholder.png',
        images: product.images,
        description: product.description,
        shortDescription: product.shortDescription,
        category: product.category,
        brand: product.brand,
        sizes: product.sizes || ['M'],
        colors: product.colors || ['Trắng'],
        inStock: product.inStock !== false,
        rating: product.rating,
        sales: product.sales
      },
      quantity: 1,
      size: product.sizes?.[0] || 'M',
      color: product.colors?.[0] || 'Trắng'
    }));
    message.success(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const handleWishlistToggle = (productId) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
        message.info('Đã xóa khỏi danh sách yêu thích');
      } else {
        newWishlist.add(productId);
        message.success('Đã thêm vào danh sách yêu thích');
      }
      return newWishlist;
    });
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product._id || product.id}`);
  };

  const filteredProducts = Array.isArray(products) ? products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || 
      (product.category && product.category.name === selectedCategory) ||
      (typeof product.category === 'string' && product.category === selectedCategory);
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      case 'rating':
        return (b.rating?.average || 0) - (a.rating?.average || 0);
      case 'sales':
        return (b.sales || 0) - (a.sales || 0);
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }
  }) : [];

  const categoryOptions = Array.isArray(categories) ? ['Tất cả', ...categories.map(cat => cat.name || cat)] : ['Tất cả'];

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
        <p>Đang tải sản phẩm...</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <div className="heritage-pattern-overlay"></div>
        <div className="header-content">
          <h1 className="heritage-title">Vietnam Heritage Collection</h1>
          <p className="heritage-subtitle">Khám phá bộ sưu tập áo thun và polo tôn vinh văn hóa Việt Nam</p>

        </div>
      </div>

      <div className="products-filters">
        <div className="filter-toolbar">
          <div className="search-section">
            <Input
              placeholder="Tìm kiếm trong Vietnam Heritage Collection..."
              prefix={<SearchOutlined style={{ color: '#C1121F' }} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="heritage-search"
            />
          </div>
          
          <div className="filter-controls">
            <Select
              placeholder="Chọn danh mục"
              value={selectedCategory}
              onChange={setSelectedCategory}
              className="heritage-select"
            >
              {categoryOptions.map(category => (
                <Option key={category} value={category === 'Tất cả' ? '' : category}>
                  {category}
                </Option>
              ))}
            </Select>
            
            <Select
              placeholder="Sắp xếp"
              value={sortBy}
              onChange={setSortBy}
              className="heritage-select"
              suffixIcon={<SortAscendingOutlined />}
            >
              <Option value="newest">Mới nhất</Option>
              <Option value="price_low">Giá: Thấp đến cao</Option>
              <Option value="price_high">Giá: Cao đến thấp</Option>
              <Option value="rating">Đánh giá cao nhất</Option>
              <Option value="sales">Bán chạy nhất</Option>
              <Option value="name">Tên A-Z</Option>
            </Select>
            
            <div className="view-toggle">
              <Button
                type={viewMode === 'grid' ? 'primary' : 'default'}
                icon={<AppstoreOutlined />}
                onClick={() => setViewMode('grid')}
                className="view-btn"
              />
              <Button
                type={viewMode === 'list' ? 'primary' : 'default'}
                icon={<UnorderedListOutlined />}
                onClick={() => setViewMode('list')}
                className="view-btn"
              />
            </div>
          </div>
        </div>
        
        <div className="results-info">
          <span className="results-count">
            Hiển thị {filteredProducts.length} sản phẩm
          </span>
          {selectedCategory && (
            <Tag 
              closable 
              onClose={() => setSelectedCategory('')}
              className="active-filter-tag"
            >
              {selectedCategory}
            </Tag>
          )}
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div 
            key={product._id || product.id} 
            className="heritage-product-card"
            onClick={() => navigate(`/product/${product._id || product.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className="product-image-container">
              <img
                alt={product.name}
                src={product.images?.[0]?.url || product.image || '/images/placeholder.png'}
                className="product-image"
                onError={(e) => {
                  e.target.src = '/images/placeholder.png';
                }}
              />
              
              {/* Vietnam Heritage Collection Badge */}
              <div className="product-badges">
                <div className="heritage-badge">Vietnam Heritage</div>
                {product.isFeatured && <div className="featured-badge">Nổi bật</div>}
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="sale-badge">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </div>
                )}
              </div>
              
              {/* Wishlist Button */}
              <Button
                className={`product-wishlist-btn ${wishlist.has(product._id || product.id) ? 'active' : ''}`}
                icon={<HeartOutlined />}
                onClick={() => handleWishlistToggle(product._id || product.id)}
              />
            </div>
            
            <div className="product-content">
              <h3 className="product-name">{product.name}</h3>
              
              <p className="product-description">
                {product.shortDescription || product.description}
              </p>
              
              {/* Cultural Tag */}
              <Tag className="cultural-tag">
                Văn hóa Việt
              </Tag>
              
              {/* Rating */}
              {product.rating && (
                <div className="product-rating">
                  <Rate 
                    disabled 
                    value={product.rating.average} 
                    style={{ fontSize: '12px' }}
                  />
                  <span className="rating-count">({product.rating.count})</span>
                </div>
              )}
              
              {/* Price Section */}
              <div className="product-price-section">
                <div className="product-prices">
                  <div className="product-price-current">
                    {product.price?.toLocaleString('vi-VN')}₫
                  </div>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="product-price-original">
                      {product.originalPrice.toLocaleString('vi-VN')}₫
                    </div>
                  )}
                </div>
              </div>
              
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                onClick={() => handleAddToCart(product)}
                className="heritage-add-cart-btn"
                block
              >
                Thêm vào giỏ
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="heritage-empty-state">
          <div className="empty-illustration">
            <div className="vietnamese-pattern">🏛️</div>
          </div>
          <h3 className="empty-title">Không tìm thấy sản phẩm</h3>
          <p className="empty-subtitle">Thử điều chỉnh bộ lọc hoặc tìm kiếm khác</p>
          <Button 
            type="primary" 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('');
            }}
            className="heritage-empty-btn"
          >
            Xóa bộ lọc
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
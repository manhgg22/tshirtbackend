import React, { useEffect, useState } from 'react';
import { 
  Select, 
  Slider, 
  Pagination,
  Spin,
  message,
  Checkbox,
} from 'antd';
import { 
  SearchOutlined, 
  FilterOutlined, 
  StarFilled,
  FireOutlined,
  HeartOutlined,
  HeartFilled,
  EyeOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  CloseOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { toggleWishlist } from '../redux/wishlistSlice';
import { getProducts, getCategories } from '../services/api';
import testAPI from '../test-api';
import { useNavigate } from 'react-router-dom';
import './ProductsPage.css';

const { Option } = Select;

const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  
  // Filter states
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  
  // UI states
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedQuickViewImage, setSelectedQuickViewImage] = useState(0);
  
  // Data states
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [brands, setBrands] = useState([]);
  const [tags, setTags] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(false);
  const [addingToCart, setAddingToCart] = useState({});

  // Load categories on component mount
  useEffect(() => {
    // Test API connection first
    testAPI();
    loadCategories();
  }, []);

  // Load products when filters change
  useEffect(() => {
    loadProducts();
  }, [currentPage, pageSize, sortBy, selectedCategory, selectedBrand, priceRange, inStockOnly, featuredOnly, selectedTags, searchTerm]);

  const loadCategories = async () => {
    try {
      console.log('🔄 Loading categories...');
      const response = await getCategories();
      console.log('📂 Categories API Response:', response.data);
      const categoriesData = response.data || [];
      console.log('📂 Setting categories:', categoriesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadProducts = async () => {
    console.log('🔄 Loading products...');
    setLoadingFilters(true);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: pageSize,
        sort: sortBy,
        ...(selectedCategory && { category: selectedCategory }),
        ...(selectedBrand && { brand: selectedBrand }),
        ...(priceRange[0] > 0 && { minPrice: priceRange[0] }),
        ...(priceRange[1] < 1000000 && { maxPrice: priceRange[1] }),
        ...(inStockOnly && { inStock: 'true' }),
        ...(featuredOnly && { isFeatured: 'true' }),
        ...(searchTerm && { search: searchTerm }),
        ...(selectedTags.length > 0 && { tags: selectedTags.join(',') }),
      });

      const response = await getProducts(params);
      console.log('📦 API Response:', response.data);
      const data = response.data;
      
      // API trả về {success: true, data: {products: [...], pagination: {...}}}
      const productsData = data.data || data;
      setFilteredProducts(productsData.products || []);
      setTotalProducts(productsData.pagination?.total || 0);
      setBrands(productsData.filters?.brands || []);
      console.log('✅ Products loaded:', productsData.products?.length || 0, 'items');
      if (productsData.products?.[0]) {
        const firstProduct = productsData.products[0];
        console.log('📸 First product sample:', {
          name: firstProduct.name,
          images: firstProduct.images,
          'images[0]': firstProduct.images?.[0],
          'images[0].url': firstProduct.images?.[0]?.url,
          image: firstProduct.image,
          _id: firstProduct._id
        });
        console.log('📸 Full first product:', firstProduct);
      }
      
      // Extract tags from products
      const allTags = [];
      productsData.products?.forEach(product => {
        if (product.tags) {
          allTags.push(...product.tags);
        }
      });
      setTags([...new Set(allTags)]);
      
    } catch (error) {
      console.error('Error loading products:', error);
      message.error('Lỗi khi tải sản phẩm');
    } finally {
      setLoadingFilters(false);
    }
  };

  const handleAddToCart = (product, e) => {
    if (e) e.stopPropagation();
    
    setAddingToCart(prev => ({ ...prev, [product._id]: true }));
    
    dispatch(addItem({
      product: product,
      quantity: 1,
      size: product.sizes?.[0] || 'M',
      color: product.colors?.[0] || 'Trắng'
    }));
    
    message.success(`Đã thêm ${product.name} vào giỏ hàng!`);
    
    setTimeout(() => {
      setAddingToCart(prev => ({ ...prev, [product._id]: false }));
    }, 1000);
  };

  const handleToggleWishlist = (product, e) => {
    if (e) e.stopPropagation();
    dispatch(toggleWishlist(product));
    const isInWishlist = wishlistItems.some(item => item._id === product._id);
    message.success(isInWishlist ? 'Đã xóa khỏi yêu thích' : 'Đã thêm vào yêu thích');
  };

  const handleQuickView = (product, e) => {
    if (e) e.stopPropagation();
    setQuickViewProduct(product);
    setSelectedQuickViewImage(0);
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item._id === productId);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleBrandChange = (value) => {
    setSelectedBrand(value);
    setCurrentPage(1);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
    setCurrentPage(1);
  };

  const handleTagChange = (checkedValues) => {
    setSelectedTags(checkedValues);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedBrand('');
    setPriceRange([0, 1000000]);
    setInStockOnly(false);
    setFeaturedOnly(false);
    setSelectedTags([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setCurrentPage(1);
  };

  const handleColorToggle = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  // Available colors and sizes
  const availableColors = [
    { name: 'Trắng', value: '#FFFFFF' },
    { name: 'Đen', value: '#000000' },
    { name: 'Xám', value: '#808080' },
    { name: 'Đỏ', value: '#FF0000' },
    { name: 'Xanh dương', value: '#0000FF' },
    { name: 'Xanh lá', value: '#00FF00' },
    { name: 'Vàng', value: '#FFD700' },
    { name: 'Hồng', value: '#FFC0CB' },
    { name: 'Cam', value: '#FFA500' },
    { name: 'Tím', value: '#800080' },
  ];

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <div className="products-page">
      {/* Hero Banner - Vietnamese Heritage Theme */}
      <div className="products-hero-vn">
        <div className="products-hero-pattern"></div>
        <div className="products-hero-content-vn">
          <h1 className="products-hero-title-vn">
             Bộ Sưu Tập <span className="highlight-gold">Tinh Thần Việt Nam</span>
          </h1>
          <p className="products-hero-subtitle-vn">
            Khám phá thời trang thể hiện niềm tự hào dân tộc
          </p>
          {/* <div className="products-hero-stats-vn">
            <div className="hero-stat-card-vn">
              <div className="stat-icon-vn">🎨</div>
              <div className="stat-content-vn">
                <span className="stat-number-vn">{totalProducts}</span>
                <span className="stat-label-vn">Thiết kế độc đáo</span>
              </div>
            </div>
            <div className="hero-stat-card-vn">
              <div className="stat-icon-vn">📦</div>
              <div className="stat-content-vn">
                <span className="stat-number-vn">{categories.length}</span>
                <span className="stat-label-vn">Danh mục đa dạng</span>
              </div>
            </div>
            <div className="hero-stat-card-vn">
              <div className="stat-icon-vn">✓</div>
              <div className="stat-content-vn">
                <span className="stat-number-vn">100%</span>
                <span className="stat-label-vn">Chính hãng Việt</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="products-container">
        <div className="products-layout">
          {/* Filters Sidebar */}
          <aside className="products-filters">
            <div className="filter-header">
              <h3 className="filter-title">
                  <FilterOutlined />
                  Bộ lọc
              </h3>
              <button className="filter-clear-btn" onClick={handleClearFilters}>
                Xóa hết
              </button>
            </div>

                {/* Search */}
            <div className="filter-section">
              <label className="filter-section-title">Tìm kiếm</label>
              <input
                type="text"
                className="filter-search-input"
                    placeholder="Tìm sản phẩm..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>

                {/* Category */}
            <div className="filter-section">
              <label className="filter-section-title">Danh mục</label>
                  <Select
                    placeholder="Chọn danh mục"
                    onChange={handleCategoryChange}
                value={selectedCategory || undefined}
                className="filter-select"
                    allowClear
                  >
                    {Array.isArray(categories) && categories.map(category => (
                      <Option key={category._id} value={category._id}>
                        {category.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                {/* Brand */}
            {brands.length > 0 && (
              <div className="filter-section">
                <label className="filter-section-title">Thương hiệu</label>
                  <Select
                    placeholder="Chọn thương hiệu"
                    onChange={handleBrandChange}
                  value={selectedBrand || undefined}
                  className="filter-select"
                    allowClear
                  >
                  {brands.map(brand => (
                      <Option key={brand} value={brand}>
                        {brand}
                      </Option>
                    ))}
                  </Select>
                </div>
            )}

                {/* Price Range */}
            <div className="filter-section">
              <label className="filter-section-title">Khoảng giá</label>
              <div className="filter-price-range">
                    <Slider
                      range
                      min={0}
                      max={1000000}
                      step={10000}
                      value={priceRange}
                      onChange={handlePriceChange}
                />
                <div className="filter-price-display">
                  <span>{priceRange[0].toLocaleString('vi-VN')}đ</span>
                  <span>{priceRange[1].toLocaleString('vi-VN')}đ</span>
                    </div>
                  </div>
                </div>

            {/* Colors */}
            <div className="filter-section">
              <label className="filter-section-title">Màu sắc</label>
              <div className="filter-color-grid">
                {availableColors.map(color => (
                  <div
                    key={color.name}
                    className={`filter-color-item ${selectedColors.includes(color.name) ? 'active' : ''}`}
                    style={{ backgroundColor: color.value, border: color.value === '#FFFFFF' ? '2px solid #e8e8e8' : 'none' }}
                    onClick={() => handleColorToggle(color.name)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="filter-section">
              <label className="filter-section-title">Kích thước</label>
              <div className="filter-size-grid">
                {availableSizes.map(size => (
                  <div
                    key={size}
                    className={`filter-size-item ${selectedSizes.includes(size) ? 'active' : ''}`}
                    onClick={() => handleSizeToggle(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>

            {/* Other Filters */}
            <div className="filter-section">
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                />
                    Chỉ sản phẩm còn hàng
              </label>
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                    checked={featuredOnly}
                    onChange={(e) => setFeaturedOnly(e.target.checked)}
                />
                <FireOutlined style={{ marginLeft: 4 }} /> Sản phẩm nổi bật
              </label>
                </div>
          </aside>

          {/* Products Main */}
          <main className="products-main">
            {/* Toolbar */}
            <div className="products-toolbar">
              <div className="toolbar-left">
                <div className="toolbar-sort">
                  <span className="toolbar-sort-label">Sắp xếp:</span>
                  <Select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="toolbar-sort-select"
                  >
                    <Option value="newest">Mới nhất</Option>
                    <Option value="oldest">Cũ nhất</Option>
                    <Option value="price_low">Giá: Thấp → Cao</Option>
                    <Option value="price_high">Giá: Cao → Thấp</Option>
                    <Option value="rating">Đánh giá cao</Option>
                    <Option value="sales">Bán chạy</Option>
                    <Option value="name">Tên A-Z</Option>
                  </Select>
                </div>
                {/* View Toggle */}
                <div className="toolbar-view-toggle">
                  <button 
                    className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <AppstoreOutlined />
                  </button>
                  <button 
                    className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    <UnorderedListOutlined />
                  </button>
                </div>
                </div>
                
              <div className="toolbar-right">
                <span>Hiển thị {filteredProducts.length} / {totalProducts} sản phẩm</span>
                {loadingFilters && <Spin size="small" />}
              </div>
            </div>

            {/* Products Grid/List */}
            {loadingFilters ? (
              <div className="products-grid">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <div key={i} className="product-skeleton">
                    <div className="skeleton-image" />
                    <div className="skeleton-content">
                      <div className="skeleton-line" />
                      <div className="skeleton-line short" />
                      <div className="skeleton-line short" />
                    </div>
                </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="products-empty">
                <div className="empty-illustration">📦</div>
                <h3 className="empty-title">Không tìm thấy sản phẩm</h3>
                <p className="empty-subtitle">Thử điều chỉnh bộ lọc hoặc tìm kiếm khác</p>
                <button className="empty-btn" onClick={handleClearFilters}>
                  Xóa bộ lọc
                </button>
              </div>
            ) : (
              <>
                <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                  {filteredProducts.map(product => (
                    <div 
                      key={product._id} 
                      className="product-card"
                      onClick={() => handleProductClick(product._id)}
                    >
                      {/* Image Container */}
                      <div className="products-page-image-container">
                        <img
                          src={product.images?.[0]?.url || '/images/placeholder.png'}
                          alt={product.name}
                          className="products-page-image"
                          onError={(e) => {
                            console.error('❌ Image load failed:', {
                              productName: product.name,
                              attemptedURL: e.target.src,
                              originalPath: product.images?.[0]?.url,
                              fullProduct: product
                            });
                            // Fallback to placeholder
                            if (!e.target.src.includes('placeholder.png')) {
                              e.target.src = '/images/placeholder.png';
                            }
                          }}
                        />
                        
                        {/* Badges */}
                        <div className="product-badges">
                          {product.isNew && (
                            <span className="product-badge badge-new">MỚI</span>
                          )}
                          {product.discount > 0 && (
                            <span className="product-badge badge-sale">
                              -{product.discount}%
                            </span>
                          )}
                          {product.isFeatured && (
                            <span className="product-badge badge-hot">HOT</span>
                          )}
                        </div>

                        {/* Quick Actions Overlay */}
                        <div className="product-quick-actions">
                          <button 
                            className="quick-action-btn"
                            onClick={(e) => handleQuickView(product, e)}
                            title="Xem nhanh"
                          >
                            <EyeOutlined />
                          </button>
                          <button 
                            className="quick-action-btn"
                            onClick={(e) => handleAddToCart(product, e)}
                            title="Thêm vào giỏ"
                          >
                            <ShoppingCartOutlined />
                          </button>
                        </div>

                        {/* Wishlist Button */}
                        <button 
                          className={`product-wishlist-btn ${isInWishlist(product._id) ? 'active' : ''}`}
                          onClick={(e) => handleToggleWishlist(product, e)}
                        >
                          {isInWishlist(product._id) ? <HeartFilled /> : <HeartOutlined />}
                        </button>
                      </div>

                      {/* Product Content */}
                      <div className="product-content">
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-description">{product.description}</p>
                        
                        {/* Rating */}
                        <div className="product-rating">
                          <div className="product-stars">
                            {[...Array(5)].map((_, i) => {
                              const ratingValue = typeof product.rating === 'number' 
                                ? product.rating 
                                : typeof product.rating === 'object' && product.rating?.average
                                  ? Number(product.rating.average)
                                  : 5;
                              return (
                                <StarFilled 
                                  key={i} 
                                  style={{ 
                                    color: i < Math.floor(ratingValue) ? '#faad14' : '#d9d9d9' 
                                  }} 
                                />
                              );
                            })}
                          </div>
                          <span className="product-rating-number">
                            {typeof product.rating === 'number' 
                              ? product.rating.toFixed(1) 
                              : typeof product.rating === 'object' && product.rating?.average
                                ? Number(product.rating.average).toFixed(1)
                                : '5.0'
                            }
                          </span>
                          <span className="product-rating-count">
                            ({product.reviewCount || product.rating?.count || 0})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="product-price-section">
                          <div className="product-prices">
                            {product.originalPrice && product.originalPrice > product.price && (
                              <span className="product-price-original">
                                {product.originalPrice.toLocaleString('vi-VN')}đ
                              </span>
                            )}
                            <span className="product-price-current">
                              {product.price.toLocaleString('vi-VN')}đ
                            </span>
                          </div>
                          {product.discount > 0 && (
                            <span className="product-discount">-{product.discount}%</span>
                          )}
                        </div>

                        {/* Add to Cart Button */}
                        <button
                          className={`product-add-cart-btn ${addingToCart[product._id] ? 'added' : ''}`}
                          onClick={(e) => handleAddToCart(product, e)}
                        >
                          <ShoppingCartOutlined />
                          {addingToCart[product._id] ? 'Đã thêm!' : 'Thêm vào giỏ'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalProducts > pageSize && (
                  <div className="products-pagination">
                    <Pagination
                      current={currentPage}
                      total={totalProducts}
                      pageSize={pageSize}
                      showSizeChanger
                      showQuickJumper
                      showTotal={(total, range) => 
                        `${range[0]}-${range[1]} của ${total} sản phẩm`
                      }
                      onChange={handlePageChange}
                      onShowSizeChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="quick-view-modal" onClick={() => setQuickViewProduct(null)}>
          <div className="quick-view-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="quick-view-close"
              onClick={() => setQuickViewProduct(null)}
            >
              <CloseOutlined />
            </button>
            
            <div className="quick-view-body">
              {/* Images */}
              <div className="quick-view-images">
                <img
                  src={quickViewProduct.images?.[selectedQuickViewImage]?.url || '/images/placeholder.png'}
                  alt={quickViewProduct.name}
                  className="quick-view-main-image"
                />
                {quickViewProduct.images && quickViewProduct.images.length > 1 && (
                  <div className="quick-view-thumbnails">
                    {quickViewProduct.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img.url}
                        alt={`${quickViewProduct.name} ${idx + 1}`}
                        className={`quick-view-thumbnail ${idx === selectedQuickViewImage ? 'active' : ''}`}
                        onClick={() => setSelectedQuickViewImage(idx)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="quick-view-info">
                <h2>{quickViewProduct.name}</h2>
                <div className="quick-view-price">
                  {quickViewProduct.price.toLocaleString('vi-VN')}đ
                </div>
                <p className="quick-view-description">{quickViewProduct.description}</p>

                {/* Sizes */}
                {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                  <div className="quick-view-variants">
                    <label className="variant-label">Kích thước:</label>
                    <div className="variant-options">
                      {quickViewProduct.sizes.map(size => (
                        <div key={size} className="variant-option">{size}</div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Colors */}
                {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                  <div className="quick-view-variants">
                    <label className="variant-label">Màu sắc:</label>
                    <div className="variant-options">
                      {quickViewProduct.colors.map(color => (
                        <div key={color} className="variant-option">{color}</div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="quick-view-actions">
                  <button 
                    className="quick-view-add-cart"
                    onClick={(e) => {
                      handleAddToCart(quickViewProduct, e);
                      setQuickViewProduct(null);
                    }}
                  >
                    <ShoppingCartOutlined /> Thêm vào giỏ hàng
                  </button>
                  <button 
                    className="quick-view-view-full"
                    onClick={() => {
                      navigate(`/products/${quickViewProduct._id}`);
                      setQuickViewProduct(null);
                    }}
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;

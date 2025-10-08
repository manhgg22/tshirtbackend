import React, { useEffect, useState } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Input, 
  Select, 
  Slider, 
  Button, 
  Typography, 
  Space,
  Pagination,
  Spin,
  Empty,
  message,
  Checkbox,
  Divider
} from 'antd';
import { 
  SearchOutlined, 
  FilterOutlined, 
  StarFilled,
  FireOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import ProductCard from '../components/ProductCard';
import { getProducts, getCategories } from '../services/api';
import testAPI from '../test-api';

const { Title, Text } = Typography;
const { Option } = Select;

const ProductsPage = () => {
  const dispatch = useDispatch();
  
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
  
  // Data states
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [brands, setBrands] = useState([]);
  const [tags, setTags] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(false);

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

  const handleAddToCart = (product) => {
    console.log('🛒 Adding product to cart:', {
      product: product,
      productId: product._id,
      productName: product.name,
      productPrice: product.price,
      productImages: product.images,
      productImage: product.images?.[0]?.url
    });
    
    dispatch(addItem({
      product: product,
      quantity: 1
    }));
    
    console.log('✅ Dispatched addItem action');
    message.success(`Đã thêm ${product.name} vào giỏ hàng!`);
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
    setCurrentPage(1);
  };

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Title level={2} className="text-center text-red-600 mb-4">
            🇻🇳 Sản Phẩm Tinh Thần Việt Nam
          </Title>
          <Text className="text-center block text-gray-600">
            Khám phá bộ sưu tập thời trang thể hiện niềm tự hào dân tộc
          </Text>
        </div>

        <Row gutter={[24, 24]}>
          {/* Filters Sidebar */}
          <Col xs={24} lg={6}>
            <Card 
              title={
                <Space>
                  <FilterOutlined />
                  Bộ lọc
                </Space>
              } 
              className="sticky top-4"
              extra={
                <Button 
                  type="link" 
                  size="small" 
                  onClick={handleClearFilters}
                >
                  Xóa bộ lọc
                </Button>
              }
            >
              <Space direction="vertical" className="w-full" size="middle">
                {/* Search */}
                <div>
                  <Text strong>Tìm kiếm:</Text>
                  <Input
                    placeholder="Tìm sản phẩm..."
                    prefix={<SearchOutlined />}
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="mt-1"
                  />
                </div>

                {/* Category */}
                <div>
                  <Text strong>Danh mục:</Text>
                  <Select
                    placeholder="Chọn danh mục"
                    onChange={handleCategoryChange}
                    value={selectedCategory}
                    className="w-full mt-1"
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
                <div>
                  <Text strong>Thương hiệu:</Text>
                  <Select
                    placeholder="Chọn thương hiệu"
                    onChange={handleBrandChange}
                    value={selectedBrand}
                    className="w-full mt-1"
                    allowClear
                  >
                    {Array.isArray(brands) && brands.map(brand => (
                      <Option key={brand} value={brand}>
                        {brand}
                      </Option>
                    ))}
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <Text strong>Khoảng giá:</Text>
                  <div className="mt-2">
                    <Slider
                      range
                      min={0}
                      max={1000000}
                      step={10000}
                      value={priceRange}
                      onChange={handlePriceChange}
                      tooltip={{
                        formatter: (value) => `${value?.toLocaleString('vi-VN')} VNĐ`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{priceRange[0].toLocaleString('vi-VN')} VNĐ</span>
                      <span>{priceRange[1].toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {Array.isArray(tags) && tags.length > 0 && (
                  <div>
                    <Text strong>Tags:</Text>
                    <Checkbox.Group
                      options={tags.map(tag => ({ label: tag, value: tag }))}
                      value={selectedTags}
                      onChange={handleTagChange}
                      className="mt-1"
                    />
                  </div>
                )}

                {/* Filters */}
                <Divider />
                <div>
                  <Checkbox
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                  >
                    Chỉ sản phẩm còn hàng
                  </Checkbox>
                </div>
                <div>
                  <Checkbox
                    checked={featuredOnly}
                    onChange={(e) => setFeaturedOnly(e.target.checked)}
                  >
                    <Space>
                      <FireOutlined />
                      Sản phẩm nổi bật
                    </Space>
                  </Checkbox>
                </div>
              </Space>
            </Card>
          </Col>

          {/* Products Section */}
          <Col xs={24} lg={18}>
            {/* Sort and Results */}
            <Card className="mb-4">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <Text strong>Sắp xếp theo:</Text>
                  <Select
                    value={sortBy}
                    onChange={handleSortChange}
                    style={{ width: 150 }}
                  >
                    <Option value="newest">Mới nhất</Option>
                    <Option value="oldest">Cũ nhất</Option>
                    <Option value="price_low">Giá thấp → cao</Option>
                    <Option value="price_high">Giá cao → thấp</Option>
                    <Option value="rating">Đánh giá cao</Option>
                    <Option value="sales">Bán chạy</Option>
                    <Option value="name">Tên A-Z</Option>
                  </Select>
                </div>
                
                <Text>
                  Hiển thị {totalProducts} sản phẩm
                  {loadingFilters && <Spin size="small" className="ml-2" />}
                </Text>
              </div>
            </Card>

            {/* Products */}
            {loadingFilters ? (
              <div className="text-center py-12">
                <Spin size="large" />
                <div className="mt-4">
                  <Text>Đang tải sản phẩm...</Text>
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <Empty
                description="Không tìm thấy sản phẩm nào"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              >
                <Button onClick={handleClearFilters}>
                  Xóa bộ lọc
                </Button>
              </Empty>
            ) : (
              <>
                <Row gutter={[16, 16]}>
                  {filteredProducts.map((product) => (
                    <Col xs={12} sm={8} md={6} key={product._id}>
                      <ProductCard 
                        product={product} 
                        onAddToCart={() => handleAddToCart(product)}
                      />
                    </Col>
                  ))}
                </Row>

                {/* Pagination */}
                {totalProducts > pageSize && (
                  <div className="text-center mt-8">
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
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductsPage;

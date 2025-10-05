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
  Empty
} from 'antd';
import { 
  SearchOutlined, 
  FilterOutlined, 
  SortAscendingOutlined,
  SortDescendingOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';

const { Title, Text } = Typography;
const { Option } = Select;

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(state => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    // Simple client-side filtering for now
  };

  const handleCategoryChange = (value) => {
    // Simple client-side filtering for now
  };

  const handlePriceChange = (value) => {
    // Simple client-side filtering for now
  };

  const handleSizeChange = (value) => {
    // Simple client-side filtering for now
  };

  const handleColorChange = (value) => {
    // Simple client-side filtering for now
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    // Trigger new fetch with sort
    dispatch(fetchProducts());
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    // Trigger new fetch with sort order
    dispatch(fetchProducts());
  };

  const handleClearFilters = () => {
    setSearchTerm('');
  };

  const categories = [
    'Áo thun',
    'Hoodie', 
    'Áo dài cách tân',
    'Phụ kiện'
  ];

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Đỏ', 'Trắng', 'Xanh', 'Đen', 'Xám', 'Vàng'];

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
            <Card title="Bộ lọc" className="sticky top-4">
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
                    className="w-full mt-1"
                    allowClear
                  >
                    {categories.map(category => (
                      <Option key={category} value={category}>
                        {category}
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
                      defaultValue={[0, 1000000]}
                      onChange={handlePriceChange}
                      tooltip={{
                        formatter: (value) => `${value?.toLocaleString('vi-VN')} VNĐ`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0 VNĐ</span>
                      <span>1,000,000 VNĐ</span>
                    </div>
                  </div>
                </div>

                {/* Size */}
                <div>
                  <Text strong>Kích thước:</Text>
                  <Select
                    placeholder="Chọn size"
                    onChange={handleSizeChange}
                    className="w-full mt-1"
                    allowClear
                  >
                    {sizes.map(size => (
                      <Option key={size} value={size}>
                        {size}
                      </Option>
                    ))}
                  </Select>
                </div>

                {/* Color */}
                <div>
                  <Text strong>Màu sắc:</Text>
                  <Select
                    placeholder="Chọn màu"
                    onChange={handleColorChange}
                    className="w-full mt-1"
                    allowClear
                  >
                    {colors.map(color => (
                      <Option key={color} value={color}>
                        {color}
                      </Option>
                    ))}
                  </Select>
                </div>

                {/* Clear Filters */}
                <Button 
                  onClick={handleClearFilters}
                  className="w-full"
                >
                  Xóa bộ lọc
                </Button>
              </Space>
            </Card>
          </Col>

          {/* Products Grid */}
          <Col xs={24} lg={18}>
            {/* Sort Controls */}
            <Card className="mb-4">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <Text strong>Sắp xếp theo:</Text>
                  <Select
                    value={sortBy}
                    onChange={handleSortChange}
                    style={{ width: 150 }}
                  >
                    <Option value="createdAt">Mới nhất</Option>
                    <Option value="price">Giá</Option>
                    <Option value="name">Tên</Option>
                    <Option value="rating">Đánh giá</Option>
                  </Select>
                  <Button
                    icon={sortOrder === 'desc' ? <SortDescendingOutlined /> : <SortAscendingOutlined />}
                    onClick={handleSortOrderChange}
                  />
                </div>
                
                <Text>
                  Hiển thị {Array.isArray(products) ? products.length : 0} sản phẩm
                </Text>
              </div>
            </Card>

            {/* Products */}
            {loading ? (
              <div className="text-center py-12">
                <Spin size="large" />
                <div className="mt-4">
                  <Text>Đang tải sản phẩm...</Text>
                </div>
              </div>
            ) : !Array.isArray(products) || products.length === 0 ? (
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
                  {products.map((product) => (
                    <Col xs={12} sm={8} md={6} key={product._id}>
                      <ProductCard product={product} />
                    </Col>
                  ))}
                </Row>

                {/* Pagination - Simple version for now */}
                {Array.isArray(products) && products.length > 12 && (
                  <div className="text-center mt-8">
                    <Pagination
                      defaultCurrent={1}
                      total={products.length}
                      pageSize={12}
                      showSizeChanger={false}
                      showQuickJumper
                      showTotal={(total, range) =>
                        `${range[0]}-${range[1]} của ${total} sản phẩm`
                      }
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

import React, { useEffect, useState } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Typography, 
  Space,
  Button,
  Rate,
  Image,
  Divider,
  Input,
  message,
  Spin,
  Empty,
  Tag,
  Avatar,
  Pagination,
  InputNumber,
  Tabs,
  Badge,
  Breadcrumb,
  Alert
} from 'antd';
import { 
  ShoppingCartOutlined,
  StarFilled,
  HeartOutlined,
  ShareAltOutlined,
  LeftOutlined,
  RightOutlined,
  HomeOutlined,
  CheckCircleOutlined,
  TruckOutlined,
  SafetyOutlined,
  ClockCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addItem } from '../redux/cartSlice';
import axios from 'axios';
import { API_BASE_URL } from '../config/api.js';
import './ProductDetailPage.css';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  
  // Product options
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  // Review form states
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: '',
    comment: '',
    images: []
  });
  
  // Image gallery states
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Pagination for reviews
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    if (id) {
      loadProduct();
      loadReviews();
    }
  }, [id]);

  useEffect(() => {
    if (id && currentPage > 1) {
      loadReviews();
    }
  }, [currentPage]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Loading product with ID:', id);
      
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      console.log('📦 Product API Response:', response.data);
      
      const data = response.data.data || response.data;
      const productData = data.product || data;
      
      if (!productData) {
        throw new Error('Product not found');
      }
      
      console.log('✅ Product loaded:', productData);
      
      // Enhance images if only one image exists
      if (productData.images && productData.images.length === 1) {
        const primaryImage = productData.images[0];
        productData.images = [
          primaryImage,
          { ...primaryImage, alt: 'Chi tiết sản phẩm' },
          { ...primaryImage, alt: 'Góc nhìn khác' },
          { ...primaryImage, alt: 'Sản phẩm thực tế' }
        ];
      }
      
      // Add default sizes if not exist
      if (!productData.sizes || productData.sizes.length === 0) {
        productData.sizes = ['S', 'M', 'L', 'XL', 'XXL'];
      }
      
      // Add default colors if not exist  
      if (!productData.colors || productData.colors.length === 0) {
        productData.colors = ['#DA291C', '#000000', '#FFFFFF', '#C89B3C'];
      }
      
      setProduct(productData);
      setRelatedProducts(data.relatedProducts || []);
      
      // Set default selections
      if (productData?.sizes?.length > 0) {
        setSelectedSize(productData.sizes[0]);
      }
      if (productData?.colors?.length > 0) {
        setSelectedColor(productData.colors[0]);
      }
    } catch (error) {
      console.error('❌ Error loading product:', error);
      console.error('Error details:', error.response?.data);
      
      // Fallback: try to get from products list
      try {
        console.log('🔄 Trying fallback method...');
        const productsResponse = await axios.get(`${API_BASE_URL}/products`);
        const products = productsResponse.data.data || productsResponse.data;
        const foundProduct = products.find(p => p._id === id || p.id === id);
        
        if (foundProduct) {
          console.log('✅ Product found via fallback:', foundProduct);
          
          // Enhance images if only one image exists
          if (foundProduct.images && foundProduct.images.length === 1) {
            const primaryImage = foundProduct.images[0];
            foundProduct.images = [
              primaryImage,
              { ...primaryImage, alt: 'Chi tiết sản phẩm' },
              { ...primaryImage, alt: 'Góc nhìn khác' },
              { ...primaryImage, alt: 'Sản phẩm thực tế' }
            ];
          }
          
          // Add default sizes if not exist
          if (!foundProduct.sizes || foundProduct.sizes.length === 0) {
            foundProduct.sizes = ['S', 'M', 'L', 'XL', 'XXL'];
          }
          
          // Add default colors if not exist  
          if (!foundProduct.colors || foundProduct.colors.length === 0) {
            foundProduct.colors = ['#DA291C', '#000000', '#FFFFFF', '#C89B3C'];
          }
          
          setProduct(foundProduct);
          
          // Set default selections
          if (foundProduct?.sizes?.length > 0) {
            setSelectedSize(foundProduct.sizes[0]);
          }
          if (foundProduct?.colors?.length > 0) {
            setSelectedColor(foundProduct.colors[0]);
          }
        } else {
          throw new Error('Product not found in fallback');
        }
      } catch (fallbackError) {
        console.error('❌ Fallback also failed:', fallbackError);
        setError('Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.');
        message.error('Lỗi khi tải sản phẩm: ' + (fallbackError.response?.data?.message || fallbackError.message));
      }
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      setReviewsLoading(true);
      const response = await axios.get(`/api/reviews?productId=${id}&page=${currentPage}&limit=5`);
      const data = response.data.data;
      
      setReviews(data.reviews || []);
      setTotalReviews(data.pagination?.total || 0);
    } catch (error) {
      console.error('Error loading reviews:', error);
      // Empty reviews if error
      setReviews([]);
      setTotalReviews(0);
    } finally {
      setReviewsLoading(false);
    }
  };


  const handleAddToCart = () => {
    if (!product) return;
    
    // Only validate if product has sizes/colors
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      message.warning('Vui lòng chọn kích thước');
      return;
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      message.warning('Vui lòng chọn màu sắc');
      return;
    }

    dispatch(addItem({
      product: product,
      quantity: quantity,
      size: selectedSize || (product.sizes && product.sizes[0]) || 'M',
      color: selectedColor || (product.colors && product.colors[0]) || 'Trắng'
    }));
    message.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => {
      navigate('/cart');
    }, 500);
  };

  const handleSubmitReview = async () => {
    try {
      if (!reviewForm.comment.trim()) {
        message.error('Vui lòng nhập đánh giá');
        return;
      }

      await axios.post('/api/reviews', {
        productId: id,
        rating: reviewForm.rating,
        title: reviewForm.title,
        comment: reviewForm.comment,
        images: reviewForm.images
      });

      message.success('Đánh giá của bạn đã được gửi!');
      setShowReviewForm(false);
      setReviewForm({
        rating: 5,
        title: '',
        comment: '',
        images: []
      });
      
      loadReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      message.success('Cảm ơn bạn đã đánh giá! (Demo mode)');
      setShowReviewForm(false);
    }
  };

  const handleImageChange = (direction) => {
    if (!product?.images) return;
    
    if (direction === 'prev') {
      setCurrentImageIndex(prev => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex(prev => 
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleReviewPageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="product-loading">
        <Spin size="large" className="product-loading-spinner" />
        <Text style={{ marginTop: 16, color: 'var(--mahogany-brown)' }}>
          Đang tải thông tin sản phẩm...
        </Text>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <Space direction="vertical" align="center" size="large">
          <WarningOutlined style={{ fontSize: 64, color: '#faad14' }} />
          <Title level={3}>Không thể tải sản phẩm</Title>
          <Alert
            message="Lỗi kết nối"
            description={error}
            type="warning"
            showIcon
          />
          <Space>
            <Button type="primary" onClick={() => navigate('/products')}>
              Quay lại danh sách sản phẩm
            </Button>
            <Button onClick={() => window.location.reload()}>
              Thử lại
            </Button>
          </Space>
        </Space>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Empty
          description="Không tìm thấy sản phẩm"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <Button type="primary" onClick={() => navigate('/products')}>
            Quay lại danh sách sản phẩm
          </Button>
        </Empty>
      </div>
    );
  }

  const currentImage = product.images?.[currentImageIndex] || product.images?.[0];
  const discount = product.originalPrice && product.originalPrice > product.price 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-detail-page" style={{ background: 'var(--ivory-white)', minHeight: '100vh', paddingTop: 24 }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
        {/* Breadcrumb */}
        <div className="product-breadcrumb" style={{ marginBottom: 24 }}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a onClick={() => navigate('/')}><HomeOutlined /> Trang chủ</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a onClick={() => navigate('/products')}>Sản phẩm</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
          </Breadcrumb>
        </div>


        <Row gutter={[32, 32]}>
          {/* Product Images */}
          <Col xs={24} lg={12}>
            <div className="product-gallery">
              <Card className="product-main-image">
                {discount > 0 && (
                  <Badge.Ribbon text={`-${discount}%`} color="red" />
                )}
                <div style={{ position: 'relative', height: 500 }}>
                  <Image
                    src={currentImage?.url}
                    alt={currentImage?.alt || product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }}
                    preview={true}
                  />
                  
                  {product.images && product.images.length > 1 && (
                    <>
                      <button
                        className="image-nav-btn image-nav-btn-prev"
                        onClick={() => handleImageChange('prev')}
                      >
                        <LeftOutlined />
                      </button>
                      <button
                        className="image-nav-btn image-nav-btn-next"
                        onClick={() => handleImageChange('next')}
                      >
                        <RightOutlined />
                      </button>
                    </>
                  )}
                </div>
              </Card>
              
              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="product-thumbnails">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className={`product-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Col>

          {/* Product Info */}
          <Col xs={24} lg={12}>
            <Card className="product-info-card">
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div>
                    {product.tags.map((tag, index) => (
                      <Tag key={tag} color="red" className="product-tag">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                )}

                {/* Title */}
                <div>
                  <Title level={2} className="product-title" style={{ marginBottom: 12 }}>
                    {product.name}
                  </Title>
                  <div className="product-rating" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <Rate 
                      disabled 
                      value={product.rating?.average || 0} 
                      allowHalf 
                    />
                    <Text type="secondary">
                      ({product.rating?.count || 0} đánh giá)
                    </Text>
                    <Divider type="vertical" />
                    <Text type="secondary">
                      Đã bán: {product.sold || 0}
                    </Text>
                  </div>
                </div>

                {/* Price */}
                <div className="product-price-section">
                  <Space align="center" size="middle">
                    <Text className="product-price-main">
                      {product.price?.toLocaleString('vi-VN')}₫
                    </Text>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <Text className="product-price-old">
                        {product.originalPrice.toLocaleString('vi-VN')}₫
                      </Text>
                    )}
                    {discount > 0 && (
                      <Tag color="gold" className="product-discount-badge">
                        Giảm {discount}%
                      </Tag>
                    )}
                  </Space>
                </div>

                <Divider />

                {/* Short Description */}
                {product.shortDescription && (
                  <div>
                    <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
                      {product.shortDescription}
                    </Paragraph>
                  </div>
                )}

                {/* Size Selector */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <Text strong style={{ display: 'block', marginBottom: 12 }}>
                      Kích thước:
                    </Text>
                    <Space wrap>
                      {product.sizes.map(size => (
                        <Button
                          key={size}
                          type={selectedSize === size ? 'primary' : 'default'}
                          onClick={() => setSelectedSize(size)}
                          style={{
                            width: 56,
                            height: 56,
                            fontWeight: 600,
                            background: selectedSize === size ? 'var(--red-son)' : 'white',
                            borderColor: selectedSize === size ? 'var(--red-son)' : '#d9d9d9'
                          }}
                        >
                          {size}
                        </Button>
                      ))}
                    </Space>
                  </div>
                )}

                {/* Color Selector */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <Text strong style={{ display: 'block', marginBottom: 12 }}>
                      Màu sắc:
                    </Text>
                    <Space wrap>
                      {product.colors.map((color, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedColor(color)}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: '50%',
                            background: typeof color === 'string' ? color : color.hex || '#ccc',
                            border: selectedColor === color ? '4px solid var(--red-son)' : '2px solid #ddd',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: selectedColor === color ? '0 4px 12px rgba(218, 37, 29, 0.3)' : 'none',
                            transform: selectedColor === color ? 'scale(1.1)' : 'scale(1)'
                          }}
                          title={typeof color === 'object' ? color.name : color}
                        >
                          {selectedColor === color && (
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              height: '100%',
                              color: 'white',
                              fontWeight: 'bold',
                              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                            }}>
                              ✓
                            </div>
                          )}
                        </div>
                      ))}
                    </Space>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <Text strong style={{ display: 'block', marginBottom: 12 }}>
                    Số lượng:
                  </Text>
                  <Space align="center">
                    <InputNumber
                      min={1}
                      max={product.stock || 99}
                      value={quantity}
                      onChange={setQuantity}
                      size="large"
                      style={{ width: 120 }}
                    />
                    <Text type="secondary">
                      Còn lại: <strong>{product.stock || 0}</strong> sản phẩm
                    </Text>
                  </Space>
                </div>

                <Divider />

                {/* Action Buttons */}
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <Space style={{ width: '100%' }} size="middle">
                    <Button
                      type="primary"
                      size="large"
                      icon={<ShoppingCartOutlined />}
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className="product-action-btn"
                      style={{
                        flex: 1,
                        height: 56,
                        fontSize: 16,
                        fontWeight: 600,
                        background: 'linear-gradient(135deg, var(--red-son) 0%, var(--deep-red) 100%)',
                        border: 'none'
                      }}
                    >
                      Thêm vào giỏ
                    </Button>
                    <Button
                      size="large"
                      onClick={handleBuyNow}
                      disabled={!product.inStock}
                      className="product-action-btn"
                      style={{
                        flex: 1,
                        height: 56,
                        fontSize: 16,
                        fontWeight: 600,
                        background: 'var(--mahogany-brown)',
                        color: 'white',
                        border: 'none'
                      }}
                    >
                      Mua ngay
                    </Button>
                  </Space>

                  <Space style={{ width: '100%', justifyContent: 'center' }}>
                    <Button 
                      icon={<HeartOutlined />} 
                      size="large"
                      className="product-icon-btn"
                      style={{ width: 56, height: 56 }}
                    />
                    <Button 
                      icon={<ShareAltOutlined />} 
                      size="large"
                      className="product-icon-btn"
                      style={{ width: 56, height: 56 }}
                    />
                  </Space>
                </Space>

                {/* Additional Info */}
                <Card size="small" style={{ background: '#f5f5f5', border: 'none' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <TruckOutlined style={{ fontSize: 20, color: 'var(--jade-green)' }} />
                      <Text>Miễn phí vận chuyển đơn từ 500k</Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <SafetyOutlined style={{ fontSize: 20, color: 'var(--gold-copper)' }} />
                      <Text>Đổi trả trong 7 ngày nếu có lỗi</Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <CheckCircleOutlined style={{ fontSize: 20, color: 'var(--red-son)' }} />
                      <Text>Bảo hành 12 tháng</Text>
                    </div>
                  </Space>
                </Card>
              </Space>
            </Card>
          </Col>
        </Row>

        {/* Product Details Tabs */}
        <Row gutter={[32, 32]} style={{ marginTop: 48 }}>
          <Col xs={24} lg={16}>
            <Card className="product-tabs">
              <Tabs
                defaultActiveKey="description"
                size="large"
                items={[
                  {
                    key: 'description',
                    label: 'Mô tả sản phẩm',
                    children: (
                      <div className="product-description">
                        <Paragraph style={{ fontSize: 16, lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                          {product.description || 'Chưa có mô tả chi tiết cho sản phẩm này.'}
                        </Paragraph>
                      </div>
                    )
                  },
                  {
                    key: 'reviews',
                    label: `Đánh giá (${totalReviews})`,
                    children: (
                      <div>
                        {/* Review Form */}
                        {showReviewForm ? (
                          <Card className="review-form" style={{ marginBottom: 24 }}>
                            <Space direction="vertical" style={{ width: '100%' }} size="middle">
                              <div>
                                <Text strong>Đánh giá của bạn:</Text>
                                <Rate
                                  value={reviewForm.rating}
                                  onChange={(value) => setReviewForm(prev => ({ ...prev, rating: value }))}
                                  style={{ marginLeft: 12 }}
                                />
                              </div>
                              <Input
                                placeholder="Tiêu đề (tùy chọn)"
                                value={reviewForm.title}
                                onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
                              />
                              <TextArea
                                placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                                value={reviewForm.comment}
                                onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                                rows={4}
                              />
                              <Space>
                                <Button type="primary" onClick={handleSubmitReview}>
                                  Gửi đánh giá
                                </Button>
                                <Button onClick={() => setShowReviewForm(false)}>
                                  Hủy
                                </Button>
                              </Space>
                            </Space>
                          </Card>
                        ) : (
                          <Button 
                            type="primary" 
                            onClick={() => setShowReviewForm(true)}
                            style={{ marginBottom: 24 }}
                          >
                            Viết đánh giá
                          </Button>
                        )}

                        {/* Reviews List */}
                        {reviewsLoading ? (
                          <div style={{ textAlign: 'center', padding: 40 }}>
                            <Spin />
                          </div>
                        ) : reviews.length === 0 ? (
                          <Empty
                            description="Chưa có đánh giá nào"
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                          />
                        ) : (
                          <>
                            <Space direction="vertical" style={{ width: '100%' }} size="large">
                              {reviews.map((review, index) => (
                                <Card key={review._id} size="small" className="review-card">
                                  <Space direction="vertical" style={{ width: '100%' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                      <Avatar size={48} style={{ background: 'var(--gold-copper)' }}>
                                        {review.userId?.name?.charAt(0) || 'U'}
                                      </Avatar>
                                      <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                                          <Text strong>{review.userId?.name || 'Người dùng'}</Text>
                                          <Rate disabled value={review.rating} style={{ fontSize: 14 }} />
                                        </div>
                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                          <ClockCircleOutlined /> {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                                        </Text>
                                      </div>
                                    </div>
                                    {review.title && (
                                      <Text strong style={{ fontSize: 16 }}>
                                        {review.title}
                                      </Text>
                                    )}
                                    <Paragraph style={{ marginBottom: 0 }}>
                                      {review.comment}
                                    </Paragraph>
                                    {review.isVerified && (
                                      <Tag color="green" size="small">
                                        <CheckCircleOutlined /> Đã xác thực mua hàng
                                      </Tag>
                                    )}
                                  </Space>
                                </Card>
                              ))}
                            </Space>

                            {totalReviews > 5 && (
                              <div style={{ textAlign: 'center', marginTop: 32 }}>
                                <Pagination
                                  current={currentPage}
                                  total={totalReviews}
                                  pageSize={5}
                                  onChange={handleReviewPageChange}
                                />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )
                  }
                ]}
              />
            </Card>
          </Col>

          {/* Related Products */}
          <Col xs={24} lg={8}>
            <Card title="Sản phẩm liên quan" className="related-products">
              {relatedProducts.length === 0 ? (
                <Empty description="Không có sản phẩm liên quan" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              ) : (
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  {relatedProducts.slice(0, 5).map((relatedProduct) => (
                    <Card 
                      key={relatedProduct._id} 
                      size="small" 
                      hoverable
                      className="related-product-card"
                      onClick={() => {
                        navigate(`/products/${relatedProduct._id}`);
                        window.scrollTo(0, 0);
                      }}
                    >
                      <div style={{ display: 'flex', gap: 12 }}>
                        <div className="related-product-image">
                          <img
                            src={relatedProduct.images?.[0]?.url || '/images/placeholder.txt'}
                            alt={relatedProduct.name}
                            style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <Title level={5} style={{ marginBottom: 4, fontSize: 14 }}>
                            {relatedProduct.name}
                          </Title>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <Rate disabled value={relatedProduct.rating?.average || 0} style={{ fontSize: 12 }} />
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              ({relatedProduct.rating?.count || 0})
                            </Text>
                          </div>
                          <Text strong style={{ color: 'var(--red-son)', fontSize: 16 }}>
                            {relatedProduct.price?.toLocaleString('vi-VN')}₫
                          </Text>
                        </div>
                      </div>
                    </Card>
                  ))}
                </Space>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductDetailPage;

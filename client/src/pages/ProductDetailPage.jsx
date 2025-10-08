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
  Pagination
} from 'antd';
import { 
  ShoppingCartOutlined,
  StarFilled,
  HeartOutlined,
  ShareAltOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addItem } from '../redux/cartSlice';
import axios from 'axios';

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
  const [reviewsLoading, setReviewsLoading] = useState(false);
  
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
  }, [id, currentPage]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/products/${id}`);
      const data = response.data.data;
      
      setProduct(data.product);
      setRelatedProducts(data.relatedProducts || []);
    } catch (error) {
      console.error('Error loading product:', error);
      message.error('Lỗi khi tải thông tin sản phẩm');
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
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addItem({
      product: product,
      quantity: 1
    }));
    message.success(`Đã thêm ${product.name} vào giỏ hàng!`);
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
      
      // Reload reviews
      loadReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      message.error('Lỗi khi gửi đánh giá');
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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <Spin size="large" />
            <div className="mt-4">
              <Text>Đang tải thông tin sản phẩm...</Text>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <Empty
            description="Không tìm thấy sản phẩm"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button onClick={() => navigate('/products')}>
              Quay lại danh sách sản phẩm
            </Button>
          </Empty>
        </div>
      </div>
    );
  }

  const currentImage = product.images?.[currentImageIndex] || product.images?.[0];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button 
            type="link" 
            onClick={() => navigate('/products')}
            className="p-0"
          >
            ← Quay lại danh sách sản phẩm
          </Button>
        </div>

        <Row gutter={[32, 32]}>
          {/* Product Images */}
          <Col xs={24} lg={12}>
            <Card className="sticky top-4">
              <div className="relative">
                <Image
                  src={currentImage?.url || '/images/placeholder.png'}
                  alt={currentImage?.alt || product.name}
                  className="w-full rounded-lg"
                  style={{ height: '500px', objectFit: 'cover' }}
                />
                
                {product.images && product.images.length > 1 && (
                  <>
                    <Button
                      icon={<LeftOutlined />}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => handleImageChange('prev')}
                    />
                    <Button
                      icon={<RightOutlined />}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => handleImageChange('next')}
                    />
                  </>
                )}
              </div>
              
              {/* Thumbnail images */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <Image
                      key={index}
                      src={image.url}
                      alt={image.alt}
                      className={`cursor-pointer rounded ${
                        index === currentImageIndex ? 'ring-2 ring-red-500' : ''
                      }`}
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </Card>
          </Col>

          {/* Product Info */}
          <Col xs={24} lg={12}>
            <Card>
              <Space direction="vertical" size="large" className="w-full">
                {/* Product Title */}
                <div>
                  <Title level={2} className="mb-2">
                    {product.name}
                  </Title>
                  <div className="flex items-center gap-4 mb-4">
                    <Rate 
                      disabled 
                      value={product.rating?.average || 0} 
                      allowHalf 
                    />
                    <Text type="secondary">
                      ({product.rating?.count || 0} đánh giá)
                    </Text>
                  </div>
                </div>

                {/* Price */}
                <div>
                  <div className="flex items-center gap-4">
                    <Title level={3} className="text-red-600 mb-0">
                      {product.price?.toLocaleString('vi-VN')} VNĐ
                    </Title>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <Text delete type="secondary">
                        {product.originalPrice.toLocaleString('vi-VN')} VNĐ
                      </Text>
                    )}
                  </div>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <Tag color="red" className="mt-2">
                      Giảm {Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </Tag>
                  )}
                </div>

                {/* Short Description */}
                {product.shortDescription && (
                  <div>
                    <Text strong>Mô tả ngắn:</Text>
                    <Paragraph className="mt-2">
                      {product.shortDescription}
                    </Paragraph>
                  </div>
                )}

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div>
                    <Text strong>Tags:</Text>
                    <div className="mt-2">
                      {product.tags.map(tag => (
                        <Tag key={tag} className="mb-1">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stock Status */}
                <div>
                  <Text strong>Trạng thái:</Text>
                  <div className="mt-2">
                    {product.inStock ? (
                      <Tag color="green">Còn hàng ({product.stock} sản phẩm)</Tag>
                    ) : (
                      <Tag color="red">Hết hàng</Tag>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <Button
                    type="primary"
                    size="large"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className="flex-1"
                  >
                    Thêm vào giỏ hàng
                  </Button>
                  <Button
                    size="large"
                    icon={<HeartOutlined />}
                  >
                    Yêu thích
                  </Button>
                  <Button
                    size="large"
                    icon={<ShareAltOutlined />}
                  >
                    Chia sẻ
                  </Button>
                </div>
              </Space>
            </Card>
          </Col>
        </Row>

        {/* Product Details */}
        <Row gutter={[32, 32]} className="mt-8">
          <Col xs={24} lg={16}>
            {/* Description */}
            <Card title="Mô tả sản phẩm" className="mb-6">
              <Paragraph>
                {product.description}
              </Paragraph>
            </Card>

            {/* Reviews */}
            <Card 
              title={
                <Space>
                  <StarFilled />
                  Đánh giá sản phẩm ({totalReviews})
                </Space>
              }
              extra={
                <Button 
                  type="primary" 
                  onClick={() => setShowReviewForm(true)}
                >
                  Viết đánh giá
                </Button>
              }
            >
              {/* Review Form */}
              {showReviewForm && (
                <Card className="mb-6" title="Viết đánh giá của bạn">
                  <Space direction="vertical" className="w-full" size="middle">
                    <div>
                      <Text strong>Đánh giá:</Text>
                      <Rate
                        value={reviewForm.rating}
                        onChange={(value) => setReviewForm(prev => ({ ...prev, rating: value }))}
                        className="ml-2"
                      />
                    </div>
                    <div>
                      <Text strong>Tiêu đề:</Text>
                      <Input
                        placeholder="Tiêu đề đánh giá (tùy chọn)"
                        value={reviewForm.title}
                        onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Text strong>Nội dung đánh giá:</Text>
                      <TextArea
                        placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                        rows={4}
                        className="mt-1"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="primary" onClick={handleSubmitReview}>
                        Gửi đánh giá
                      </Button>
                      <Button onClick={() => setShowReviewForm(false)}>
                        Hủy
                      </Button>
                    </div>
                  </Space>
                </Card>
              )}

              {/* Reviews List */}
              {reviewsLoading ? (
                <div className="text-center py-8">
                  <Spin />
                </div>
              ) : reviews.length === 0 ? (
                <Empty
                  description="Chưa có đánh giá nào"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              ) : (
                <>
                  <Space direction="vertical" className="w-full" size="large">
                    {reviews.map(review => (
                      <Card key={review._id} size="small">
                        <Space direction="vertical" className="w-full" size="small">
                          <div className="flex items-center gap-4">
                            <Avatar src={review.userId?.avatar}>
                              {review.userId?.name?.charAt(0)}
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <Text strong>{review.userId?.name}</Text>
                                <Rate disabled value={review.rating} size="small" />
                                <Text type="secondary">
                                  {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                                </Text>
                              </div>
                              {review.title && (
                                <Text strong className="block mt-1">
                                  {review.title}
                                </Text>
                              )}
                            </div>
                          </div>
                          <Paragraph className="mb-0">
                            {review.comment}
                          </Paragraph>
                          {review.isVerified && (
                            <Tag color="green" size="small">
                              Đã xác thực mua hàng
                            </Tag>
                          )}
                        </Space>
                      </Card>
                    ))}
                  </Space>

                  {/* Reviews Pagination */}
                  {totalReviews > 5 && (
                    <div className="text-center mt-6">
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
            </Card>
          </Col>

          {/* Related Products */}
          <Col xs={24} lg={8}>
            <Card title="Sản phẩm liên quan">
              <Space direction="vertical" className="w-full" size="middle">
                {relatedProducts.map(product => (
                  <Card key={product._id} size="small" hoverable>
                    <div className="flex gap-3">
                      <Image
                        src={product.images?.[0]?.url || '/images/placeholder.png'}
                        alt={product.name}
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        className="rounded"
                      />
                      <div className="flex-1">
                        <Title level={5} className="mb-1">
                          {product.name}
                        </Title>
                        <div className="flex items-center gap-2 mb-2">
                          <Rate disabled value={product.rating?.average || 0} size="small" />
                          <Text type="secondary" className="text-xs">
                            ({product.rating?.count || 0})
                          </Text>
                        </div>
                        <Text strong className="text-red-600">
                          {product.price?.toLocaleString('vi-VN')} VNĐ
                        </Text>
                      </div>
                    </div>
                  </Card>
                ))}
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductDetailPage;

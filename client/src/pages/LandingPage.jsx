import React, { useState, useEffect } from 'react';
import { Layout, Typography, Button, Space, Rate, Avatar, Card } from 'antd';
import { 
  ArrowRightOutlined, 
  StarFilled, 
  HeartOutlined, 
  ShoppingOutlined,
  DownOutlined,
  CheckCircleFilled,
  LeftOutlined,
  RightOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import VietnamHistoryTimeline from '../components/VietnamHistoryTimeline';
import FooterVietnamese from '../components/FooterVietnamese';
import './LandingPage.css';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

// Product Data
const products = [
  {
    id: 1,
    name: 'Áo Hùng Vương - Khởi Nguồn Dân Tộc',
    era: 'ancient',
    eraName: 'Cổ đại',
    eraColor: '#CD7F32',
    description: 'Thiết kế lấy cảm hứng từ thời Văn Lang với họa tiết trống đồng Đông Sơn',
    price: 399000,
    oldPrice: null,
    image: '/images/placeholder.txt',
    badge: 'NEW',
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: 'Áo Hai Bà Trưng - Nữ Tướng Anh Hùng',
    era: 'ancient',
    eraName: 'Cổ đại',
    eraColor: '#8B0000',
    description: 'Tôn vinh tinh thần bất khuất của hai nữ tướng dân tộc',
    price: 399000,
    oldPrice: null,
    image: '/images/placeholder.txt',
    badge: 'HOT',
    rating: 4.9,
    reviews: 256
  },
  {
    id: 3,
    name: 'Áo Trần Hưng Đạo - Hổ Tướng',
    era: 'medieval',
    eraName: 'Trung đại',
    eraColor: '#DA251D',
    description: 'Thiết kế mạnh mẽ với hình ảnh Hổ tướng và câu "Thà chết còn hơn sống nhục"',
    price: 449000,
    oldPrice: null,
    image: '/images/placeholder.txt',
    badge: 'BEST SELLER',
    rating: 5.0,
    reviews: 512
  },
  {
    id: 4,
    name: 'Áo Lê Lợi - Bình Ngô Đại Cáo',
    era: 'medieval',
    eraName: 'Trung đại',
    eraColor: '#FFD700',
    description: 'Lấy cảm hứng từ Bình Ngô Đại Cáo - Tuyên ngôn độc lập bất hủ',
    price: 399000,
    oldPrice: 499000,
    image: '/images/placeholder.txt',
    badge: 'SALE -20%',
    rating: 4.7,
    reviews: 189
  },
  {
    id: 5,
    name: 'Áo Hồ Chí Minh - Bác Hồ Kính Yêu',
    era: 'modern',
    eraName: 'Cận đại',
    eraColor: '#DA251D',
    description: 'Chân dung Bác Hồ với câu "Không có gì quý hơn độc lập tự do"',
    price: 499000,
    oldPrice: null,
    image: '/images/placeholder.txt',
    badge: 'PREMIUM',
    rating: 5.0,
    reviews: 678
  },
  {
    id: 6,
    name: 'Áo Điện Biên Phủ - Lừng Lẫy Năm Châu',
    era: 'modern',
    eraName: 'Cận đại',
    eraColor: '#DA251D',
    description: 'Kỷ niệm chiến thắng lịch sử Điện Biên Phủ 1954',
    price: 449000,
    oldPrice: null,
    image: '/images/placeholder.txt',
    badge: 'LIMITED',
    rating: 4.9,
    reviews: 234
  },
  {
    id: 7,
    name: 'Áo Thống Nhất - 30/4/1975',
    era: 'modern',
    eraName: 'Cận đại',
    eraColor: '#DA251D',
    description: 'Kỷ niệm ngày giải phóng miền Nam, thống nhất đất nước',
    price: 449000,
    oldPrice: null,
    image: '/images/placeholder.txt',
    badge: null,
    rating: 4.8,
    reviews: 345
  },
  {
    id: 8,
    name: 'Áo Vietnam Rising - Việt Nam Vươn Lên',
    era: 'contemporary',
    eraName: 'Hiện đại',
    eraColor: '#00A86B',
    description: 'Thiết kế hiện đại thể hiện Việt Nam đang phát triển mạnh mẽ',
    price: 399000,
    oldPrice: null,
    image: '/images/placeholder.txt',
    badge: 'NEW',
    rating: 4.6,
    reviews: 89
  }
];

// Enhanced Hero Data with Timeline
const heroes = [
  {
    id: 1,
    name: "Trần Hưng Đạo",
    title: "Hổ Tướng Dân Tộc",
    era: "medieval",
    eraName: "Thời Trần (1225-1400)",
    eraColor: "#DA251D",
    timeline: [
      { year: "1228", event: "Sinh ra tại Thăng Long" },
      { year: "1258", event: "Chiến thắng Mông Cổ lần 1" },
      { year: "1285", event: "Chiến thắng Mông Cổ lần 2" },
      { year: "1288", event: "Đại thắng Bạch Đằng" },
      { year: "1300", event: "Qua đời, để lại di sản bất hủ" },
    ],
    quote: "Thà chết còn hơn sống nhục",
    story:
      'Thế kỷ 13, khi đế quốc Mông Cổ đang thống trị châu Á với sức mạnh quân sự vô song, Đại Việt đứng trước nguy cơ diệt vong. Trần Quốc Tuấn, với tài năng quân sự xuất chúng và lòng yêu nước nồng nàn, đã ba lần dẫn dắt quân dân đánh bại đội quân hùng mạnh nhất thế giới. Chiến thắng Bạch Đằng 1288 với chiến thuật cọc ngầm thiên tài không chỉ bảo vệ độc lập dân tộc mà còn làm rung chuyển lịch sử thế giới. Hịch tướng sĩ "Thà chết còn hơn sống nhục" của ông vẫn vang vọng qua 700 năm, nhắc nhở mỗi thế hệ người Việt về tinh thần bất khuất.',
    image: "/images/tranhungdao.jpg",
    productLink: "/products/3",
    achievements: [
      "3 lần đánh thắng đế quốc Mông Cổ (1258, 1285, 1288)",
      "Chiến thuật cọc ngầm sông Bạch Đằng nổi tiếng thế giới",
      "Hịch tướng sĩ trở thành biểu tượng tinh thần dân tộc",
      "Được phong Hưng Đạo Đại Vương, thờ làm Thành hoàng",
    ],
    context: "Thời kỳ Mông Cổ thống trị châu Á, đánh chiếm hầu hết các quốc gia từ Trung Quốc đến Trung Đông",
  },
  {
    id: 2,
    name: "Vua Hùng Vương",
    title: "Tổ Tiên Dân Tộc",
    era: "ancient",
    eraName: "Thời Hồng Bàng (2879-258 TCN)",
    eraColor: "#CD7F32",
    timeline: [
      { year: "2879 TCN", event: "Dựng nước Văn Lang" },
      { year: "2000 TCN", event: "Phát triển văn minh lúa nước" },
      { year: "1000 TCN", event: "Văn hóa Đông Sơn hình thành" },
      { year: "500 TCN", event: "Trống đồng Đông Sơn ra đời" },
      { year: "258 TCN", event: "Kết thúc thời Hùng Vương" },
    ],
    quote: "Dù ai đi ngược về xuôi, nhớ ngày giỗ Tổ mồng 10 tháng 3",
    story:
      'Từ vùng đất Văn Lang cổ xưa, 18 đời Vua Hùng đã xây dựng nền móng đầu tiên của dân tộc Việt Nam. Họ không chỉ là những vị vua, mà còn là những người khai phá, dạy dân trồng lúa nước, tạo nên nền văn minh nông nghiệp phát triển. Văn hóa Đông Sơn với biểu tượng trống đồng nổi tiếng thế giới là minh chứng cho trí tuệ và tài năng nghệ thuật của tổ tiên. Lễ hội Giỗ Tổ Hùng Vương mỗi năm không chỉ là ngày tưởng nhớ, mà còn là lời nhắc nhở về nguồn cội, về truyền thống "uống nước nhớ nguồn" của dân tộc Việt Nam.',
    image: "/images/vuahung.webp",
    productLink: "/products/1",
    achievements: [
      "Xây dựng nước Văn Lang - quốc gia đầu tiên của người Việt",
      "Phát triển văn minh lúa nước, nền tảng nông nghiệp Việt Nam",
      "Tạo nên văn hóa Đông Sơn với trống đồng nổi tiếng thế giới",
      'Truyền thống "uống nước nhớ nguồn" qua 4000 năm',
    ],
    context: "Thời kỳ đồ đồng, các nền văn minh nông nghiệp đang hình thành khắp châu Á",
  },
  {
    id: 3,
    name: "Hai Bà Trưng",
    title: "Nữ Tướng Anh Hùng",
    era: "ancient",
    eraName: "Thời Bắc thuộc (40-43)",
    eraColor: "#8B0000",
    timeline: [
      { year: "12", event: "Trưng Trắc sinh ra" },
      { year: "14", event: "Trưng Nhị sinh ra" },
      { year: "40", event: "Khởi nghĩa chống Hán" },
      { year: "40-43", event: "Lập nước Việt độc lập" },
      { year: "43", event: "Hy sinh vì nước" },
    ],
    quote: "Một là trả thù nước, hai là trả ơn dân",
    story:
      "Năm 40 sau Công nguyên, dưới ách đô hộ tàn bạo của nhà Hán, hai chị em Trưng Trắc và Trưng Nhị đã đứng lên khởi nghĩa. Với lòng yêu nước và tài năng lãnh đạo xuất chúng, hai bà đã tập hợp được 80.000 nghĩa quân, giải phóng 65 thành trì, lập nên nước Việt độc lập trong 3 năm. Dù cuối cùng thất bại trước quân Hán hùng mạnh, tinh thần bất khuất của Hai Bà Trưng đã trở thành biểu tượng của nữ quyền và tinh thần yêu nước Việt Nam. Câu chuyện của hai bà nhắc nhở rằng phụ nữ Việt Nam không chỉ hiền thục mà còn dũng cảm, sẵn sàng hy sinh vì độc lập dân tộc.",
    image: "/images/haibatrung.jpg",
    productLink: "/products/2",
    achievements: [
      "Khởi nghĩa chống ách đô hộ Hán, tập hợp 80.000 nghĩa quân",
      "Giải phóng 65 thành trì, lập nước Việt độc lập (40-43)",
      "Biểu tượng nữ quyền và tinh thần bất khuất của phụ nữ Việt",
      "Được thờ làm Thánh Mẫu, tôn vinh qua hàng nghìn năm",
    ],
    context: "Thời kỳ Bắc thuộc lần thứ nhất, nhà Hán cai trị tàn bạo, bóc lột người Việt",
  },
  {
    id: 4,
    name: "Hồ Chí Minh",
    title: "Chủ Tịch Hồ Chí Minh",
    era: "modern",
    eraName: "Thời Cận đại (1890-1969)",
    eraColor: "#DA251D",
    timeline: [
      { year: "1890", event: "Sinh ra tại Nghệ An" },
      { year: "1911", event: "Ra đi tìm đường cứu nước" },
      { year: "1930", event: "Thành lập Đảng Cộng sản Việt Nam" },
      { year: "1945", event: "Tuyên ngôn Độc lập 2/9" },
      { year: "1954", event: "Chiến thắng Điện Biên Phủ" },
      { year: "1969", event: "Qua đời, để lại di chúc bất hủ" },
    ],
    quote: "Không có gì quý hơn độc lập tự do",
    story:
      "Sinh ra trong thời kỳ đất nước mất độc lập, Nguyễn Ái Quốc đã dành cả cuộc đời cho sự nghiệp giải phóng dân tộc. Từ chuyến đi tìm đường cứu nước năm 1911, Người đã trải qua 30 năm hoạt động cách mạng trên khắp thế giới. Năm 1945, với Tuyên ngôn Độc lập lịch sử, Chủ tịch Hồ Chí Minh đã tuyên bố nước Việt Nam Dân chủ Cộng hòa ra đời. Dưới sự lãnh đạo của Người, dân tộc Việt Nam đã giành thắng lợi trong hai cuộc kháng chiến chống Pháp và Mỹ, thống nhất đất nước. Tư tưởng và tấm gương đạo đức của Bác Hồ vẫn soi đường cho mỗi thế hệ người Việt Nam.",
    image: "/images/chutichhochiminh.jpg",
    productLink: "/products/5",
    achievements: [
      "Thành lập Đảng Cộng sản Việt Nam (1930)",
      "Tuyên ngôn Độc lập 2/9/1945, lập nước Việt Nam Dân chủ Cộng hòa",
      "Lãnh đạo kháng chiến chống Pháp, Mỹ thành công",
      "Anh hùng giải phóng dân tộc, danh nhân văn hóa thế giới",
    ],
    context: "Thời kỳ thực dân Pháp và đế quốc Mỹ xâm lược, đất nước mất độc lập",
  },
];

// Testimonials Data
const testimonials = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    avatar: '/images/placeholder.txt',
    rating: 5,
    quote: 'Áo rất đẹp và chất lượng. Mình rất tự hào khi mặc những thiết kế về lịch sử Việt Nam. Chất vải mềm mại, form áo vừa vặn. Đặc biệt thích câu "Thà chết còn hơn sống nhục" sau lưng áo.',
    product: 'Áo Trần Hưng Đạo',
    verified: true
  },
  {
    id: 2,
    name: 'Trần Thị Bích',
    avatar: '/images/placeholder.txt',
    rating: 5,
    quote: 'Thiết kế rất ý nghĩa, giúp tôi nhớ về truyền thống và lịch sử hào hùng của dân tộc. Mỗi lần mặc là mỗi lần tự hào về tổ tiên. Shop ship hàng nhanh, đóng gói cẩn thận.',
    product: 'Áo Hùng Vương',
    verified: true
  },
  {
    id: 3,
    name: 'Lê Minh Tuấn',
    avatar: '/images/placeholder.txt',
    rating: 5,
    quote: 'Tặng bạn gái áo Hai Bà Trưng, cả hai đều rất thích. Thiết kế đẹp, in sắc nét. Giá cả hợp lý. Sẽ ủng hộ shop lâu dài để lan tỏa tinh thần yêu nước.',
    product: 'Áo Hai Bà Trưng',
    verified: true
  }
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeHero, setActiveHero] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedEra, setSelectedEra] = useState('all');

  const filteredProducts = selectedEra === 'all' 
    ? products 
    : products.filter(p => p.era === selectedEra);

  const handleHeroChange = (index) => {
    if (index === activeHero) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveHero(index);
      setIsTransitioning(false);
    }, 300);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ivory-white)' }}>
      <Content>
        {/* ===== HERO SECTION ===== */}
        <div className="hero-section">
          <div className="hero-pattern-overlay" />
          
          <div className="hero-content">
            <h1 className="hero-title">
              Tự Hào Việt Nam
            </h1>
            
            <h2 className="hero-subtitle">
              Hành trình 4000 năm lịch sử
            </h2>
            
            <p className="hero-description">
              Khám phá những trang sử hào hùng của dân tộc Việt Nam qua các sản phẩm thời trang 
              mang đậm bản sắc văn hóa. Mỗi chiếc áo là một câu chuyện lịch sử - Mặc lịch sử, Sống văn hóa.
            </p>
            
            <div className="hero-buttons">
              <Button
                size="large"
                style={{
                  background: 'linear-gradient(135deg, #FFCD00, #C89B3C)',
                  border: 'none',
                  borderRadius: '8px',
                  height: '56px',
                  padding: '0 32px',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: 'var(--charcoal)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                }}
                icon={<ArrowRightOutlined />}
                onClick={() => scrollToSection('timeline-section')}
              >
                Khám phá lịch sử
              </Button>
              
              <Button
                size="large"
                style={{
                  background: 'rgba(250, 244, 225, 0.1)',
                  border: '2px solid var(--light-gold)',
                  color: 'var(--ivory-white)',
                  borderRadius: '8px',
                  height: '56px',
                  padding: '0 32px',
                  fontSize: '18px',
                  fontWeight: '600',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                }}
                icon={<ShoppingOutlined />}
                onClick={() => scrollToSection('products-section')}
              >
                Xem sản phẩm
              </Button>
            </div>

            <div 
              className="scroll-indicator" 
              onClick={() => scrollToSection('stats-section')}
            >
              <DownOutlined style={{ fontSize: '24px', color: 'var(--light-gold)' }} />
            </div>
          </div>
        </div>

        {/* ===== STATS SECTION ===== */}
        <div id="stats-section" style={{ 
          padding: '80px 0', 
          background: 'linear-gradient(135deg, var(--mahogany-brown) 0%, var(--warm-brown) 100%)',
          color: 'var(--ivory-white)',
        }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <Title 
                level={2} 
                style={{ 
                  color: 'var(--ivory-white)',
                  fontSize: '2.5em',
                  fontWeight: '700',
                  marginBottom: '16px'
                }}
              >
                 Những con số tự hào
              </Title>
              <Paragraph 
                style={{ 
                  fontSize: '1.2em',
                  color: 'rgba(250, 244, 225, 0.9)',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}
              >
                Hành trình lịch sử qua những con số ấn tượng
              </Paragraph>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '32px',
              textAlign: 'center'
            }}>
              {[
                { number: '4000+', label: 'Năm lịch sử', icon: '📜', color: 'var(--gold-copper)', desc: 'Từ thời Văn Lang đến nay' },
                { number: '3', label: 'Lần đánh thắng Mông Cổ', icon: '⚔️', color: 'var(--red-son)', desc: '1258, 1285, 1288 - Chiến thắng vang dội' },
                { number: '1000+', label: 'Năm đấu tranh giành độc lập', icon: '🛡️', color: 'var(--jade-green)', desc: 'Từ Bắc thuộc đến độc lập' },
                { number: '100%', label: 'Tinh thần yêu nước', icon: '❤️', color: 'var(--light-gold)', desc: 'Không gì quý hơn độc lập tự do' }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="animate-fadeInUp"
                  style={{
                  background: 'rgba(250, 244, 225, 0.1)',
                  borderRadius: '12px',
                  padding: '32px 24px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(200, 155, 60, 0.2)',
                  transition: 'transform 0.3s ease',
                    animationDelay: `${index * 0.1}s`
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
                  <div style={{ fontSize: '3em', marginBottom: '16px' }}>
                    {stat.icon}
                  </div>
                  <div style={{ 
                    fontSize: '3em', 
                    fontWeight: '700',
                    color: stat.color,
                    marginBottom: '8px',
                    fontFamily: 'var(--font-heading)'
                  }}>
                    {stat.number}
                  </div>
                  <div style={{ 
                    fontSize: '1.1em',
                    color: 'rgba(250, 244, 225, 0.9)',
                    fontWeight: '500',
                    marginBottom: '8px'
                  }}>
                    {stat.label}
                  </div>
                  <div style={{ 
                    fontSize: '0.9em',
                    color: 'rgba(250, 244, 225, 0.7)',
                  }}>
                    {stat.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== TIMELINE SECTION ===== */}
        <div id="timeline-section" style={{ padding: '80px 0', background: 'var(--cream)' }}>
          <VietnamHistoryTimeline />
        </div>

      
        {/* ===== HERO STORIES SECTION ===== */}
        <div className="hero-stories-section">
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            {/* Section Header */}
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2
                style={{
                  color: 'var(--charcoal)',
                  fontSize: '2.5em',
                  fontWeight: '700',
                  marginBottom: '16px',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                Câu Chuyện Anh Hùng Dân Tộc
              </h2>
              <p
                style={{
                  fontSize: '1.2em',
                  color: 'var(--mahogany-brown)',
                  maxWidth: '600px',
                  margin: '0 auto',
                }}
              >
                Những tấm gương sáng trong lịch sử Việt Nam
              </p>
            </div>

            {/* Featured Hero Card with Timeline */}
            <div
              style={{
                background: 'white',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                marginBottom: '40px',
                opacity: isTransitioning ? 0.5 : 1,
                transform: isTransitioning ? 'scale(0.98)' : 'scale(1)',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 0 }}>
                {/* Left: Timeline & Image */}
                <div
                  style={{
                    background: `linear-gradient(135deg, ${heroes[activeHero].eraColor} 0%, ${heroes[activeHero].eraColor}DD 100%)`,
                    padding: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Background Pattern */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundImage:
                        'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23FFFFFF" fillOpacity="0.05"%3E%3Cpath d="M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                      opacity: 0.3,
                    }}
                  />

                  {/* Era Badge */}
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      padding: '8px 20px',
                      borderRadius: '20px',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '24px',
                      zIndex: 2,
                    }}
                  >
                    {heroes[activeHero].eraName}
                  </div>

                  {/* Hero Image */}
                  <div
                    style={{
                      width: '200px',
                      height: '200px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '6px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                      marginBottom: '32px',
                      zIndex: 2,
                    }}
                  >
                    <img
                      src={heroes[activeHero].image || '/placeholder.svg'}
                      alt={heroes[activeHero].name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                    <div
                      style={{
                        display: 'none',
                        width: '100%',
                        height: '100%',
                        background: `linear-gradient(135deg, ${heroes[activeHero].eraColor} 0%, ${heroes[activeHero].eraColor}CC 100%)`,
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '80px',
                        color: 'white',
                      }}
                    >
                      {heroes[activeHero].era === 'ancient' ? '👑' : heroes[activeHero].era === 'medieval' ? '⚔️' : '🌟'}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div style={{ width: '100%', zIndex: 2 }}>
                    <div
                      style={{
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: '600',
                        marginBottom: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <CalendarOutlined />
                      Dòng thời gian
                    </div>
                    {heroes[activeHero].timeline.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          gap: '12px',
                          marginBottom: '16px',
                          position: 'relative',
                        }}
                      >
                        {/* Timeline dot */}
                        <div
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: 'white',
                            marginTop: '4px',
                            flexShrink: 0,
                            boxShadow: '0 0 0 4px rgba(255, 255, 255, 0.3)',
                          }}
                        />
                        {/* Timeline line */}
                        {index < heroes[activeHero].timeline.length - 1 && (
                          <div
                            style={{
                              position: 'absolute',
                              left: '5px',
                              top: '16px',
                              width: '2px',
                              height: 'calc(100% + 16px)',
                              background: 'rgba(255, 255, 255, 0.3)',
                            }}
                          />
                        )}
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              color: 'white',
                              fontSize: '14px',
                              fontWeight: '700',
                              marginBottom: '2px',
                            }}
                          >
                            {item.year}
                          </div>
                          <div
                            style={{
                              color: 'rgba(255, 255, 255, 0.9)',
                              fontSize: '13px',
                              lineHeight: '1.4',
                            }}
                          >
                            {item.event}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Content */}
                <div style={{ padding: '40px' }}>
                  {/* Title Badge */}
                  <div
                    style={{
                      display: 'inline-block',
                      padding: '6px 16px',
                      borderRadius: '20px',
                      background: `${heroes[activeHero].eraColor}20`,
                      color: heroes[activeHero].eraColor,
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '16px',
                    }}
                  >
                    {heroes[activeHero].title}
                  </div>

                  {/* Hero Name */}
                  <h2
                    style={{
                      fontSize: '2.5em',
                      fontWeight: '700',
                      color: 'var(--charcoal)',
                      marginBottom: '16px',
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    {heroes[activeHero].name}
                  </h2>

                  {/* Quote */}
                  <blockquote
                    style={{
                      fontSize: '1.3em',
                      fontStyle: 'italic',
                      color: heroes[activeHero].eraColor,
                      borderLeft: `4px solid ${heroes[activeHero].eraColor}`,
                      paddingLeft: '20px',
                      marginBottom: '24px',
                      fontWeight: '500',
                    }}
                  >
                    "{heroes[activeHero].quote}"
                  </blockquote>

                  {/* Context */}
                  <div
                    style={{
                      background: `${heroes[activeHero].eraColor}10`,
                      padding: '16px',
                      borderRadius: '12px',
                      marginBottom: '24px',
                      borderLeft: `4px solid ${heroes[activeHero].eraColor}`,
                    }}
                  >
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: heroes[activeHero].eraColor,
                        marginBottom: '4px',
                      }}
                    >
                      BỐI CẢNH LỊCH SỬ
                    </div>
                    <div
                      style={{
                        fontSize: '14px',
                        color: 'var(--mahogany-brown)',
                        lineHeight: '1.6',
                      }}
                    >
                      {heroes[activeHero].context}
                    </div>
                  </div>

                  {/* Story */}
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.8',
                      color: 'var(--mahogany-brown)',
                      marginBottom: '24px',
                      textAlign: 'justify',
                    }}
                  >
                    {heroes[activeHero].story}
                  </p>

                  {/* Achievements */}
                  <div style={{ marginBottom: '32px' }}>
                    <div
                      style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: 'var(--charcoal)',
                        marginBottom: '16px',
                      }}
                    >
                      Thành tựu nổi bật:
                    </div>
                    <div style={{ display: 'grid', gap: '12px' }}>
                      {heroes[activeHero].achievements.map((achievement, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px',
                            padding: '12px',
                            background: 'var(--cream)',
                            borderRadius: '8px',
                            transition: 'transform 0.2s ease',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(4px)')}
                          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}
                        >
                          <CheckCircleFilled
                            style={{
                              color: 'var(--jade-green)',
                              fontSize: '18px',
                              marginTop: '2px',
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              color: 'var(--mahogany-brown)',
                              fontSize: '15px',
                              lineHeight: '1.6',
                            }}
                          >
                            {achievement}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <Space size="middle">
                    <Button
                      size="large"
                      style={{
                        background: heroes[activeHero].eraColor,
                        border: 'none',
                        color: 'white',
                        fontWeight: '600',
                        borderRadius: '8px',
                        height: '48px',
                        padding: '0 32px',
                        boxShadow: `0 4px 16px ${heroes[activeHero].eraColor}40`,
                      }}
                      icon={<ArrowRightOutlined />}
                      onClick={() => navigate(heroes[activeHero].productLink)}
                    >
                      Xem áo thiết kế
                    </Button>
                    <Button
                      size="large"
                      style={{
                        background: 'transparent',
                        border: `2px solid ${heroes[activeHero].eraColor}`,
                        color: heroes[activeHero].eraColor,
                        fontWeight: '600',
                        borderRadius: '8px',
                        height: '48px',
                        padding: '0 32px',
                      }}
                    >
                      Đọc thêm
                    </Button>
                  </Space>
                </div>
              </div>
            </div>

            {/* Hero Carousel */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
              }}
            >
              {heroes.map((hero, index) => (
                <div
                  key={hero.id}
                  onClick={() => handleHeroChange(index)}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    border: activeHero === index ? `3px solid ${hero.eraColor}` : '3px solid transparent',
                    transform: activeHero === index ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: activeHero === index ? `0 8px 24px ${hero.eraColor}40` : '0 4px 12px rgba(0, 0, 0, 0.1)',
                    background: 'white',
                  }}
                  onMouseEnter={(e) => {
                    if (activeHero !== index) {
                      e.currentTarget.style.transform = 'translateY(-4px)'
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeHero !== index) {
                      e.currentTarget.style.transform = 'scale(1)'
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '180px',
                      background: `linear-gradient(135deg, ${hero.eraColor} 0%, ${hero.eraColor}DD 100%)`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      padding: '20px',
                      textAlign: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Background Pattern */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage:
                          'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23FFFFFF" fillOpacity="0.1"%3E%3Cpath d="M20 20c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10zm0 0c0 5.523 4.477 10 10 10s10-4.477 10-10-4.477-10-10-10-10 4.477-10 10z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                        opacity: 0.3,
                      }}
                    />

                    {/* Hero Avatar */}
                    <div
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '3px solid rgba(255, 255, 255, 0.3)',
                        marginBottom: '12px',
                        zIndex: 2,
                      }}
                    >
                      <img
                        src={hero.image || '/placeholder.svg'}
                        alt={hero.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                      <div
                        style={{
                          display: 'none',
                          width: '100%',
                          height: '100%',
                          background: `linear-gradient(135deg, ${hero.eraColor} 0%, ${hero.eraColor}CC 100%)`,
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '32px',
                          color: 'white',
                        }}
                      >
                        {hero.era === 'ancient' ? '👑' : hero.era === 'medieval' ? '⚔️' : '🌟'}
                      </div>
                    </div>

                    <div
                      style={{
                        fontWeight: '700',
                        fontSize: '18px',
                        marginBottom: '4px',
                        zIndex: 2,
                      }}
                    >
                      {hero.name}
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        opacity: 0.9,
                        zIndex: 2,
                      }}
                    >
                      {hero.title}
                    </div>
                  </div>

                  {/* Timeline Preview */}
                  <div style={{ padding: '16px', background: 'white' }}>
                    <div
                      style={{
                        fontSize: '12px',
                        color: 'var(--mahogany-brown)',
                        fontWeight: '600',
                        marginBottom: '8px',
                      }}
                    >
                      {hero.timeline[0].year} - {hero.timeline[hero.timeline.length - 1].year}
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        color: 'var(--charcoal)',
                        lineHeight: '1.4',
                      }}
                    >
                      {hero.timeline.length} sự kiện lịch sử quan trọng
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


      
        <div style={{ 
          padding: '80px 0', 
          background: 'linear-gradient(135deg, var(--light-gold) 0%, var(--gold-copper) 100%)',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
            <Title 
              level={2} 
              style={{ 
                color: 'var(--mahogany-brown)',
                fontSize: '2.5em',
                fontWeight: '700',
                marginBottom: '24px'
              }}
            >
              Thể Hiện Tinh Thần Việt Nam
            </Title>
            
            <Paragraph 
              style={{ 
                fontSize: '1.2em',
                color: 'var(--mahogany-brown)',
                marginBottom: '40px',
                lineHeight: '1.6'
              }}
            >
              Hãy cùng chúng tôi tôn vinh lịch sử hào hùng của dân tộc thông qua những sản phẩm 
              thời trang mang đậm bản sắc Việt Nam. Mỗi chiếc áo không chỉ là thời trang, 
              mà còn là lời tự hào về nguồn gốc và truyền thống của chúng ta.
            </Paragraph>
            
            <Space size="large" wrap style={{ justifyContent: 'center' }}>
              <Button
                size="large"
                style={{
                  background: 'var(--red-son)',
                  border: 'none',
                  borderRadius: '8px',
                  height: '56px',
                  padding: '0 32px',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: 'var(--ivory-white)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                }}
                icon={<StarFilled />}
                onClick={() => navigate('/products')}
              >
                Khám phá sản phẩm
              </Button>
              
              <Button
                size="large"
                style={{
                  background: 'var(--ivory-white)',
                  border: '2px solid var(--mahogany-brown)',
                  color: 'var(--mahogany-brown)',
                  borderRadius: '8px',
                  height: '56px',
                  padding: '0 32px',
                  fontSize: '18px',
                  fontWeight: '600',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                }}
                icon={<ArrowRightOutlined />}
                onClick={() => navigate('/custom-design')}
              >
                Thiết kế riêng
              </Button>
            </Space>
          </div>
        </div>
      </Content>
      
      <FooterVietnamese />
    </div>
  );
};

export default LandingPage;

import React from 'react';
import { Layout, Typography, Button, Space, Divider } from 'antd';
import { ArrowRightOutlined, StarFilled, HeartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import VietnamHistoryTimeline from '../components/VietnamHistoryTimeline';
import FooterVietnamese from '../components/FooterVietnamese';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: 'var(--ivory-white)' }}>
      <Content>
        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, var(--red-son) 0%, var(--deep-red) 100%)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Traditional Pattern Overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"vietnamese-pattern\" x=\"0\" y=\"0\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\"><circle cx=\"10\" cy=\"10\" r=\"1\" fill=\"%23C89B3C\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23vietnamese-pattern)\"/></svg>')",
            opacity: 0.3,
          }} />
          
          <div style={{ 
            maxWidth: 1200, 
            margin: '0 auto', 
            padding: '0 24px',
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            color: 'var(--ivory-white)'
          }}>
            <Title 
              level={1} 
              style={{ 
                color: 'var(--ivory-white)', 
                fontSize: '4em',
                fontWeight: '700',
                marginBottom: '24px',
                lineHeight: '1.2',
                fontFamily: 'var(--font-heading)',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              Tự Hào Việt Nam
            </Title>
            
            <Title 
              level={2} 
              style={{ 
                color: 'var(--light-gold)', 
                fontSize: '2em',
                fontWeight: '400',
                marginBottom: '32px',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              Hành trình 4000 năm lịch sử
            </Title>
            
            <Paragraph 
              style={{ 
                color: 'rgba(250, 244, 225, 0.9)', 
                fontSize: '1.3em',
                marginBottom: '48px',
                lineHeight: '1.6',
                maxWidth: '800px',
                margin: '0 auto 48px auto',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              Khám phá những trang sử hào hùng của dân tộc Việt Nam, từ thời kỳ Văn Lang 
              đến hiện đại, qua các cuộc đấu tranh giành độc lập và xây dựng đất nước.
            </Paragraph>
            
            <Space size="large">
              <Button
                size="large"
                style={{
                  background: 'var(--gold-copper)',
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
                onClick={() => {
                  document.getElementById('timeline-section').scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
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
                icon={<HeartOutlined />}
              >
                Yêu nước
              </Button>
            </Space>
          </div>
        </div>

        {/* Stats Section */}
        <div style={{ 
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
                Hành trình lịch sử của dân tộc Việt Nam qua những con số ấn tượng
              </Paragraph>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '32px',
              textAlign: 'center'
            }}>
              {[
                { number: '4000+', label: 'Năm lịch sử', icon: '📜', color: 'var(--gold-copper)' },
                { number: '3', label: 'Lần đánh thắng quân Nguyên-Mông', icon: '⚔️', color: 'var(--red-son)' },
                { number: '1000+', label: 'Năm đấu tranh giành độc lập', icon: '🛡️', color: 'var(--jade-green)' },
                { number: '100%', label: 'Tinh thần yêu nước', icon: '❤️', color: 'var(--light-gold)' }
              ].map((stat, index) => (
                <div key={index} style={{
                  background: 'rgba(250, 244, 225, 0.1)',
                  borderRadius: '12px',
                  padding: '32px 24px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(200, 155, 60, 0.2)',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-8px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
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
                    fontWeight: '500'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div id="timeline-section" style={{ padding: '80px 0', background: 'var(--cream)' }}>
          <VietnamHistoryTimeline />
        </div>

        {/* Call to Action */}
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
              🌟 Thể hiện tinh thần Việt Nam
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
              thời trang mang đậm bản sắc Việt Nam.
            </Paragraph>
            
            <Space size="large">
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
                onClick={() => navigate('/home')}
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

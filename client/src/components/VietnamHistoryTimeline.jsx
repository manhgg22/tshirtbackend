import React from "react";
import { Timeline, Typography, Card, Row, Col } from "antd";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  CrownOutlined,
  SafetyOutlined,
  FlagOutlined,
  ThunderboltOutlined,
  RocketOutlined,
  HeartOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const data = [
  {
    title: "Thời kỳ Văn Lang – Âu Lạc",
    time: "2879 TCN – 179 TCN",
    description:
      "Nhà nước đầu tiên của người Việt cổ, do Hùng Vương lập nên. Xây dựng nền văn minh lúa nước, phát triển nghề đúc đồng và nghệ thuật.",
    icon: <CrownOutlined style={{ fontSize: "24px", color: "#C89B3C" }} />,
    color: "#C89B3C",
    background: "linear-gradient(135deg, #C89B3C 0%, #D4AF37 100%)",
    achievements: [
      "Thành lập nhà nước đầu tiên",
      "Phát triển nghề đúc đồng",
      "Xây dựng nền văn minh lúa nước",
      "Tạo dựng bản sắc văn hóa Việt"
    ]
  },
  {
    title: "Thời kỳ Bắc thuộc và đấu tranh giành độc lập",
    time: "179 TCN – 938",
    description:
      "Trải qua hơn 1000 năm đô hộ, nhân dân kiên cường khởi nghĩa giành lại độc lập. Các cuộc khởi nghĩa của Hai Bà Trưng, Bà Triệu, Ngô Quyền...",
    icon: <SafetyOutlined style={{ fontSize: "24px", color: "#E4002B" }} />,
    color: "#E4002B",
    background: "linear-gradient(135deg, #E4002B 0%, #8B0000 100%)",
    achievements: [
      "Khởi nghĩa Hai Bà Trưng (40-43)",
      "Khởi nghĩa Bà Triệu (248)",
      "Chiến thắng Bạch Đằng (938)",
      "Giành lại độc lập hoàn toàn"
    ]
  },
  {
    title: "Thời kỳ phong kiến độc lập",
    time: "939 – 1858",
    description:
      "Các triều đại Đinh, Lê, Lý, Trần, Lê, Nguyễn... phát triển đất nước, ba lần đánh thắng quân Nguyên – Mông, mở rộng lãnh thổ về phía Nam.",
    icon: <FlagOutlined style={{ fontSize: "24px", color: "#2E8B57" }} />,
    color: "#2E8B57",
    background: "linear-gradient(135deg, #2E8B57 0%, #228B22 100%)",
    achievements: [
      "Ba lần đánh thắng quân Nguyên-Mông",
      "Mở rộng lãnh thổ về phía Nam",
      "Phát triển văn hóa, giáo dục",
      "Xây dựng hệ thống pháp luật"
    ]
  },
  {
    title: "Thời kỳ Pháp thuộc",
    time: "1858 – 1945",
    description:
      "Thực dân Pháp xâm lược. Các phong trào yêu nước nổ ra mạnh mẽ, tiêu biểu là phong trào Cần Vương, Đông Du, Duy Tân và các cuộc khởi nghĩa.",
    icon: <ThunderboltOutlined style={{ fontSize: "24px", color: "#FF6B35" }} />,
    color: "#FF6B35",
    background: "linear-gradient(135deg, #FF6B35 0%, #FF4500 100%)",
    achievements: [
      "Phong trào Cần Vương",
      "Phong trào Đông Du",
      "Phong trào Duy Tân",
      "Khởi nghĩa Yên Thế"
    ]
  },
  {
    title: "Thời kỳ hiện đại",
    time: "1945 – nay",
    description:
      "Giành độc lập năm 1945, chiến thắng Điện Biên Phủ (1954), thống nhất đất nước (1975), tiến hành Đổi Mới (1986) và hội nhập quốc tế.",
    icon: <RocketOutlined style={{ fontSize: "24px", color: "#1890FF" }} />,
    color: "#1890FF",
    background: "linear-gradient(135deg, #1890FF 0%, #0066CC 100%)",
    achievements: [
      "Cách mạng Tháng Tám (1945)",
      "Chiến thắng Điện Biên Phủ (1954)",
      "Thống nhất đất nước (1975)",
      "Đổi Mới và hội nhập quốc tế"
    ]
  },
];

const FadeInWhenVisible = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ 
    threshold: 0.1,
    triggerOnce: true 
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { 
            duration: 0.8, 
            delay: delay,
            ease: "easeOut"
          } 
        },
        hidden: { opacity: 0, y: 60 },
      }}
    >
      {children}
    </motion.div>
  );
};

const VietnamHistoryTimeline = () => {
  return (
    <div
      style={{
        margin: "80px auto",
        maxWidth: 1200,
        padding: "40px 20px",
        background: "var(--ivory-white)",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
      }}
    >
      <FadeInWhenVisible>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <Title 
            level={1} 
            style={{ 
              color: "var(--red-son)",
              fontSize: "2.5em",
              fontWeight: "700",
              marginBottom: "16px",
              fontFamily: "var(--font-heading)"
            }}
          >
             Lịch sử Dựng nước & Giữ nước Việt Nam
          </Title>
          <Paragraph 
            style={{ 
              fontSize: "1.2em", 
              color: "var(--mahogany-brown)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6"
            }}
          >
            Hành trình hơn 4000 năm của dân tộc Việt Nam qua các thời kỳ lịch sử quan trọng
          </Paragraph>
        </div>
      </FadeInWhenVisible>

      <Timeline mode="left" style={{ marginTop: "40px" }}>
        {data.map((item, index) => (
          <Timeline.Item 
            key={index} 
            color={item.color}
            dot={
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: item.background,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                  border: "3px solid var(--ivory-white)",
                }}
              >
                {item.icon}
              </div>
            }
          >
            <FadeInWhenVisible delay={index * 0.2}>
              <Card
                style={{
                  marginLeft: "20px",
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  background: "var(--ivory-white)",
                  overflow: "hidden",
                }}
                bodyStyle={{ padding: "24px" }}
              >
                <Row gutter={[16, 16]} align="middle">
                  <Col xs={24} lg={16}>
                    <Title 
                      level={3} 
                      style={{ 
                        color: item.color,
                        marginBottom: "8px",
                        fontSize: "1.4em",
                        fontWeight: "600"
                      }}
                    >
                      {item.title}
                    </Title>
                    <Paragraph 
                      type="secondary" 
                      style={{ 
                        fontSize: "1em",
                        fontWeight: "500",
                        marginBottom: "12px",
                        color: "var(--mahogany-brown)"
                      }}
                    >
                      {item.time}
                    </Paragraph>
                    <Paragraph 
                      style={{ 
                        fontSize: "1em",
                        lineHeight: "1.6",
                        color: "var(--charcoal)",
                        marginBottom: "16px"
                      }}
                    >
                      {item.description}
                    </Paragraph>
                  </Col>
                  <Col xs={24} lg={8}>
                    <div
                      style={{
                        background: item.background,
                        borderRadius: "8px",
                        padding: "16px",
                        color: "white",
                        minHeight: "120px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Title 
                        level={5} 
                        style={{ 
                          color: "white", 
                          marginBottom: "12px",
                          fontSize: "1em"
                        }}
                      >
                         Thành tựu nổi bật
                      </Title>
                      <ul style={{ 
                        margin: 0, 
                        paddingLeft: "16px",
                        fontSize: "0.9em",
                        lineHeight: "1.5"
                      }}>
                        {item.achievements.map((achievement, idx) => (
                          <li key={idx} style={{ marginBottom: "4px" }}>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </Card>
            </FadeInWhenVisible>
          </Timeline.Item>
        ))}
      </Timeline>

      <FadeInWhenVisible delay={1}>
        <div style={{ 
          textAlign: "center", 
          marginTop: "60px",
          padding: "32px",
          background: "linear-gradient(135deg, var(--red-son) 0%, var(--deep-red) 100%)",
          borderRadius: "12px",
          color: "var(--ivory-white)"
        }}>
          <HeartOutlined style={{ fontSize: "48px", color: "var(--light-gold)", marginBottom: "16px" }} />
          <Title 
            level={3} 
            style={{ 
              color: "var(--ivory-white)",
              marginBottom: "16px",
              fontSize: "1.6em"
            }}
          >
            Tự hào dân tộc Việt Nam
          </Title>
          <Paragraph 
            style={{ 
              fontSize: "1.1em",
              color: "rgba(250, 244, 225, 0.9)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6"
            }}
          >
            Từ những ngày đầu dựng nước đến nay, dân tộc Việt Nam đã vượt qua bao thử thách, 
            xây dựng nên một đất nước độc lập, tự do và phát triển. Chúng ta tự hào về truyền thống 
            anh hùng và tiếp tục phát huy tinh thần đó trong thời đại mới.
          </Paragraph>
        </div>
      </FadeInWhenVisible>
    </div>
  );
};

export default VietnamHistoryTimeline;

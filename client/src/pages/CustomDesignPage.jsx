import React from "react";
import { useState, useRef, useCallback, useEffect } from "react";
import {
  Layout,
  Button,
  Input,
  Select,
  Card,
  Row,
  Col,
  Tabs,
  ColorPicker,
  Slider,
  Space,
  Tooltip,
  InputNumber,
} from "antd";
import {
  UploadOutlined,
  QrcodeOutlined,
  SaveOutlined,
  FullscreenOutlined,
  ShoppingCartOutlined,
  CloseOutlined,
  UndoOutlined,
  RedoOutlined,
  EyeOutlined,
  ShareAltOutlined,
  BgColorsOutlined,
  DesktopOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;
const { Option } = Select;
const { TabPane } = Tabs;

const CustomDesignPage = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(0);
  const [activeView, setActiveView] = useState("front");
  const [designElements, setDesignElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(20);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [isZoomed, setIsZoomed] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [selectedProduct, setSelectedProduct] = useState("Lớp");

  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const colors = [
    { name: "Trắng", value: "#ffffff" },
    { name: "Đen", value: "#000000" },
    { name: "Xám", value: "#c0c0c0" },
    { name: "Hồng", value: "#ffc0cb" },
    { name: "Vàng nhạt", value: "#ffffe0" },
    { name: "Xanh lá nhạt", value: "#90ee90" },
    { name: "Hồng đậm", value: "#ff69b4" },
    { name: "Vàng", value: "#ffff00" },
    { name: "Cam", value: "#ffa500" },
    { name: "Xanh lá", value: "#00ff00" },
    { name: "Cam đỏ", value: "#ff4500" },
    { name: "Đỏ", value: "#ff0000" },
    { name: "Xanh nhạt", value: "#87ceeb" },
    { name: "Xanh dương", value: "#0000ff" },
    { name: "Xanh đậm", value: "#000080" },
  ];

  const sizes = ["S", "M", "L"];

  const tools = [
    {
      id: "product",
      icon: <span role="img" aria-label="tshirt">👕</span>,
      name: "Chọn sản phẩm",
    },
    {
      id: "text",
      icon: <span role="img" aria-label="text">📝</span>,
      name: "Thêm Text",
    },
    {
      id: "art",
      icon: <span role="img" aria-label="art">🎨</span>,
      name: "Thêm Art",
    },
    { id: "upload", icon: <UploadOutlined />, name: "Tải lên hình ảnh" },
    {
      id: "numbers",
      icon: <span role="img" aria-label="numbers">🔢</span>,
      name: "Tên & Số",
    },
    {
      id: "user",
      icon: <span role="img" aria-label="user">👤</span>,
      name: "Thiết kế của tôi",
    },
    { id: "qr", icon: <QrcodeOutlined />, name: "Thêm QRcode" },
  ];

  // Design Template Library - 6 Categories
  const designTemplates = {
    culture: [
      { id: 'dragon1', name: 'Rồng Việt Line Art', emoji: '🐉', category: 'Văn Hóa VN', description: 'Rồng minimalist flowing curves' },
      { id: 'lotus1', name: 'Hoa Sen Thư Pháp', emoji: '🪷', category: 'Văn Hóa VN', description: 'Lotus watercolor + calligraphy' },
      { id: 'nonla1', name: 'Nón Lá Geometric', emoji: '🎩', category: 'Văn Hóa VN', description: 'Conical hat abstract design' },
      { id: 'buffalo1', name: 'Trâu Việt Nam', emoji: '🐃', category: 'Văn Hóa VN', description: 'Water buffalo traditional art' },
      { id: 'ao-dai1', name: 'Áo Dài Pattern', emoji: '👗', category: 'Văn Hóa VN', description: 'Traditional dress pattern' },
      { id: 'flag1', name: 'Cờ Đỏ Sao Vàng', emoji: '🇻🇳', category: 'Văn Hóa VN', description: 'Vietnamese flag modern style' },
    ],
    typography: [
      { id: 'saigon1', name: 'SÀI GÒN Vintage', emoji: '🏙️', category: 'Typography', description: 'Bold vintage font with motorbike' },
      { id: 'hanoi1', name: 'HÀ NỘI Retro', emoji: '🏛️', category: 'Typography', description: 'Classic Hanoi typography' },
      { id: 'slogan1', name: 'VƯỢT QUA GIỚI HẠN', emoji: '⚡', category: 'Typography', description: 'Motivational Vietnamese text' },
      { id: 'love1', name: 'YÊU VIỆT NAM', emoji: '❤️', category: 'Typography', description: 'Love Vietnam text design' },
      { id: 'pride1', name: 'TỰ HÀO DÂN TỘC', emoji: '🏆', category: 'Typography', description: 'National pride typography' },
      { id: 'dream1', name: 'GIẤC MƠ VIỆT', emoji: '✨', category: 'Typography', description: 'Vietnamese dream text' },
    ],
    nature: [
      { id: 'halong1', name: 'Vịnh Hạ Long', emoji: '⛰️', category: 'Nature', description: 'Ha Long Bay minimalist silhouette' },
      { id: 'coffee1', name: 'Cà Phê Phin', emoji: '☕', category: 'Nature', description: 'Vietnamese coffee vintage poster' },
      { id: 'rice1', name: 'Ruộng Bậc Thang', emoji: '🌾', category: 'Nature', description: 'Terraced rice fields landscape' },
      { id: 'bamboo1', name: 'Cây Tre', emoji: '🎋', category: 'Nature', description: 'Bamboo traditional art' },
      { id: 'lotus2', name: 'Sen Hồ Gươm', emoji: '🪷', category: 'Nature', description: 'Hoan Kiem Lake lotus' },
      { id: 'sun1', name: 'Mặt Trời Việt Nam', emoji: '☀️', category: 'Nature', description: 'Vietnamese sun pattern' },
    ],
    abstract: [
      { id: 'map1', name: 'Bản Đồ VN Geometric', emoji: '🗺️', category: 'Abstract', description: 'Vietnam map low poly style' },
      { id: 'wave1', name: 'Wave Pattern', emoji: '🌊', category: 'Abstract', description: 'Abstract ocean waves gradient' },
      { id: 'triangle1', name: 'Triangle Pattern', emoji: '🔺', category: 'Abstract', description: 'Geometric triangle mosaic' },
      { id: 'circle1', name: 'Circle Mandala', emoji: '⭕', category: 'Abstract', description: 'Vietnamese mandala pattern' },
      { id: 'line1', name: 'Line Art Pattern', emoji: '〰️', category: 'Abstract', description: 'Flowing line abstract art' },
      { id: 'color1', name: 'Color Splash', emoji: '🎨', category: 'Abstract', description: 'Colorful paint splash' },
    ],
    streetwear: [
      { id: 'moto1', name: 'Xe Máy Vintage', emoji: '🏍️', category: 'Streetwear', description: 'Honda Cub retro poster' },
      { id: 'food1', name: 'Street Food Icons', emoji: '🍜', category: 'Streetwear', description: 'Phở, bánh mì collage' },
      { id: 'urban1', name: 'Saigon Urban', emoji: '🌃', category: 'Streetwear', description: 'City street art style' },
      { id: 'graffiti1', name: 'VN Graffiti', emoji: '🎭', category: 'Streetwear', description: 'Vietnamese graffiti art' },
      { id: 'skate1', name: 'Skate Culture', emoji: '🛹', category: 'Streetwear', description: 'Vietnam skate board design' },
      { id: 'music1', name: 'Vietnam Beats', emoji: '🎵', category: 'Streetwear', description: 'Music urban design' },
    ],
    luxury: [
      { id: 'phoenix1', name: 'Phoenix Vàng', emoji: '🦅', category: 'Luxury', description: 'Gold phoenix art nouveau' },
      { id: 'crown2', name: 'Vương Miện Việt', emoji: '👑', category: 'Luxury', description: 'Vietnamese royal crown' },
      { id: 'gold1', name: 'Gold Pattern', emoji: '✨', category: 'Luxury', description: 'Luxury gold ornament' },
      { id: 'diamond2', name: 'Diamond VN', emoji: '💎', category: 'Luxury', description: 'Vietnamese diamond pattern' },
      { id: 'royal1', name: 'Royal Crest', emoji: '🛡️', category: 'Luxury', description: 'Vietnam royal emblem' },
      { id: 'silk1', name: 'Silk Pattern', emoji: '🧵', category: 'Luxury', description: 'Vietnamese silk texture' },
    ],
  };

  const allTemplates = [
    ...designTemplates.culture,
    ...designTemplates.typography,
    ...designTemplates.nature,
    ...designTemplates.abstract,
    ...designTemplates.streetwear,
    ...designTemplates.luxury,
  ];

  // Template categories
  const templateCategories = [
    { id: 'all', name: 'Tất cả', icon: '🎨', count: allTemplates.length },
    { id: 'culture', name: 'Văn Hóa VN', icon: '🐉', count: designTemplates.culture.length },
    { id: 'typography', name: 'Typography', icon: '🔤', count: designTemplates.typography.length },
    { id: 'nature', name: 'Thiên Nhiên', icon: '🌿', count: designTemplates.nature.length },
    { id: 'abstract', name: 'Abstract', icon: '🔷', count: designTemplates.abstract.length },
    { id: 'streetwear', name: 'Streetwear', icon: '🏍️', count: designTemplates.streetwear.length },
    { id: 'luxury', name: 'Luxury', icon: '👑', count: designTemplates.luxury.length },
  ];

  // Keep old art templates for backward compatibility
  const artTemplates = [
    { id: 1, name: "Fire", emoji: "🔥" },
    { id: 2, name: "Lightning", emoji: "⚡" },
    { id: 3, name: "Star", emoji: "⭐" },
    { id: 4, name: "Diamond", emoji: "💎" },
    { id: 5, name: "Target", emoji: "🎯" },
    { id: 6, name: "Rocket", emoji: "🚀" },
    { id: 7, name: "Crown", emoji: "👑" },
    { id: 8, name: "Heart", emoji: "❤️" },
  ];

  const fonts = ["Arial", "Times New Roman", "Georgia", "Verdana", "Courier New", "Impact"];

  const [selectedTemplateCategory, setSelectedTemplateCategory] = useState('all');

  const TshirtImage = ({ view, color, className = "" }) => {
    const getImageSrc = () => {
      switch (view) {
        case "front":
          return "/images/tshirt-real.png";
        case "back":
          return "/images/tshirt-real.png";
        case "left":
          return "/images/tshirt-left.png";
        case "right":
          return "/images/tshirt-right.png";
        default:
          return "/images/tshirt-front.png";
      }
    };

    const imageSrc = getImageSrc();

    return (
      <div className={`relative ${className}`}>
        <div className="relative w-full h-full">
          <img
            src={imageSrc || "/placeholder.svg"}
            alt={`T-shirt ${view}`}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
          {color !== "#ffffff" && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundColor: color,
                opacity: 0.5,
                maskImage: `url(${imageSrc})`,
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
              }}
            />
          )}
        </div>
      </div>
    );
  };

  const getDesignArea = (view) => {
    switch (view) {
      case "front":
        return { x: 50, y: 60, width: 300, height: 370 };
      case "back":
        return { x: 50, y: 50, width: 300, height: 380 };
      case "left":
      case "right":
        return { x: 40, y: 60, width: 320, height: 370 };
      default:
        return { x: 50, y: 60, width: 300, height: 370 };
    }
  };

  const getViewInfo = (view) => {
    switch (view) {
      case "front":
        return {
          label: "Mặt trước",
          icon: <span role="img" aria-label="tshirt">👕</span>,
          description: "Thiết kế mặt trước áo",
        };
      case "back":
        return { label: "Mặt sau", icon: <UndoOutlined />, description: "Thiết kế mặt sau áo" };
      case "left":
        return {
          label: "Bên trái",
          icon: <span role="img" aria-label="left">👈</span>,
          description: "Thiết kế bên trái áo",
        };
      case "right":
        return {
          label: "Bên phải",
          icon: <span role="img" aria-label="right">👉</span>,
          description: "Thiết kế bên phải áo",
        };
      default:
        return {
          label: "Mặt trước",
          icon: <span role="img" aria-label="tshirt">👕</span>,
          description: "Thiết kế mặt trước áo",
        };
    }
  };

  const saveToHistory = useCallback(() => {
    setHistory((prevHistory) => {
      const newHistory = prevHistory.slice(0, historyIndex + 1);
      newHistory.push(JSON.parse(JSON.stringify(designElements)));
      setHistoryIndex(newHistory.length - 1);
      return newHistory;
    });
  }, [historyIndex, designElements]);

  useEffect(() => {
    if (history.length === 0 && designElements.length === 0) {
      saveToHistory();
    }
  }, [designElements, history.length, saveToHistory]);

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setDesignElements(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setDesignElements(history[historyIndex + 1]);
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleToolSelect = (toolId) => {
    setSelectedTool(toolId);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        const designArea = getDesignArea(activeView);
        const newElement = {
          id: Date.now(),
          type: "image",
          src: result,
          x: designArea.x + 50,
          y: designArea.y + 50,
          width: 100,
          height: 100,
          rotation: 0,
          zIndex: designElements.length,
          view: activeView,
        };
        setDesignElements((prevElements) => [...prevElements, newElement]);
        setQuantity((prevQuantity) => prevQuantity + 1);
        saveToHistory();
      };
      reader.readAsDataURL(file);
    }
  };

  const addTextElement = () => {
    if (textInput.trim()) {
      const designArea = getDesignArea(activeView);
      const newElement = {
        id: Date.now(),
        type: "text",
        content: textInput,
        x: designArea.x + 100,
        y: designArea.y + 150,
        fontSize: fontSize,
        color: textColor,
        fontFamily: fontFamily,
        rotation: 0,
        zIndex: designElements.length,
        view: activeView,
      };
      setDesignElements((prevElements) => [...prevElements, newElement]);
      setTextInput("");
      setQuantity((prevQuantity) => prevQuantity + 1);
      saveToHistory();
    }
  };

  const addArtElement = (art) => {
    const designArea = getDesignArea(activeView);
    const newElement = {
      id: Date.now(),
      type: "art",
      content: art.emoji,
      name: art.name,
      x: designArea.x + 120,
      y: designArea.y + 120,
      fontSize: 40,
      rotation: 0,
      zIndex: designElements.length,
      view: activeView,
    };
    setDesignElements((prevElements) => [...prevElements, newElement]);
    setQuantity((prevQuantity) => prevQuantity + 1);
    saveToHistory();
  };

  const addTemplateElement = (template) => {
    const designArea = getDesignArea(activeView);
    const newElement = {
      id: Date.now(),
      type: "template",
      content: template.emoji,
      name: template.name,
      category: template.category,
      description: template.description,
      x: designArea.x + 100,
      y: designArea.y + 100,
      fontSize: 48,
      rotation: 0,
      zIndex: designElements.length,
      view: activeView,
    };
    setDesignElements((prevElements) => [...prevElements, newElement]);
    setQuantity((prevQuantity) => prevQuantity + 1);
    saveToHistory();
  };

  const getFilteredTemplates = () => {
    if (selectedTemplateCategory === 'all') {
      return allTemplates;
    }
    return designTemplates[selectedTemplateCategory] || [];
  };

  const addQRCode = () => {
    const designArea = getDesignArea(activeView);
    const newElement = {
      id: Date.now(),
      type: "qr",
      content: "📱",
      x: designArea.x + 120,
      y: designArea.y + 120,
      fontSize: 30,
      rotation: 0,
      zIndex: designElements.length,
      view: activeView,
    };
    setDesignElements((prevElements) => [...prevElements, newElement]);
    setQuantity((prevQuantity) => prevQuantity + 1);
    saveToHistory();
  };

  const deleteElement = (elementId) => {
    setDesignElements((prevElements) => prevElements.filter((el) => el.id !== elementId));
    setSelectedElement(null);
    setQuantity((prevQuantity) => Math.max(0, prevQuantity - 1));
    saveToHistory();
  };

  const updateElement = (elementId, updates) => {
    setDesignElements((prevElements) => prevElements.map((el) => (el.id === elementId ? { ...el, ...updates } : el)));
  };

  const selectElement = (element) => {
    setSelectedElement(element);
  };

  const clearAll = () => {
    setDesignElements([]);
    setSelectedElement(null);
    setQuantity(0);
    saveToHistory();
  };

  const exportDesign = () => {
    const designData = {
      product: selectedProduct,
      color: selectedColor,
      size: selectedSize,
      elements: designElements,
      view: activeView,
    };
    console.log("Design exported:", designData);
    alert("Thiết kế đã được lưu!");
  };

  const currentViewInfo = getViewInfo(activeView);

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Content style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <Row gutter={[16, 16]}>
          {/* Left Sidebar */}
          <Col span={6}>
            <Card style={{ borderRadius: "8px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
              <Tabs
                activeKey={activeTab}
                onChange={(key) => setActiveTab(key)}
                items={[
                  {
                    label: "Thông tin sản phẩm",
                    key: "info",
                  },
                  {
                    label: "Sizes",
                    key: "sizes",
                  },
                ]}
              />
              <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {tools.map((tool) => (
                  <Button
                    key={tool.id}
                    type={selectedTool === tool.id ? "primary" : "default"}
                    onClick={() => handleToolSelect(tool.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px",
                      height: "auto",
                      justifyContent: "flex-start",
                    }}
                  >
                    <span style={{ fontSize: "18px" }}>{tool.icon}</span>
                    <span style={{ fontSize: "14px", fontWeight: 500 }}>{tool.name}</span>
                  </Button>
                ))}
              </div>
              <div style={{ padding: "16px", borderTop: "1px solid #e5e7eb" }}>
                <Select
                  value={selectedProduct}
                  onChange={(value) => setSelectedProduct(value)}
                  style={{ width: "100%" }}
                  size="large"
                >
                  <Option value="Lớp">Lớp</Option>
                  <Option value="Áo thun cổ tròn">Áo thun cổ tròn</Option>
                  <Option value="Áo thun cổ V">Áo thun cổ V</Option>
                  <Option value="Áo polo">Áo polo</Option>
                </Select>
              </div>
              {/* Tool Panels */}
              {selectedTool === "text" && (
                <div style={{ padding: "16px", borderTop: "1px solid #e5e7eb", backgroundColor: "#f9fafb" }}>
                  <h3 style={{ fontWeight: 500, marginBottom: "12px", color: "#374151" }}>Thêm Text</h3>
                  <Input
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Nhập văn bản..."
                    style={{ marginBottom: "12px" }}
                  />
                  <div style={{ marginBottom: "12px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 500,
                        marginBottom: "4px",
                        color: "#4b5563",
                      }}
                    >
                      Màu chữ:
                    </label>
                    <ColorPicker
                      value={textColor}
                      onChangeComplete={(color) => setTextColor(color.toHexString())}
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div style={{ marginBottom: "12px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 500,
                        marginBottom: "4px",
                        color: "#4b5563",
                      }}
                    >
                      Kích thước:
                    </label>
                    <Slider min={12} max={48} onChange={(value) => setFontSize(value)} value={fontSize} />
                    <span style={{ fontSize: "12px", color: "#6b7280" }}>{fontSize}px</span>
                  </div>
                  <div style={{ marginBottom: "12px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 500,
                        marginBottom: "4px",
                        color: "#4b5563",
                      }}
                    >
                      Font chữ:
                    </label>
                    <Select value={fontFamily} onChange={(value) => setFontFamily(value)} style={{ width: "100%" }}>
                      {fonts.map((font) => (
                        <Option key={font} value={font}>
                          {font}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <Button onClick={addTextElement} type="primary" block style={{ marginTop: "8px" }}>
                    Thêm văn bản
                  </Button>
                </div>
              )}
              {selectedTool === "upload" && (
                <div style={{ padding: "16px", borderTop: "1px solid #e5e7eb", backgroundColor: "#f9fafb" }}>
                  <h3 style={{ fontWeight: 500, marginBottom: "12px", color: "#374151" }}>Tải lên hình ảnh</h3>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                  <Button onClick={() => fileInputRef.current?.click()} type="primary" block icon={<UploadOutlined />}>
                    Chọn hình ảnh
                  </Button>
                  
                  {/* Image Size Control - hiển thị khi có image được chọn */}
                  {selectedElement && selectedElement.type === "image" && (
                    <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid #e5e7eb" }}>
                      <h4 style={{ fontSize: "13px", fontWeight: 600, marginBottom: "12px", color: "#374151" }}>
                        Chỉnh kích thước ảnh
                      </h4>
                      
                      <div style={{ marginBottom: "12px" }}>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "4px", color: "#4b5563" }}>
                          Chiều rộng:
                        </label>
                        <Slider
                          min={50}
                          max={300}
                          value={selectedElement.width}
                          onChange={(value) => updateElement(selectedElement.id, { width: value })}
                        />
                        <span style={{ fontSize: "12px", color: "#6b7280" }}>{selectedElement.width}px</span>
                      </div>
                      
                      <div style={{ marginBottom: "12px" }}>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 500, marginBottom: "4px", color: "#4b5563" }}>
                          Chiều cao:
                        </label>
                        <Slider
                          min={50}
                          max={300}
                          value={selectedElement.height}
                          onChange={(value) => updateElement(selectedElement.id, { height: value })}
                        />
                        <span style={{ fontSize: "12px", color: "#6b7280" }}>{selectedElement.height}px</span>
                      </div>
                      
                      <Button
                        onClick={() => {
                          // Reset về tỷ lệ gốc (vuông)
                          const size = Math.max(selectedElement.width, selectedElement.height);
                          updateElement(selectedElement.id, { width: size, height: size });
                        }}
                        size="small"
                        block
                        style={{ marginBottom: "8px" }}
                      >
                        Tỷ lệ vuông
                      </Button>
                      
                      <Button
                        onClick={() => {
                          // Giữ tỷ lệ ảnh gốc
                          const ratio = selectedElement.width / selectedElement.height;
                          if (ratio > 1) {
                            updateElement(selectedElement.id, { width: 150, height: 150 / ratio });
                          } else {
                            updateElement(selectedElement.id, { width: 150 * ratio, height: 150 });
                          }
                        }}
                        size="small"
                        block
                      >
                        Giữ tỷ lệ gốc
                      </Button>
                    </div>
                  )}
                </div>
              )}
              {selectedTool === "art" && (
                <div style={{ padding: "16px", borderTop: "1px solid #e5e7eb", backgroundColor: "#f9fafb", maxHeight: "600px", overflowY: "auto" }}>
                  <h3 style={{ fontWeight: 600, marginBottom: "16px", color: "#1f2937", fontSize: "16px" }}>
                    🎨 Design Template Library
                  </h3>
                  
                  {/* Category Filter Tabs */}
                  <div style={{ marginBottom: "16px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {templateCategories.map((cat) => (
                      <Button
                        key={cat.id}
                        size="small"
                        type={selectedTemplateCategory === cat.id ? "primary" : "default"}
                        onClick={() => setSelectedTemplateCategory(cat.id)}
                        style={{
                          fontSize: "11px",
                          padding: "4px 10px",
                          height: "auto",
                          borderRadius: "6px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px"
                        }}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                        <span style={{ 
                          fontSize: "10px", 
                          opacity: 0.7,
                          background: selectedTemplateCategory === cat.id ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.05)",
                          padding: "1px 5px",
                          borderRadius: "10px"
                        }}>
                          {cat.count}
                        </span>
                      </Button>
                    ))}
                  </div>

                  {/* Templates Grid */}
                  <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(2, 1fr)", 
                    gap: "8px"
                  }}>
                    {getFilteredTemplates().map((template) => (
                      <div
                        key={template.id}
                        onClick={() => addTemplateElement(template)}
                        style={{
                          background: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          padding: "10px",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "6px",
                          position: "relative",
                          overflow: "hidden"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#3b82f6";
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(59,130,246,0.15)";
                          e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "#e5e7eb";
                          e.currentTarget.style.boxShadow = "none";
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                        title={template.description}
                      >
                        {/* Category Badge */}
                        <div style={{
                          position: "absolute",
                          top: "4px",
                          right: "4px",
                          fontSize: "8px",
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          color: "white",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          fontWeight: 600
                        }}>
                          {template.category}
                        </div>
                        
                        {/* Emoji */}
                        <div style={{ fontSize: "36px", marginTop: "8px" }}>
                          {template.emoji}
                        </div>
                        
                        {/* Name */}
                        <div style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#1f2937",
                          textAlign: "center",
                          lineHeight: "1.3"
                        }}>
                          {template.name}
                        </div>
                        
                        {/* Description */}
                        <div style={{
                          fontSize: "9px",
                          color: "#6b7280",
                          textAlign: "center",
                          lineHeight: "1.2",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden"
                        }}>
                          {template.description}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Classic Art Templates (Legacy) */}
                  <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid #e5e7eb" }}>
                    <h4 style={{ fontSize: "13px", fontWeight: 600, marginBottom: "10px", color: "#6b7280" }}>
                      🔖 Classic Icons
                    </h4>
                    <Row gutter={[6, 6]}>
                      {artTemplates.map((art) => (
                        <Col span={6} key={art.id}>
                          <Button
                            onClick={() => addArtElement(art)}
                            style={{ 
                              width: "100%", 
                              height: "auto", 
                              padding: "8px", 
                              fontSize: "20px",
                              borderRadius: "6px"
                            }}
                            title={art.name}
                          >
                            {art.emoji}
                          </Button>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </div>
              )}
              {selectedTool === "qr" && (
                <div style={{ padding: "16px", borderTop: "1px solid #e5e7eb", backgroundColor: "#f9fafb" }}>
                  <h3 style={{ fontWeight: 500, marginBottom: "12px", color: "#374151" }}>Thêm QRcode</h3>
                  <Button onClick={addQRCode} type="primary" block icon={<QrcodeOutlined />}>
                    Thêm QR Code
                  </Button>
                </div>
              )}
            </Card>
          </Col>
          {/* Center Canvas */}
          <Col span={12}>
            <Card style={{ borderRadius: "8px", border: "1px solid #e5e7eb", padding: "16px" }}>
              <Space style={{ justifyContent: "center", width: "100%", marginBottom: "16px" }}>
                <Tooltip title="Hủy">
                  <Button onClick={undo} disabled={historyIndex <= 0} icon={<UndoOutlined />} />
                </Tooltip>
                <Tooltip title="Quay lại">
                  <Button onClick={redo} disabled={historyIndex >= history.length - 1} icon={<RedoOutlined />} />
                </Tooltip>
                <Tooltip title="Lưu">
                  <Button onClick={exportDesign} icon={<SaveOutlined />} />
                </Tooltip>
                <Tooltip title="Xem">
                  <Button icon={<EyeOutlined />} />
                </Tooltip>
                <Tooltip title="Zoom">
                  <Button onClick={() => setIsZoomed(!isZoomed)} icon={<FullscreenOutlined />} />
                </Tooltip>
                <Tooltip title="Share">
                  <Button icon={<ShareAltOutlined />} />
                </Tooltip>
                <Tooltip title="Xóa tất cả">
                  <Button onClick={clearAll} icon={<CloseOutlined />} />
                </Tooltip>
              </Space>
              {/* Current View Info */}
              <div style={{ textAlign: "center", marginBottom: "16px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 16px",
                    backgroundColor: "#e0f2fe",
                    borderRadius: "8px",
                  }}
                >
                  <span style={{ fontSize: "18px" }}>{currentViewInfo.icon}</span>
                  <span style={{ fontSize: "14px", fontWeight: 500, color: "#0369a1" }}>{currentViewInfo.label}</span>
                  {activeView === "back" && (
                    <span
                      style={{
                        fontSize: "12px",
                        backgroundColor: "#dcfce7",
                        color: "#16a34a",
                        padding: "4px 8px",
                        borderRadius: "9999px",
                      }}
                    >
                      Nhỏ hơn
                    </span>
                  )}
                </div>
                <p style={{ fontSize: "12px", color: "#4b5563", marginTop: "4px" }}>{currentViewInfo.description}</p>
                <p style={{ fontSize: "12px", color: "#16a34a", marginTop: "4px" }}>
                  ✨ Khu vực thiết kế: {activeView === "back" ? "Mở rộng lên trên" : "Toàn bộ áo"}
                </p>
              </div>
              {/* Canvas Area */}
              <div
                style={{
                  position: "relative",
                  backgroundColor: "#e5e7eb",
                  borderRadius: "8px",
                  padding: "32px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "384px",
                  border: "2px dashed #9ca3af",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    transition: "all 0.3s",
                    transform: isZoomed ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  <div
                    ref={canvasRef}
                    style={{
                      position: "relative",
                      width: "384px",
                      height: "384px",
                      cursor: "pointer",
                      backgroundColor: "white",
                      border: "1px solid #d1d5db",
                    }}
                    onClick={() => setSelectedElement(null)}
                  >
                    {/* T-shirt Image */}
                    <TshirtImage view={activeView} color={selectedColor} className="absolute inset-0 w-full h-full" />
                    {/* Design Elements */}
                    {designElements
                      .filter((element) => element.view === activeView)
                      .sort((a, b) => a.zIndex - b.zIndex)
                      .map((element) => (
                        <div
                          key={element.id}
                          style={{
                            position: "absolute",
                            cursor: "grab",
                            userSelect: "none",
                            transition: "all 0.1s",
                            left: element.x,
                            top: element.y,
                            width: element.type === "image" ? element.width : "auto",
                            height: element.type === "image" ? element.height : "auto",
                            transform: `rotate(${element.rotation || 0}deg)`,
                            zIndex: element.zIndex + 10,
                            border: selectedElement?.id === element.id ? "2px solid #3b82f6" : "none",
                            boxShadow: selectedElement?.id === element.id ? "0 0 0 2px #bfdbfe" : "none",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            selectElement(element);
                          }}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            const rect = canvasRef.current?.getBoundingClientRect();
                            if (!rect) return;
                            const startX = e.clientX - rect.left - element.x;
                            const startY = e.clientY - rect.top - element.y;

                            const handleMouseMove = (e) => {
                              const newX = e.clientX - rect.left - startX;
                              const newY = e.clientY - rect.top - startY;
                              const designArea = getDesignArea(activeView);

                              const constrainedX = Math.max(
                                designArea.x,
                                Math.min(designArea.x + designArea.width - (element.width || 50), newX),
                              );
                              const constrainedY = Math.max(
                                designArea.y,
                                Math.min(designArea.y + designArea.height - (element.height || 50), newY),
                              );
                              updateElement(element.id, {
                                x: constrainedX,
                                y: constrainedY,
                              });
                            };

                            const handleMouseUp = () => {
                              document.removeEventListener("mousemove", handleMouseMove);
                              document.removeEventListener("mouseup", handleMouseUp);
                              saveToHistory();
                            };

                            document.addEventListener("mousemove", handleMouseMove);
                            document.addEventListener("mouseup", handleMouseUp);
                          }}
                        >
                          {element.type === "text" && (
                            <div
                              style={{
                                fontSize: element.fontSize,
                                color: element.color,
                                fontFamily: element.fontFamily,
                                whiteSpace: "nowrap",
                                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                                fontWeight: "bold",
                              }}
                            >
                              {element.content}
                            </div>
                          )}
                          {element.type === "image" && (
                            <img
                              src={element.src || "/placeholder.svg"}
                              alt="Design element"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                borderRadius: "4px",
                                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
                              }}
                              draggable={false}
                            />
                          )}
                          {(element.type === "art" || element.type === "qr" || element.type === "template") && (
                            <div
                              style={{ 
                                fontSize: element.fontSize, 
                                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                                position: "relative"
                              }}
                            >
                              {element.content}
                              {element.type === "template" && selectedElement?.id === element.id && (
                                <div style={{
                                  position: "absolute",
                                  bottom: "-24px",
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                  background: "rgba(0,0,0,0.75)",
                                  color: "white",
                                  padding: "4px 8px",
                                  borderRadius: "4px",
                                  fontSize: "10px",
                                  whiteSpace: "nowrap",
                                  zIndex: 1000
                                }}>
                                  {element.category}
                                </div>
                              )}
                            </div>
                          )}
                          {selectedElement?.id === element.id && (
                            <>
                              {/* Delete Button */}
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteElement(element.id);
                                }}
                                type="primary"
                                danger
                                shape="circle"
                                icon={<CloseOutlined style={{ fontSize: "12px" }} />}
                                size="small"
                                style={{
                                  position: "absolute",
                                  top: "-8px",
                                  right: "-8px",
                                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
                                }}
                              />
                              
                              {/* Resize Handles - chỉ cho image */}
                              {element.type === "image" && (
                                <>
                                  {/* 4 Góc */}
                                  {/* Top-Left */}
                                  <div
                                    onMouseDown={(e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      const rect = canvasRef.current?.getBoundingClientRect();
                                      const startX = e.clientX;
                                      const startY = e.clientY;
                                      const startWidth = element.width;
                                      const startHeight = element.height;
                                      const startPosX = element.x;
                                      const startPosY = element.y;

                                      const handleMouseMove = (e) => {
                                        const deltaX = e.clientX - startX;
                                        const deltaY = e.clientY - startY;
                                        const newWidth = Math.max(50, Math.min(300, startWidth - deltaX));
                                        const newHeight = Math.max(50, Math.min(300, startHeight - deltaY));
                                        const newX = startPosX + (startWidth - newWidth);
                                        const newY = startPosY + (startHeight - newHeight);
                                        updateElement(element.id, { width: newWidth, height: newHeight, x: newX, y: newY });
                                      };

                                      const handleMouseUp = () => {
                                        document.removeEventListener("mousemove", handleMouseMove);
                                        document.removeEventListener("mouseup", handleMouseUp);
                                        saveToHistory();
                                      };

                                      document.addEventListener("mousemove", handleMouseMove);
                                      document.addEventListener("mouseup", handleMouseUp);
                                    }}
                                    style={{
                                      position: "absolute",
                                      top: "-6px",
                                      left: "-6px",
                                      width: "12px",
                                      height: "12px",
                                      background: "white",
                                      border: "2px solid #3b82f6",
                                      borderRadius: "2px",
                                      cursor: "nwse-resize",
                                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                                    }}
                                  />
                                  
                                  {/* Top-Right */}
                                  <div
                                    onMouseDown={(e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      const startX = e.clientX;
                                      const startY = e.clientY;
                                      const startWidth = element.width;
                                      const startHeight = element.height;
                                      const startPosY = element.y;

                                      const handleMouseMove = (e) => {
                                        const deltaX = e.clientX - startX;
                                        const deltaY = e.clientY - startY;
                                        const newWidth = Math.max(50, Math.min(300, startWidth + deltaX));
                                        const newHeight = Math.max(50, Math.min(300, startHeight - deltaY));
                                        const newY = startPosY + (startHeight - newHeight);
                                        updateElement(element.id, { width: newWidth, height: newHeight, y: newY });
                                      };

                                      const handleMouseUp = () => {
                                        document.removeEventListener("mousemove", handleMouseMove);
                                        document.removeEventListener("mouseup", handleMouseUp);
                                        saveToHistory();
                                      };

                                      document.addEventListener("mousemove", handleMouseMove);
                                      document.addEventListener("mouseup", handleMouseUp);
                                    }}
                                    style={{
                                      position: "absolute",
                                      top: "-6px",
                                      right: "-6px",
                                      width: "12px",
                                      height: "12px",
                                      background: "white",
                                      border: "2px solid #3b82f6",
                                      borderRadius: "2px",
                                      cursor: "nesw-resize",
                                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                                    }}
                                  />
                                  
                                  {/* Bottom-Left */}
                                  <div
                                    onMouseDown={(e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      const startX = e.clientX;
                                      const startY = e.clientY;
                                      const startWidth = element.width;
                                      const startHeight = element.height;
                                      const startPosX = element.x;

                                      const handleMouseMove = (e) => {
                                        const deltaX = e.clientX - startX;
                                        const deltaY = e.clientY - startY;
                                        const newWidth = Math.max(50, Math.min(300, startWidth - deltaX));
                                        const newHeight = Math.max(50, Math.min(300, startHeight + deltaY));
                                        const newX = startPosX + (startWidth - newWidth);
                                        updateElement(element.id, { width: newWidth, height: newHeight, x: newX });
                                      };

                                      const handleMouseUp = () => {
                                        document.removeEventListener("mousemove", handleMouseMove);
                                        document.removeEventListener("mouseup", handleMouseUp);
                                        saveToHistory();
                                      };

                                      document.addEventListener("mousemove", handleMouseMove);
                                      document.addEventListener("mouseup", handleMouseUp);
                                    }}
                                    style={{
                                      position: "absolute",
                                      bottom: "-6px",
                                      left: "-6px",
                                      width: "12px",
                                      height: "12px",
                                      background: "white",
                                      border: "2px solid #3b82f6",
                                      borderRadius: "2px",
                                      cursor: "nesw-resize",
                                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                                    }}
                                  />
                                  
                                  {/* Bottom-Right */}
                                  <div
                                    onMouseDown={(e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      const startX = e.clientX;
                                      const startY = e.clientY;
                                      const startWidth = element.width;
                                      const startHeight = element.height;

                                      const handleMouseMove = (e) => {
                                        const deltaX = e.clientX - startX;
                                        const deltaY = e.clientY - startY;
                                        const newWidth = Math.max(50, Math.min(300, startWidth + deltaX));
                                        const newHeight = Math.max(50, Math.min(300, startHeight + deltaY));
                                        updateElement(element.id, { width: newWidth, height: newHeight });
                                      };

                                      const handleMouseUp = () => {
                                        document.removeEventListener("mousemove", handleMouseMove);
                                        document.removeEventListener("mouseup", handleMouseUp);
                                        saveToHistory();
                                      };

                                      document.addEventListener("mousemove", handleMouseMove);
                                      document.addEventListener("mouseup", handleMouseUp);
                                    }}
                                    style={{
                                      position: "absolute",
                                      bottom: "-6px",
                                      right: "-6px",
                                      width: "12px",
                                      height: "12px",
                                      background: "white",
                                      border: "2px solid #3b82f6",
                                      borderRadius: "2px",
                                      cursor: "nwse-resize",
                                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                                    }}
                                  />
                                  
                                  {/* 4 Cạnh */}
                                  {/* Top */}
                                  <div
                                    onMouseDown={(e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      const startY = e.clientY;
                                      const startHeight = element.height;
                                      const startPosY = element.y;

                                      const handleMouseMove = (e) => {
                                        const deltaY = e.clientY - startY;
                                        const newHeight = Math.max(50, Math.min(300, startHeight - deltaY));
                                        const newY = startPosY + (startHeight - newHeight);
                                        updateElement(element.id, { height: newHeight, y: newY });
                                      };

                                      const handleMouseUp = () => {
                                        document.removeEventListener("mousemove", handleMouseMove);
                                        document.removeEventListener("mouseup", handleMouseUp);
                                        saveToHistory();
                                      };

                                      document.addEventListener("mousemove", handleMouseMove);
                                      document.addEventListener("mouseup", handleMouseUp);
                                    }}
                                    style={{
                                      position: "absolute",
                                      top: "-4px",
                                      left: "50%",
                                      transform: "translateX(-50%)",
                                      width: "20px",
                                      height: "8px",
                                      background: "white",
                                      border: "2px solid #3b82f6",
                                      borderRadius: "2px",
                                      cursor: "ns-resize",
                                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                                    }}
                                  />
                                  
                                  {/* Right */}
                                  <div
                                    onMouseDown={(e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      const startX = e.clientX;
                                      const startWidth = element.width;

                                      const handleMouseMove = (e) => {
                                        const deltaX = e.clientX - startX;
                                        const newWidth = Math.max(50, Math.min(300, startWidth + deltaX));
                                        updateElement(element.id, { width: newWidth });
                                      };

                                      const handleMouseUp = () => {
                                        document.removeEventListener("mousemove", handleMouseMove);
                                        document.removeEventListener("mouseup", handleMouseUp);
                                        saveToHistory();
                                      };

                                      document.addEventListener("mousemove", handleMouseMove);
                                      document.addEventListener("mouseup", handleMouseUp);
                                    }}
                                    style={{
                                      position: "absolute",
                                      right: "-4px",
                                      top: "50%",
                                      transform: "translateY(-50%)",
                                      width: "8px",
                                      height: "20px",
                                      background: "white",
                                      border: "2px solid #3b82f6",
                                      borderRadius: "2px",
                                      cursor: "ew-resize",
                                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                                    }}
                                  />
                                  
                                  {/* Bottom */}
                                  <div
                                    onMouseDown={(e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      const startY = e.clientY;
                                      const startHeight = element.height;

                                      const handleMouseMove = (e) => {
                                        const deltaY = e.clientY - startY;
                                        const newHeight = Math.max(50, Math.min(300, startHeight + deltaY));
                                        updateElement(element.id, { height: newHeight });
                                      };

                                      const handleMouseUp = () => {
                                        document.removeEventListener("mousemove", handleMouseMove);
                                        document.removeEventListener("mouseup", handleMouseUp);
                                        saveToHistory();
                                      };

                                      document.addEventListener("mousemove", handleMouseMove);
                                      document.addEventListener("mouseup", handleMouseUp);
                                    }}
                                    style={{
                                      position: "absolute",
                                      bottom: "-4px",
                                      left: "50%",
                                      transform: "translateX(-50%)",
                                      width: "20px",
                                      height: "8px",
                                      background: "white",
                                      border: "2px solid #3b82f6",
                                      borderRadius: "2px",
                                      cursor: "ns-resize",
                                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                                    }}
                                  />
                                  
                                  {/* Left */}
                                  <div
                                    onMouseDown={(e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      const startX = e.clientX;
                                      const startWidth = element.width;
                                      const startPosX = element.x;

                                      const handleMouseMove = (e) => {
                                        const deltaX = e.clientX - startX;
                                        const newWidth = Math.max(50, Math.min(300, startWidth - deltaX));
                                        const newX = startPosX + (startWidth - newWidth);
                                        updateElement(element.id, { width: newWidth, x: newX });
                                      };

                                      const handleMouseUp = () => {
                                        document.removeEventListener("mousemove", handleMouseMove);
                                        document.removeEventListener("mouseup", handleMouseUp);
                                        saveToHistory();
                                      };

                                      document.addEventListener("mousemove", handleMouseMove);
                                      document.addEventListener("mouseup", handleMouseUp);
                                    }}
                                    style={{
                                      position: "absolute",
                                      left: "-4px",
                                      top: "50%",
                                      transform: "translateY(-50%)",
                                      width: "8px",
                                      height: "20px",
                                      background: "white",
                                      border: "2px solid #3b82f6",
                                      borderRadius: "2px",
                                      cursor: "ew-resize",
                                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                                    }}
                                  />
                                </>
                              )}
                            </>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/* View Selection */}
              <Space style={{ justifyContent: "center", width: "100%", marginTop: "16px" }}>
                {[
                  {
                    key: "front",
                    label: "Trước",
                    icon: <span role="img" aria-label="tshirt">👕</span>,
                  },
                  { key: "back", label: "Sau", icon: <UndoOutlined /> },
                  {
                    key: "left",
                    label: "Trái",
                    icon: <span role="img" aria-label="left">👈</span>,
                  },
                  {
                    key: "right",
                    label: "Phải",
                    icon: <span role="img" aria-label="right">👉</span>,
                  },
                ].map((view) => (
                  <Button
                    key={view.key}
                    type={activeView === view.key ? "primary" : "default"}
                    onClick={() => setActiveView(view.key)}
                    style={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <span>{view.icon}</span>
                    {view.label}
                  </Button>
                ))}
              </Space>
              {/* View Statistics */}
              <div style={{ textAlign: "center", marginTop: "16px" }}>
                <Space size="middle" style={{ fontSize: "12px", color: "#6b7280" }}>
                  <span>Elements trên view này: {designElements.filter((el) => el.view === activeView).length}</span>
                  <span>•</span>
                  <span>Tổng elements: {designElements.length}</span>
                  <span>•</span>
                  <span style={{ color: "#16a34a" }}>Khu vực: Toàn áo</span>
                </Space>
              </div>
            </Card>
          </Col>
          {/* Right Sidebar */}
          <Col span={6}>
            <Card
              style={{
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {/* Product Selection */}
              <div>
                <Select
                  value={selectedProduct}
                  onChange={(value) => setSelectedProduct(value)}
                  style={{ width: "100%" }}
                  size="large"
                >
                  <Option value="Lựa chọn sản phẩm">Lựa chọn sản phẩm</Option>
                  <Option value="Áo thun cổ tròn">Áo thun cổ tròn</Option>
                  <Option value="Áo thun cổ V">Áo thun cổ V</Option>
                  <Option value="Áo polo">Áo polo</Option>
                </Select>
              </div>
              {/* Color Selection */}
              <div>
                <h3 style={{ fontSize: "14px", fontWeight: 500, marginBottom: "8px", color: "#374151" }}>
                  Chọn màu sắc sản phẩm
                </h3>
                <Row gutter={[8, 8]}>
                  {colors.map((color) => (
                    <Col span={4} key={color.value}>
                      <Button
                        onClick={() => handleColorSelect(color.value)}
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "4px",
                          border: selectedColor === color.value ? "2px solid #3b82f6" : "2px solid #d1d5db",
                          backgroundColor: color.value,
                          transition: "all 0.2s",
                          transform: selectedColor === color.value ? "scale(1.1)" : "scale(1)",
                          padding: 0,
                        }}
                        title={color.name}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
              {/* Size Selection */}
              <div>
                <h3 style={{ fontSize: "14px", fontWeight: 500, marginBottom: "8px", color: "#374151" }}>Size</h3>
                <Space>
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      type={selectedSize === size ? "primary" : "default"}
                      onClick={() => handleSizeSelect(size)}
                      style={{ flex: 1 }}
                    >
                      {size}
                    </Button>
                  ))}
                </Space>
                <InputNumber
                  value={quantity}
                  readOnly
                  style={{ width: "64px", textAlign: "center", marginTop: "8px" }}
                />
              </div>
              {/* Buy Button */}
              <Button
                type="primary"
                block
                size="large"
                style={{ backgroundColor: "#f97316", borderColor: "#f97316" }}
                icon={<ShoppingCartOutlined />}
              >
                Mua ngay
              </Button>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default CustomDesignPage;

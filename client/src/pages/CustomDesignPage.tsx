"use client" // This MUST be the very first line of the file!

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
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
} from "antd"
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
} from "@ant-design/icons"

const { Header, Content, Sider } = Layout
const { Option } = Select
const { TabPane } = Tabs

// Type definitions (unchanged)
interface Color {
  name: string
  value: string
}

interface Tool {
  id: string
  icon: React.ReactNode // Changed to React.ReactNode for Ant Design icons
  name: string
}

interface ArtTemplate {
  id: number
  name: string
  emoji: string
}

interface DesignElement {
  id: number
  type: "text" | "image" | "art" | "qr"
  content?: string
  name?: string
  src?: string
  x: number
  y: number
  width?: number
  height?: number
  fontSize?: number
  color?: string
  fontFamily?: string
  rotation: number
  zIndex: number
  view: ViewType
}

interface DesignArea {
  x: number
  y: number
  width: number
  height: number
}

interface ViewInfo {
  label: string
  icon: React.ReactNode // Changed to React.ReactNode for Ant Design icons
  description: string
}

interface DesignData {
  product: string
  color: string
  size: string
  elements: DesignElement[]
  view: ViewType
}

interface TshirtImageProps {
  view: ViewType
  color: string
  className?: string
}

type ViewType = "front" | "back" | "left" | "right"
type TabType = "info" | "sizes"

const TshirtDesigner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("info")
  const [selectedColor, setSelectedColor] = useState<string>("#ffffff")
  const [selectedSize, setSelectedSize] = useState<string>("M")
  const [quantity, setQuantity] = useState<number>(0)
  const [activeView, setActiveView] = useState<ViewType>("front")
  const [designElements, setDesignElements] = useState<DesignElement[]>([])
  const [selectedElement, setSelectedElement] = useState<DesignElement | null>(null)
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [textInput, setTextInput] = useState<string>("")
  const [textColor, setTextColor] = useState<string>("#000000")
  const [fontSize, setFontSize] = useState<number>(20)
  const [fontFamily, setFontFamily] = useState<string>("Arial")
  const [isZoomed, setIsZoomed] = useState<boolean>(false)
  const [history, setHistory] = useState<DesignElement[][]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const [selectedProduct, setSelectedProduct] = useState<string>("Lớp")

  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  const colors: Color[] = [
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
  ]

  const sizes: string[] = ["S", "M", "L"]

  const tools: Tool[] = [
    {
      id: "product",
      icon: (
        <span role="img" aria-label="tshirt">
          👕
        </span>
      ),
      name: "Chọn sản phẩm",
    },
    {
      id: "text",
      icon: (
        <span role="img" aria-label="text">
          📝
        </span>
      ),
      name: "Thêm Text",
    },
    {
      id: "art",
      icon: (
        <span role="img" aria-label="art">
          🎨
        </span>
      ),
      name: "Thêm Art",
    },
    { id: "upload", icon: <UploadOutlined />, name: "Tải lên hình ảnh" },
    {
      id: "numbers",
      icon: (
        <span role="img" aria-label="numbers">
          🔢
        </span>
      ),
      name: "Tên & Số",
    },
    {
      id: "user",
      icon: (
        <span role="img" aria-label="user">
          👤
        </span>
      ),
      name: "Thiết kế của tôi",
    },
    { id: "qr", icon: <QrcodeOutlined />, name: "Thêm QRcode" },
  ]

  const artTemplates: ArtTemplate[] = [
    { id: 1, name: "Fire", emoji: "🔥" },
    { id: 2, name: "Lightning", emoji: "⚡" },
    { id: 3, name: "Star", emoji: "⭐" },
    { id: 4, name: "Diamond", emoji: "💎" },
    { id: 5, name: "Target", emoji: "🎯" },
    { id: 6, name: "Rocket", emoji: "🚀" },
    { id: 7, name: "Crown", emoji: "👑" },
    { id: 8, name: "Heart", emoji: "❤️" },
  ]

  const fonts: string[] = ["Arial", "Times New Roman", "Georgia", "Verdana", "Courier New", "Impact"]

  // T-shirt component with different sizes for each view
  const TshirtImage: React.FC<TshirtImageProps> = ({ view, color, className = "" }) => {
    const getImageSrc = (): string => {
      switch (view) {
        case "front":
          return "/images/tshirt-real.png"
        case "back":
          return "/images/tshirt-real.png"
        case "left":
          return "/images/tshirt-left.png"
        case "right":
          return "/images/tshirt-right.png"
        default:
          return "/images/tshirt-front.png"
      }
    }

    const imageSrc = getImageSrc()

    return (
      <div className={`relative ${className}`}>
        <div className="relative w-full h-full">
          <img
            src={imageSrc || "/placeholder.svg"}
            alt={`T-shirt ${view}`}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
          {/* Color overlay for real images - simplified for testing */}
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
    )
  }

  const getDesignArea = (view: ViewType): DesignArea => {
    switch (view) {
      case "front":
        return { x: 50, y: 60, width: 300, height: 370 }
      case "back":
        return { x: 50, y: 50, width: 300, height: 380 }
      case "left":
      case "right":
        return { x: 40, y: 60, width: 320, height: 370 }
      default:
        return { x: 50, y: 60, width: 300, height: 370 }
    }
  }

  const getViewInfo = (view: ViewType): ViewInfo => {
    switch (view) {
      case "front":
        return {
          label: "Mặt trước",
          icon: (
            <span role="img" aria-label="tshirt">
              👕
            </span>
          ),
          description: "Thiết kế mặt trước áo",
        }
      case "back":
        return { label: "Mặt sau", icon: <UndoOutlined />, description: "Thiết kế mặt sau áo" }
      case "left":
        return {
          label: "Bên trái",
          icon: (
            <span role="img" aria-label="left">
              👈
            </span>
          ),
          description: "Thiết kế bên trái áo",
        }
      case "right":
        return {
          label: "Bên phải",
          icon: (
            <span role="img" aria-label="right">
              👉
            </span>
          ),
          description: "Thiết kế bên phải áo",
        }
      default:
        return {
          label: "Mặt trước",
          icon: (
            <span role="img" aria-label="tshirt">
              👕
            </span>
          ),
          description: "Thiết kế mặt trước áo",
        }
    }
  }

  // Save to history
  const saveToHistory = useCallback(() => {
    setHistory((prevHistory) => {
      const newHistory = prevHistory.slice(0, historyIndex + 1)
      newHistory.push(JSON.parse(JSON.stringify(designElements)))
      setHistoryIndex(newHistory.length - 1)
      return newHistory
    })
  }, [historyIndex, designElements])

  useEffect(() => {
    // Initialize history with the initial state
    if (history.length === 0 && designElements.length === 0) {
      saveToHistory()
    }
  }, [designElements, history.length, saveToHistory])

  const undo = (): void => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setDesignElements(history[historyIndex - 1])
    }
  }

  const redo = (): void => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setDesignElements(history[historyIndex + 1])
    }
  }

  const handleColorSelect = (color: string): void => {
    setSelectedColor(color)
  }

  const handleSizeSelect = (size: string): void => {
    setSelectedSize(size)
  }

  const handleToolSelect = (toolId: string): void => {
    setSelectedTool(toolId)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result as string
        const designArea = getDesignArea(activeView)
        const newElement: DesignElement = {
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
        }
        setDesignElements((prevElements) => [...prevElements, newElement])
        setQuantity((prevQuantity) => prevQuantity + 1)
        saveToHistory()
      }
      reader.readAsDataURL(file)
    }
  }

  const addTextElement = (): void => {
    if (textInput.trim()) {
      const designArea = getDesignArea(activeView)
      const newElement: DesignElement = {
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
      }
      setDesignElements((prevElements) => [...prevElements, newElement])
      setTextInput("")
      setQuantity((prevQuantity) => prevQuantity + 1)
      saveToHistory()
    }
  }

  const addArtElement = (art: ArtTemplate): void => {
    const designArea = getDesignArea(activeView)
    const newElement: DesignElement = {
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
    }
    setDesignElements((prevElements) => [...prevElements, newElement])
    setQuantity((prevQuantity) => prevQuantity + 1)
    saveToHistory()
  }

  const addQRCode = (): void => {
    const designArea = getDesignArea(activeView)
    const newElement: DesignElement = {
      id: Date.now(),
      type: "qr",
      content: "📱",
      x: designArea.x + 120,
      y: designArea.y + 120,
      fontSize: 30,
      rotation: 0,
      zIndex: designElements.length,
      view: activeView,
    }
    setDesignElements((prevElements) => [...prevElements, newElement])
    setQuantity((prevQuantity) => prevQuantity + 1)
    saveToHistory()
  }

  const deleteElement = (elementId: number): void => {
    setDesignElements((prevElements) => prevElements.filter((el) => el.id !== elementId))
    setSelectedElement(null)
    setQuantity((prevQuantity) => Math.max(0, prevQuantity - 1))
    saveToHistory()
  }

  const updateElement = (elementId: number, updates: Partial<DesignElement>): void => {
    setDesignElements((prevElements) => prevElements.map((el) => (el.id === elementId ? { ...el, ...updates } : el)))
  }

  const selectElement = (element: DesignElement): void => {
    setSelectedElement(element)
  }

  const clearAll = (): void => {
    setDesignElements([])
    setSelectedElement(null)
    setQuantity(0)
    saveToHistory()
  }

  const exportDesign = (): void => {
    const designData: DesignData = {
      product: selectedProduct,
      color: selectedColor,
      size: selectedSize,
      elements: designElements,
      view: activeView,
    }
    console.log("Design exported:", designData)
    alert("Thiết kế đã được lưu!")
  }

  const currentViewInfo = getViewInfo(activeView)

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Content style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <Row gutter={[16, 16]}>
          {/* Left Sidebar */}
          <Col span={6}>
            <Card style={{ borderRadius: "8px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
              <Tabs
                activeKey={activeTab}
                onChange={(key) => setActiveTab(key as TabType)}
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
                    <Slider min={12} max={48} onChange={(value) => setFontSize(value as number)} value={fontSize} />
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
                </div>
              )}
              {selectedTool === "art" && (
                <div style={{ padding: "16px", borderTop: "1px solid #e5e7eb", backgroundColor: "#f9fafb" }}>
                  <h3 style={{ fontWeight: 500, marginBottom: "12px", color: "#374151" }}>Chọn Art</h3>
                  <Row gutter={[8, 8]}>
                    {artTemplates.map((art) => (
                      <Col span={6} key={art.id}>
                        <Button
                          onClick={() => addArtElement(art)}
                          style={{ width: "100%", height: "auto", padding: "8px", fontSize: "24px" }}
                          title={art.name}
                        >
                          {art.emoji}
                        </Button>
                      </Col>
                    ))}
                  </Row>
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
                            e.stopPropagation()
                            selectElement(element)
                          }}
                          onMouseDown={(e) => {
                            e.preventDefault()
                            const rect = canvasRef.current?.getBoundingClientRect()
                            if (!rect) return
                            const startX = e.clientX - rect.left - element.x
                            const startY = e.clientY - rect.top - element.y

                            const handleMouseMove = (e: MouseEvent) => {
                              const newX = e.clientX - rect.left - startX
                              const newY = e.clientY - rect.top - startY
                              const designArea = getDesignArea(activeView)

                              // Allow movement within the full t-shirt area
                              const constrainedX = Math.max(
                                designArea.x,
                                Math.min(designArea.x + designArea.width - (element.width || 50), newX),
                              )
                              const constrainedY = Math.max(
                                designArea.y,
                                Math.min(designArea.y + designArea.height - (element.height || 50), newY),
                              )
                              updateElement(element.id, {
                                x: constrainedX,
                                y: constrainedY,
                              })
                            }

                            const handleMouseUp = () => {
                              document.removeEventListener("mousemove", handleMouseMove)
                              document.removeEventListener("mouseup", handleMouseUp)
                              saveToHistory()
                            }

                            document.addEventListener("mousemove", handleMouseMove)
                            document.addEventListener("mouseup", handleMouseUp)
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
                          {(element.type === "art" || element.type === "qr") && (
                            <div
                              style={{ fontSize: element.fontSize, filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.05))" }}
                            >
                              {element.content}
                            </div>
                          )}
                          {selectedElement?.id === element.id && (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteElement(element.id)
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
                    icon: (
                      <span role="img" aria-label="tshirt">
                        👕
                      </span>
                    ),
                  },
                  { key: "back", label: "Sau", icon: <UndoOutlined /> },
                  {
                    key: "left",
                    label: "Trái",
                    icon: (
                      <span role="img" aria-label="left">
                        👈
                      </span>
                    ),
                  },
                  {
                    key: "right",
                    label: "Phải",
                    icon: (
                      <span role="img" aria-label="right">
                        👉
                      </span>
                    ),
                  },
                ].map((view) => (
                  <Button
                    key={view.key}
                    type={activeView === view.key ? "primary" : "default"}
                    onClick={() => setActiveView(view.key as ViewType)}
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
              {/* Element Properties Panel */}
              {selectedElement &&
                (selectedElement.type === "text" ||
                  selectedElement.type === "art" ||
                  selectedElement.type === "qr" ||
                  selectedElement.type === "image") && (
                  <div style={{ padding: "16px", borderTop: "1px solid #e5e7eb", backgroundColor: "#f9fafb" }}>
                    <h3 style={{ fontWeight: 500, marginBottom: "12px", color: "#374151" }}>Thuộc tính Element</h3>
                    {selectedElement.type === "text" && (
                      <>
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
                            Nội dung:
                          </label>
                          <Input
                            value={selectedElement.content}
                            onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
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
                            Màu chữ:
                          </label>
                          <ColorPicker
                            value={selectedElement.color}
                            onChangeComplete={(color) =>
                              updateElement(selectedElement.id, { color: color.toHexString() })
                            }
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
                            Font chữ:
                          </label>
                          <Select
                            value={selectedElement.fontFamily}
                            onChange={(value) => updateElement(selectedElement.id, { fontFamily: value })}
                            style={{ width: "100%" }}
                          >
                            {fonts.map((font) => (
                              <Option key={font} value={font}>
                                {font}
                              </Option>
                            ))}
                          </Select>
                        </div>
                      </>
                    )}
                    {(selectedElement.type === "text" ||
                      selectedElement.type === "art" ||
                      selectedElement.type === "qr") && (
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
                        <Slider
                          min={10}
                          max={100}
                          onChange={(value) => updateElement(selectedElement.id, { fontSize: value as number })}
                          value={selectedElement.fontSize}
                        />
                        <span style={{ fontSize: "12px", color: "#6b7280" }}>{selectedElement.fontSize}px</span>
                      </div>
                    )}
                    {selectedElement.type === "image" && (
                      <>
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
                            Chiều rộng:
                          </label>
                          <Slider
                            min={50}
                            max={300}
                            onChange={(value) => updateElement(selectedElement.id, { width: value as number })}
                            value={selectedElement.width}
                          />
                          <span style={{ fontSize: "12px", color: "#6b7280" }}>{selectedElement.width}px</span>
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
                            Chiều cao:
                          </label>
                          <Slider
                            min={50}
                            max={300}
                            onChange={(value) => updateElement(selectedElement.id, { height: value as number })}
                            value={selectedElement.height}
                          />
                          <span style={{ fontSize: "12px", color: "#6b7280" }}>{selectedElement.height}px</span>
                        </div>
                      </>
                    )}
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
                        Xoay:
                      </label>
                      <Slider
                        min={0}
                        max={360}
                        onChange={(value) => updateElement(selectedElement.id, { rotation: value as number })}
                        value={selectedElement.rotation || 0}
                      />
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>{selectedElement.rotation || 0}°</span>
                    </div>
                    <Button
                      onClick={() => deleteElement(selectedElement.id)}
                      type="primary"
                      danger
                      block
                      icon={<DeleteOutlined />}
                    >
                      Xóa Element
                    </Button>
                  </div>
                )}
              {/* View Summary */}
              <div style={{ padding: "12px", backgroundColor: "#e0f2fe", borderRadius: "8px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 500, marginBottom: "8px", color: "#0369a1" }}>
                  Tổng quan thiết kế
                </h3>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "12px", color: "#075985" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Mặt trước:</span>
                    <span>{designElements.filter((el) => el.view === "front").length} elements</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>Mặt sau:</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <span>{designElements.filter((el) => el.view === "back").length} elements</span>
                      <span style={{ color: "#16a34a" }}>📏</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Bên trái:</span>
                    <span>{designElements.filter((el) => el.view === "left").length} elements</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Bên phải:</span>
                    <span>{designElements.filter((el) => el.view === "right").length} elements</span>
                  </div>
                </div>
                <div style={{ marginTop: "8px", paddingTop: "8px", borderTop: "1px solid #bfdbfe" }}>
                  <div style={{ fontSize: "12px", color: "#16a34a", fontWeight: 500 }}>
                    ✨ {activeView === "back" ? "Mặt sau: Mở rộng lên cổ áo" : "Khu vực thiết kế: Toàn bộ áo"}
                  </div>
                </div>
              </div>
              {/* Additional Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                >
                  <span style={{ fontSize: "14px", color: "#4b5563" }}>Màu đã được sử dụng</span>
                  <Button type="text" icon={<BgColorsOutlined />} style={{ color: "#9ca3af" }} />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                >
                  <span style={{ fontSize: "14px", color: "#4b5563" }}>Kích thước màn hình</span>
                  <Button type="text" icon={<DesktopOutlined />} style={{ color: "#9ca3af" }} />
                </div>
              </div>
              {/* Cart Info */}
              <div style={{ padding: "12px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
                <div
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "14px" }}
                >
                  <span style={{ color: "#4b5563" }}>Trung bình:</span>
                  <span style={{ fontWeight: 500 }}>{quantity} / Sản phẩm</span>
                </div>
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
  )
}

export default TshirtDesigner

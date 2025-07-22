"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { Card, Form, Input, Button, Typography, message } from "antd"
import { useNavigate } from "react-router-dom"
import { login } from "../redux/authSlice"
import type { AppDispatch } from "../redux/store"
import { UserOutlined, LockOutlined } from "@ant-design/icons"

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      await dispatch(login(values)).unwrap()
      message.success("Đăng nhập thành công!")
      navigate("/")
    } catch (error: any) {
      message.error(error.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.")
      console.error("Login failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh", padding: "24px" }}
    >
      <Card style={{ width: 400, padding: "20px", borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <Typography.Title level={2} style={{ textAlign: "center", marginBottom: "24px", color: "#E4002B" }}>
          Đăng nhập
        </Typography.Title>
        <Form name="login" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email của bạn!" },
              { type: "email", message: "Vui lòng nhập đúng định dạng email!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu của bạn!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading} style={{ height: 40, fontSize: 16 }}>
              Đăng nhập
            </Button>
          </Form.Item>
          <Typography.Text style={{ textAlign: "center", display: "block" }}>
            Chưa có tài khoản?{" "}
            <a onClick={() => navigate("/register")} style={{ color: "#E4002B", fontWeight: "bold" }}>
              Đăng ký ngay!
            </a>
          </Typography.Text>
        </Form>
      </Card>
    </div>
  )
}

export default LoginPage

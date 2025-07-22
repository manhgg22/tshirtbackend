"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { Card, Form, Input, Button, Typography, message } from "antd"
import { useNavigate } from "react-router-dom"
import { register } from "../redux/authSlice"
import type { AppDispatch } from "../redux/store"
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons"

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      await dispatch(register(values)).unwrap()
      message.success("Đăng ký thành công! Vui lòng đăng nhập.")
      navigate("/login")
    } catch (error: any) {
      message.error(error.message || "Đăng ký thất bại. Vui lòng thử lại.")
      console.error("Registration failed:", error)
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
          Đăng ký
        </Typography.Title>
        <Form name="register" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Tên của bạn"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên của bạn!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Tên của bạn" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email của bạn!" },
              { type: "email", message: "Vui lòng nhập đúng định dạng email!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu của bạn!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu của bạn!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"))
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading} style={{ height: 40, fontSize: 16 }}>
              Đăng ký
            </Button>
          </Form.Item>
          <Typography.Text style={{ textAlign: "center", display: "block" }}>
            Đã có tài khoản?{" "}
            <a onClick={() => navigate("/login")} style={{ color: "#E4002B", fontWeight: "bold" }}>
              Đăng nhập ngay!
            </a>
          </Typography.Text>
        </Form>
      </Card>
    </div>
  )
}

export default RegisterPage

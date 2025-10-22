// Trang quản lý Webhook Logs cho Admin Dashboard
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Card, 
  Tag, 
  Button, 
  Space, 
  Input, 
  Select, 
  DatePicker, 
  message,
  Modal,
  Descriptions,
  Badge,
  Tooltip,
  Typography
} from 'antd';
import { 
  ReloadOutlined, 
  EyeOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import axios from 'axios';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Text, Paragraph } = Typography;

const WebhookLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0
  });
  const [filters, setFilters] = useState({
    status: '',
    orderCode: '',
    dateRange: null
  });
  const [selectedLog, setSelectedLog] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchLogs = async (page = 1, pageSize = 20) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: pageSize,
        ...filters
      };

      const response = await axios.get('/api/webhooks/logs', { params });
      setLogs(response.data.data);
      setPagination({
        current: response.data.pagination.page,
        pageSize: response.data.pagination.limit,
        total: response.data.pagination.total
      });
    } catch (error) {
      message.error('Lỗi khi tải webhook logs');
      console.error('Fetch logs error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [filters]);

  const handleTableChange = (pagination) => {
    fetchLogs(pagination.current, pagination.pageSize);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleRefresh = () => {
    fetchLogs(pagination.current, pagination.pageSize);
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      success: { color: 'green', icon: <CheckCircleOutlined /> },
      error: { color: 'red', icon: <CloseCircleOutlined /> },
      order_not_found: { color: 'orange', icon: <ExclamationCircleOutlined /> },
      already_paid: { color: 'blue', icon: <CheckCircleOutlined /> },
      amount_mismatch: { color: 'red', icon: <ExclamationCircleOutlined /> },
      pending: { color: 'yellow', icon: <ClockCircleOutlined /> }
    };

    const config = statusConfig[status] || { color: 'default', icon: null };
    
    return (
      <Tag color={config.color} icon={config.icon}>
        {status.toUpperCase()}
      </Tag>
    );
  };

  const columns = [
    {
      title: 'Webhook ID',
      dataIndex: 'webhookId',
      key: 'webhookId',
      width: 150,
      render: (id) => (
        <Text code copyable={{ text: id }}>
          {id.substring(0, 20)}...
        </Text>
      )
    },
    {
      title: 'Thời gian',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (date) => new Date(date).toLocaleString('vi-VN')
    },
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderCode',
      key: 'orderCode',
      width: 120,
      render: (code) => code ? (
        <Text strong>{code}</Text>
      ) : (
        <Text type="secondary">N/A</Text>
      )
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      render: (amount) => amount ? (
        <Text strong style={{ color: '#52c41a' }}>
          {amount.toLocaleString('vi-VN')} VND
        </Text>
      ) : (
        <Text type="secondary">N/A</Text>
      )
    },
    {
      title: 'Tài khoản NH',
      dataIndex: 'bankAccount',
      key: 'bankAccount',
      width: 150,
      render: (account) => account || <Text type="secondary">N/A</Text>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: getStatusTag
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 100,
      render: (_, record) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => {
                setSelectedLog(record);
                setModalVisible(true);
              }}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>🔔 Webhook Logs - SePay Integration</span>
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={handleRefresh}
              loading={loading}
            >
              Làm mới
            </Button>
          </div>
        }
      >
        {/* Filters */}
        <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Search
            placeholder="Tìm theo mã đơn hàng"
            style={{ width: 200 }}
            value={filters.orderCode}
            onChange={(e) => handleFilterChange('orderCode', e.target.value)}
            onSearch={() => fetchLogs()}
          />
          
          <Select
            placeholder="Trạng thái"
            style={{ width: 150 }}
            value={filters.status}
            onChange={(value) => handleFilterChange('status', value)}
            allowClear
          >
            <Option value="success">Thành công</Option>
            <Option value="error">Lỗi</Option>
            <Option value="order_not_found">Không tìm thấy đơn</Option>
            <Option value="already_paid">Đã thanh toán</Option>
            <Option value="amount_mismatch">Sai số tiền</Option>
          </Select>

          <RangePicker
            placeholder={['Từ ngày', 'Đến ngày']}
            style={{ width: 250 }}
            onChange={(dates) => handleFilterChange('dateRange', dates)}
          />
        </div>

        {/* Stats */}
        <div style={{ marginBottom: '16px', display: 'flex', gap: '16px' }}>
          <Badge count={logs.filter(log => log.status === 'success').length} showZero>
            <Tag color="green">Thành công</Tag>
          </Badge>
          <Badge count={logs.filter(log => log.status === 'error').length} showZero>
            <Tag color="red">Lỗi</Tag>
          </Badge>
          <Badge count={logs.filter(log => log.status === 'order_not_found').length} showZero>
            <Tag color="orange">Không tìm thấy đơn</Tag>
          </Badge>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={logs}
          rowKey="_id"
          loading={loading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} của ${total} webhook logs`
          }}
          onChange={handleTableChange}
          scroll={{ x: 1000 }}
        />
      </Card>

      {/* Detail Modal */}
      <Modal
        title="Chi tiết Webhook Log"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Đóng
          </Button>
        ]}
        width={800}
      >
        {selectedLog && (
          <div>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Webhook ID" span={2}>
                <Text code copyable={{ text: selectedLog.webhookId }}>
                  {selectedLog.webhookId}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Thời gian">
                {new Date(selectedLog.createdAt).toLocaleString('vi-VN')}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                {getStatusTag(selectedLog.status)}
              </Descriptions.Item>
              <Descriptions.Item label="Mã đơn hàng">
                {selectedLog.orderCode || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Số tiền">
                {selectedLog.amount ? `${selectedLog.amount.toLocaleString('vi-VN')} VND` : 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Tài khoản NH">
                {selectedLog.bankAccount || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Transaction ID">
                {selectedLog.transactionId || 'N/A'}
              </Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: '16px' }}>
              <Text strong>Request Body:</Text>
              <Paragraph>
                <pre style={{ 
                  background: '#f5f5f5', 
                  padding: '12px', 
                  borderRadius: '4px',
                  maxHeight: '200px',
                  overflow: 'auto'
                }}>
                  {JSON.stringify(selectedLog.requestBody, null, 2)}
                </pre>
              </Paragraph>
            </div>

            {selectedLog.error && (
              <div style={{ marginTop: '16px' }}>
                <Text strong style={{ color: '#ff4d4f' }}>Lỗi:</Text>
                <Paragraph style={{ color: '#ff4d4f' }}>
                  {selectedLog.error}
                </Paragraph>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default WebhookLogsPage;

import express from 'express';

const router = express.Router();

// Danh sách tỉnh thành phố Việt Nam
const vietnamCities = [
  { code: '01', name: 'TP. Hồ Chí Minh', type: 'Thành phố Trung ương' },
  { code: '02', name: 'Hà Nội', type: 'Thành phố Trung ương' },
  { code: '03', name: 'Đà Nẵng', type: 'Thành phố Trung ương' },
  { code: '04', name: 'Cần Thơ', type: 'Thành phố Trung ương' },
  { code: '05', name: 'Hải Phòng', type: 'Thành phố Trung ương' },
  { code: '06', name: 'An Giang', type: 'Tỉnh' },
  { code: '07', name: 'Bà Rịa - Vũng Tàu', type: 'Tỉnh' },
  { code: '08', name: 'Bạc Liêu', type: 'Tỉnh' },
  { code: '09', name: 'Bắc Kạn', type: 'Tỉnh' },
  { code: '10', name: 'Bắc Giang', type: 'Tỉnh' },
  { code: '11', name: 'Bắc Ninh', type: 'Tỉnh' },
  { code: '12', name: 'Bến Tre', type: 'Tỉnh' },
  { code: '13', name: 'Bình Định', type: 'Tỉnh' },
  { code: '14', name: 'Bình Dương', type: 'Tỉnh' },
  { code: '15', name: 'Bình Phước', type: 'Tỉnh' },
  { code: '16', name: 'Bình Thuận', type: 'Tỉnh' },
  { code: '17', name: 'Cà Mau', type: 'Tỉnh' },
  { code: '18', name: 'Cao Bằng', type: 'Tỉnh' },
  { code: '19', name: 'Đắk Lắk', type: 'Tỉnh' },
  { code: '20', name: 'Đắk Nông', type: 'Tỉnh' },
  { code: '21', name: 'Điện Biên', type: 'Tỉnh' },
  { code: '22', name: 'Đồng Nai', type: 'Tỉnh' },
  { code: '23', name: 'Đồng Tháp', type: 'Tỉnh' },
  { code: '24', name: 'Gia Lai', type: 'Tỉnh' },
  { code: '25', name: 'Hà Giang', type: 'Tỉnh' },
  { code: '26', name: 'Hà Nam', type: 'Tỉnh' },
  { code: '27', name: 'Hà Tĩnh', type: 'Tỉnh' },
  { code: '28', name: 'Hải Dương', type: 'Tỉnh' },
  { code: '29', name: 'Hậu Giang', type: 'Tỉnh' },
  { code: '30', name: 'Hòa Bình', type: 'Tỉnh' },
  { code: '31', name: 'Hưng Yên', type: 'Tỉnh' },
  { code: '32', name: 'Khánh Hòa', type: 'Tỉnh' },
  { code: '33', name: 'Kiên Giang', type: 'Tỉnh' },
  { code: '34', name: 'Kon Tum', type: 'Tỉnh' },
  { code: '35', name: 'Lai Châu', type: 'Tỉnh' },
  { code: '36', name: 'Lâm Đồng', type: 'Tỉnh' },
  { code: '37', name: 'Lạng Sơn', type: 'Tỉnh' },
  { code: '38', name: 'Lào Cai', type: 'Tỉnh' },
  { code: '39', name: 'Long An', type: 'Tỉnh' },
  { code: '40', name: 'Nam Định', type: 'Tỉnh' },
  { code: '41', name: 'Nghệ An', type: 'Tỉnh' },
  { code: '42', name: 'Ninh Bình', type: 'Tỉnh' },
  { code: '43', name: 'Ninh Thuận', type: 'Tỉnh' },
  { code: '44', name: 'Phú Thọ', type: 'Tỉnh' },
  { code: '45', name: 'Phú Yên', type: 'Tỉnh' },
  { code: '46', name: 'Quảng Bình', type: 'Tỉnh' },
  { code: '47', name: 'Quảng Nam', type: 'Tỉnh' },
  { code: '48', name: 'Quảng Ngãi', type: 'Tỉnh' },
  { code: '49', name: 'Quảng Ninh', type: 'Tỉnh' },
  { code: '50', name: 'Quảng Trị', type: 'Tỉnh' },
  { code: '51', name: 'Sóc Trăng', type: 'Tỉnh' },
  { code: '52', name: 'Sơn La', type: 'Tỉnh' },
  { code: '53', name: 'Tây Ninh', type: 'Tỉnh' },
  { code: '54', name: 'Thái Bình', type: 'Tỉnh' },
  { code: '55', name: 'Thái Nguyên', type: 'Tỉnh' },
  { code: '56', name: 'Thanh Hóa', type: 'Tỉnh' },
  { code: '57', name: 'Thừa Thiên Huế', type: 'Tỉnh' },
  { code: '58', name: 'Tiền Giang', type: 'Tỉnh' },
  { code: '59', name: 'Trà Vinh', type: 'Tỉnh' },
  { code: '60', name: 'Tuyên Quang', type: 'Tỉnh' },
  { code: '61', name: 'Vĩnh Long', type: 'Tỉnh' },
  { code: '62', name: 'Vĩnh Phúc', type: 'Tỉnh' },
  { code: '63', name: 'Yên Bái', type: 'Tỉnh' }
];

// API lấy danh sách tỉnh thành phố
router.get('/cities', (req, res) => {
  try {
    res.json({
      success: true,
      data: vietnamCities,
      total: vietnamCities.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi lấy danh sách tỉnh thành phố',
      error: error.message
    });
  }
});

// API lấy thông tin tỉnh thành phố theo code
router.get('/cities/:code', (req, res) => {
  try {
    const { code } = req.params;
    const city = vietnamCities.find(c => c.code === code);
    
    if (!city) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy tỉnh thành phố'
      });
    }
    
    res.json({
      success: true,
      data: city
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi lấy thông tin tỉnh thành phố',
      error: error.message
    });
  }
});

export default router;


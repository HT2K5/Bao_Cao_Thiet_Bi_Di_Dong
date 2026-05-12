Cập nhật địa chỉ IP trong các file cấu hình API:

src/config/api.js (nếu có)
Hoặc tìm và thay thế 192.168.1.101 bằng IP của bạn






## Hướng dẫn chạy project
Khởi động Backend

Mở XAMPP/WAMP và start Apache + MySQL
Kiểm tra API hoạt động:

Categories: http://[YOUR_IP]/farmdirect/api/get-categories.php
Products: http://[YOUR_IP]/farmdirect/api/get-products.php



Chạy ứng dụng
Khởi động Expo:
bashnpm start
Chạy trên Android:
bashnpm run android
Chạy trên iOS:
bashnpm run ios
Chạy trên Web:
bashnpm run web
Chạy trên thiết bị thật:

Cài đặt app Expo Go trên điện thoại
Quét QR code từ terminal/browser
Đảm bảo điện thoại và máy tính cùng mạng WiFi

## Ghi chú

Dữ liệu sản phẩm và danh mục được lấy từ PHP API
Giỏ hàng và đơn hàng được quản lý bằng Context API (chỉ tồn tại trong runtime)
Tài khoản đăng nhập/đăng ký lưu bằng AsyncStorage trên thiết bị
Một số dữ liệu phụ (banner, phương thức thanh toán,...) nằm trong tempdata.js
Khi chạy trên máy hoặc mạng khác, cần cập nhật địa chỉ IP API


## Demo Video
https://drive.google.com/file/d/1jgw8tJ7yzJ37x7iBH_TQz-nL1UOxSGPi/view

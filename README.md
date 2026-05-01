# Trần Minh Hiếu - Shopping Cart - Checkout - UserProfile 
# Báo Cáo Thiết Bị Di Động

## Thành viên nhóm
- **Trần Minh Hiếu** - Shopping Cart, Checkout, User Profile

---

## Chức năng được phát triển

### 1. 🛒 Shopping Cart (Giỏ hàng)
**Màn hình:** `CartScreen.js`

**Tính năng:**
- Hiển thị danh sách sản phẩm trong giỏ hàng
- Tăng/giảm số lượng sản phẩm
- Xóa sản phẩm khỏi giỏ (2 cách):
  - Tap nút X ở góc phải
  - Swipe sang phải để xóa
- Nhập mã khuyến mãi
- Tính tổng tiền tự động (Tạm tính + Phí vận chuyển + Hỗ trợ nông dân)
- Thanh toán bảo mật

**Screenshots:**

<img width="1284" height="2778" alt="image" src="https://github.com/user-attachments/assets/89943091-ef1c-4951-aff7-db560d8ecd28" />
<img width="1284" height="2778" alt="image" src="https://github.com/user-attachments/assets/c54afeed-f5aa-4e35-9f67-9eeed0aebad6" />


### 2. 💳 Checkout (Thanh toán)
**Màn hình:** `CheckOutScreen.js`

**Tính năng:**
- Chọn địa chỉ giao hàng (Modal popup)
  - Danh sách địa chỉ đã lưu
  - Thêm địa chỉ mới
- Chọn phương thức giao hàng:
  - Tiêu chuẩn (Miễn phí)
  - Giao nhanh (+$5.00)
- Chọn phương thức thanh toán:
  - Thẻ tín dụng
  - MoMo Wallet
  - Thanh toán khi nhận hàng (COD)
- Tóm tắt đơn hàng với thuế
- Nút đặt hàng

**Screenshots:**

<img width="1284" height="2778" alt="image" src="https://github.com/user-attachments/assets/96320159-74d7-4da6-85a3-0e33f18687cf" />
<img width="1284" height="2778" alt="image" src="https://github.com/user-attachments/assets/789c4472-8f87-4be9-b4de-a1fd0cec7689" />


---

### 3. 👤 User Profile (Trang cá nhân)
**Màn hình:** `ProfileScreen.js`

**Tính năng:**
- Thay đổi ảnh đại diện:
  - Tap vào avatar → chọn ảnh từ thư viện
  - Icon camera để chỉnh sửa
- Chỉnh sửa tên người dùng:
  - Tap vào tên → nhập tên mới
  - Nút Hủy/Lưu
- Hiển thị email
- Badge xác thực người dùng
- Menu:
  - Lịch sử đơn hàng
  - Địa chỉ đã lưu
  - Cài đặt
  - Đăng xuất

**Screenshots:**

<img width="1284" height="2778" alt="image" src="https://github.com/user-attachments/assets/9ed85bf6-b8e0-4804-b0f2-3ba9df191748" />


---

## Công nghệ sử dụng

- **React Native** - Framework
- **Expo** - Development platform
- **React Navigation** - Điều hướng
  - Stack Navigator
  - Bottom Tab Navigator
- **expo-image-picker** - Chọn ảnh từ thư viện
- **react-native-gesture-handler** - Swipe gestures

---


## Video Demo


https://github.com/user-attachments/assets/f2ff54b6-e128-4778-b1d3-85e50356fcf1






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

<img width="1284" height="2778" alt="image" src="https://github.com/user-attachments/assets/507b5fc3-fb23-43f9-9620-ecdd336aee89" />
(<img width="1284" height="2778" alt="image" src="https://github.com/user-attachments/assets/e7460ae3-c08e-43d4-915a-24a39ad70a94" />


---

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

<img width="1284" height="2778" alt="image" src="https://github.com/user-attachments/assets/9c975132-7370-4ad9-b3ee-6d9579c2220e" />
<img width="1284" height="2778" alt="image" src="https://github.com/user-attachments/assets/d7b24c9f-40f8-4fa3-8669-0425aab88132" />

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
  - Ưu đãi của tôi (hiển thị điểm)
  - Cài đặt
  - Đăng xuất

**Screenshots:**

<img width="1284" height="2778" alt="image" src="https://github.com/user-attachments/assets/8a3d010a-8128-4ec0-b1f2-77acfc310cb5" />

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
## Demo


https://github.com/user-attachments/assets/66e23bed-e12c-457e-9f2a-245eb8c47aee


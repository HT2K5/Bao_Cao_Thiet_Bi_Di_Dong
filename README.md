# FarmDirect

FarmDirect là ứng dụng bán nông sản được xây dựng bằng React Native và Expo. Ứng dụng cho phép người dùng xem sản phẩm theo danh mục, tìm kiếm sản phẩm, xem chi tiết sản phẩm, thêm vào giỏ hàng, thanh toán, theo dõi đơn hàng và quản lý thông tin cá nhân.

## Thành viên và phân công công việc

### Công

Phụ trách luồng danh mục và sản phẩm:

- `src/screens/CategoryScreen.js`
- `src/screens/ProductListing.js`
- `src/screens/ProductDetail.js`

Các chức năng đã thực hiện:

- Xây dựng màn hình danh mục sản phẩm.
- Gọi API lấy danh mục và sản phẩm.
- Lọc sản phẩm theo danh mục đang chọn.
- Gom sản phẩm theo nhóm để hiển thị trên màn hình danh mục.
- Tìm kiếm sản phẩm và điều hướng sang danh sách kết quả.
- Xây dựng màn hình danh sách sản phẩm theo danh mục, nhóm hoặc từ khóa.
- Tạo chip lọc sản phẩm theo tên.
- Hiển thị sản phẩm nổi bật và danh sách sản phẩm dạng lưới.
- Điều hướng sang màn hình chi tiết sản phẩm.
- Xây dựng màn hình chi tiết sản phẩm.
- Hiển thị ảnh, tên, giá, mô tả, thông tin nông trại và dinh dưỡng.
- Tạo chức năng chọn số lượng và thêm sản phẩm vào giỏ hàng.

### Hiền

Phụ trách luồng mở đầu, đăng nhập, đăng ký và trang chủ:

- `src/screens/Onboarding.js`
- `src/screens/LoginAndSignUp.js`
- `src/screens/HomeScreen.js`

Các chức năng đã thực hiện:

- Xây dựng màn hình onboarding giới thiệu ứng dụng.
- Điều hướng từ onboarding sang màn hình đăng nhập/đăng ký.
- Xây dựng giao diện đăng nhập và đăng ký.
- Validate email, mật khẩu và nhập lại mật khẩu.
- Lưu tài khoản và trạng thái đăng nhập bằng AsyncStorage.
- Kiểm tra trạng thái đăng nhập để chuyển vào màn hình chính.
- Xây dựng màn hình trang chủ.
- Gọi API lấy danh sách sản phẩm.
- Hiển thị banner, danh mục, sản phẩm nổi bật và danh sách sản phẩm.
- Tìm kiếm sản phẩm trên trang chủ.
- Điều hướng từ trang chủ sang danh sách hoặc chi tiết sản phẩm.

### Hiếu

Phụ trách các màn hình còn lại:

- `src/screens/CartScreen.js`
- `src/screens/CheckOutScreen.js`
- `src/screens/OrderScreen.js`
- `src/screens/ProfileScreen.js`

Các chức năng đã thực hiện:

- Xây dựng màn hình giỏ hàng.
- Hiển thị danh sách sản phẩm trong giỏ.
- Cho phép xóa sản phẩm và cập nhật số lượng sản phẩm.
- Tính tạm tính, phí vận chuyển, hỗ trợ và tổng tiền.
- Xây dựng màn hình thanh toán.
- Chọn địa chỉ, phương thức giao hàng và phương thức thanh toán.
- Xử lý đặt hàng thành công.
- Xây dựng màn hình lịch sử đơn hàng.
- Xây dựng màn hình hồ sơ cá nhân.
- Cập nhật ảnh đại diện, đổi tên hiển thị và đăng xuất.

### Phần làm chung

Các phần ngoài màn hình được cả nhóm cùng thực hiện và chỉnh sửa:

- `src/navigation/RootNavigator.js`
- `src/navigation/BottomTab.js`
- `src/navigation/CategoryStack.js`
- `src/context/CartContext.js`
- `src/context/OrderContext.js`
- `src/context/UserContext.js`
- `src/components/`
- `src/data/tempdata.js`
- `src/config/`
- `assets/`
- `database/farmdirect.sql`
- `farmdirect/api/`

Nội dung làm chung:

- Cấu hình điều hướng toàn ứng dụng.
- Xây dựng bottom tab cho các màn hình chính.
- Kết nối các màn hình với nhau bằng React Navigation.
- Quản lý dữ liệu giỏ hàng, đơn hàng và người dùng bằng Context API.
- Xây dựng các component dùng lại như card sản phẩm và card đơn hàng.
- Chuẩn bị dữ liệu tạm, hình ảnh, icon và tài nguyên giao diện.
- Chuẩn bị database và PHP API để lấy danh mục, sản phẩm.
- Kiểm tra luồng hoạt động giữa các màn hình.

## Chức năng chính của ứng dụng

- Onboarding giới thiệu ứng dụng.
- Đăng ký và đăng nhập tài khoản.
- Trang chủ hiển thị sản phẩm và danh mục nổi bật.
- Xem danh mục sản phẩm.
- Xem danh sách sản phẩm theo danh mục, nhóm hoặc từ khóa.
- Xem chi tiết sản phẩm.
- Thêm sản phẩm vào giỏ hàng.
- Cập nhật số lượng hoặc xóa sản phẩm trong giỏ.
- Thanh toán đơn hàng.
- Lưu và hiển thị lịch sử đơn hàng.
- Quản lý hồ sơ cá nhân.
- Đăng xuất tài khoản.

## Luồng sử dụng

1. Người dùng mở ứng dụng và xem màn hình onboarding.
2. Người dùng đăng ký hoặc đăng nhập.
3. Sau khi đăng nhập, ứng dụng chuyển vào màn hình chính.
4. Người dùng xem sản phẩm ở trang chủ hoặc danh mục.
5. Người dùng chọn sản phẩm để xem chi tiết.
6. Người dùng thêm sản phẩm vào giỏ hàng.
7. Người dùng kiểm tra giỏ hàng và tiến hành thanh toán.
8. Sau khi đặt hàng, đơn hàng được lưu vào lịch sử đơn hàng.
9. Người dùng có thể xem hồ sơ cá nhân hoặc đăng xuất.


📱 Screenshots


Giao diện Onboarding
<img width="1125" height="2436" alt="image" src="https://github.com/user-attachments/assets/8e129069-8e24-4e86-af83-f2495605c318" />
Giao diện đăng ký
<img width="1125" height="2436" alt="image" src="https://github.com/user-attachments/assets/113031e1-4570-4151-a45b-c0de7252dfd9" />
Giao diện đăng nhập
<img width="1125" height="2436" alt="image" src="https://github.com/user-attachments/assets/e89aeab8-d243-4a03-aea7-cb44fe4e988e" />
Giao diện trang chủ
<img width="1125" height="2436" alt="image" src="https://github.com/user-attachments/assets/177a6208-b3a8-416e-a3b5-d3a1eb7bcb16" />
Giao diện Categories
<img width="1125" height="2436" alt="image" src="https://github.com/user-attachments/assets/f9e0693b-b745-4825-b77f-3022c6367324" />
Giao diện Product Listing
<img width="357" height="748" alt="image" src="https://github.com/user-attachments/assets/2442b4a1-54dc-407c-838d-ad16488ebae8" />
Product Detail
<img width="1125" height="2436" alt="image" src="https://github.com/user-attachments/assets/e914495b-cead-4438-b208-0045ea5d608e" />
Giao diện Shopping Cart
<img width="1125" height="2436" alt="image" src="https://github.com/user-attachments/assets/25e5885b-0592-468f-a03a-77c6977a755b" />
Giao diện Checkout
<img width="1125" height="2436" alt="image" src="https://github.com/user-attachments/assets/13a2ec61-6124-4919-b8fd-beaf2e3e84bb" />
Giao diện theo dõi đơn hàng
<img width="1125" height="2436" alt="image" src="https://github.com/user-attachments/assets/fe41f33d-02eb-4291-932e-06a6365459b9" />
Giao diện Profile
<img width="1125" height="2436" alt="image" src="https://github.com/user-attachments/assets/9ddd0e46-f921-4b47-ad8e-34475bef2381" />

## Công nghệ sử dụng

- React Native
- Expo
- React Navigation
- React Context API
- AsyncStorage
- Expo Image Picker
- React Native Gesture Handler
- Ionicons
- PHP API nội bộ
- MySQL database
## API sử dụng

Ứng dụng đang lấy dữ liệu danh mục và sản phẩm từ API nội bộ:

- `http://192.168.1.101/farmdirect/api/get-categories.php`
- `http://192.168.1.101/farmdirect/api/get-products.php`

Khi chạy trên máy hoặc mạng khác, cần đổi địa chỉ IP API cho đúng với môi trường đang sử dụng.

## Cách chạy dự án

Cài dependencies:

```bash
npm install
```

Chạy ứng dụng:

```bash
npm start
```

Chạy trên Android:

```bash
npm run android
```

Chạy trên iOS:

```bash
npm run ios
```

Chạy trên web:

```bash
npm run web
```

## Ghi chú

- Dữ liệu sản phẩm và danh mục được lấy từ PHP API.
- Giỏ hàng và đơn hàng được quản lý bằng Context API trong runtime của ứng dụng.
- Tài khoản đăng nhập/đăng ký đang được lưu bằng AsyncStorage.
- Một số dữ liệu phụ như danh mục trang chủ, sản phẩm nổi bật, phương thức giao hàng và thanh toán nằm trong `src/data/tempdata.js`.


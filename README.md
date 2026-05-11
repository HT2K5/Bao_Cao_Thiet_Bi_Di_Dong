# FarmDirect - Mô tả công việc

## Giới thiệu

FarmDirect là ứng dụng React Native/Expo hỗ trợ người dùng xem danh mục nông sản, duyệt danh sách sản phẩm theo nhóm và xem thông tin chi tiết từng sản phẩm trước khi thêm vào giỏ hàng.

## Phần công việc đã thực hiện

Tôi phụ trách xây dựng 3 màn hình chính trong luồng xem sản phẩm:

- `src/screens/CategoryScreen.js`
- `src/screens/ProductListing.js`
- `src/screens/ProductDetail.js`

## 1. CategoryScreen

File: `src/screens/CategoryScreen.js`

Chức năng đã làm:

- Gọi API lấy danh sách danh mục từ `get-categories.php`.
- Gọi API lấy danh sách sản phẩm từ `get-products.php`.
- Hiển thị danh mục ở sidebar bên trái.
- Cho phép chọn danh mục đang active.
- Lọc sản phẩm theo danh mục đang chọn.
- Gom sản phẩm theo `group_name` để hiển thị mỗi nhóm một lần.
- Hiển thị ảnh đại diện và tên nhóm sản phẩm.
- Tìm kiếm sản phẩm bằng ô search.
- Điều hướng sang màn hình `ProductListing` khi người dùng chọn nhóm sản phẩm hoặc nhập từ khóa tìm kiếm.

## 2. ProductListing

File: `src/screens/ProductListing.js`

Chức năng đã làm:

- Nhận tham số điều hướng gồm `category`, `group`, `keyword`.
- Gọi API lấy danh sách sản phẩm.
- Lọc sản phẩm theo:
  - Từ khóa tìm kiếm.
  - Danh mục.
  - Nhóm sản phẩm.
  - Chip lọc theo tên sản phẩm.
- Hiển thị tổng số sản phẩm tìm thấy.
- Hiển thị sản phẩm nổi bật đầu tiên bằng card lớn.
- Hiển thị các sản phẩm còn lại dạng lưới 2 cột bằng card nhỏ.
- Xử lý trạng thái không tìm thấy sản phẩm.
- Điều hướng sang màn hình `ProductDetail` khi bấm vào sản phẩm.
- Tích hợp chức năng thêm sản phẩm vào giỏ hàng thông qua `CartContext`.

## 3. ProductDetail

File: `src/screens/ProductDetail.js`

Chức năng đã làm:

- Nhận dữ liệu sản phẩm từ màn hình `ProductListing`.
- Hiển thị ảnh sản phẩm lớn ở phần đầu màn hình.
- Hiển thị tên sản phẩm, giá, đơn vị bán, nhãn chứng nhận và thông tin nông trại.
- Hiển thị mô tả sản phẩm và thông tin dinh dưỡng.
- Tạo bộ điều chỉnh số lượng sản phẩm.
- Cho phép tăng/giảm số lượng, tối thiểu là 1.
- Thêm sản phẩm vào giỏ hàng theo đúng số lượng đã chọn.
- Sau khi thêm vào giỏ, điều hướng người dùng sang màn hình `Cart`.
- Có nút quay lại màn hình trước đó.

## Luồng hoạt động

1. Người dùng vào màn hình danh mục.
2. Ứng dụng tải danh mục và sản phẩm từ API.
3. Người dùng chọn một danh mục hoặc tìm kiếm sản phẩm.
4. Ứng dụng chuyển sang màn hình danh sách sản phẩm.
5. Người dùng chọn một sản phẩm để xem chi tiết.
6. Người dùng chọn số lượng và thêm sản phẩm vào giỏ hàng.

## Công nghệ sử dụng

- React Native
- Expo
- React Navigation
- React Context API
- Ionicons
- PHP API nội bộ

## Cách chạy dự án

Cài dependencies:

```bash
npm install
```

Chạy ứng dụng:

```bash
npm start
```

Hoặc chạy trực tiếp trên Android:

```bash
npm run android
```

## Ghi chú

Các màn hình đang sử dụng API nội bộ với địa chỉ:

- `http://192.168.1.101/farmdirect/api/get-categories.php`
- `http://192.168.1.101/farmdirect/api/get-products.php`

Khi chạy trên máy khác hoặc mạng khác, cần đổi địa chỉ IP API cho phù hợp với môi trường đang sử dụng.

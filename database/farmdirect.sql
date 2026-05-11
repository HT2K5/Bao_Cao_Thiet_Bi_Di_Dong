-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 08, 2026 lúc 07:13 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `farmdirect`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `icon` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `icon`) VALUES
(1, 'Fruits', 'nutrition'),
(2, 'Vegetables', 'leaf'),
(3, 'Milk', 'water');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nutrition_values`
--

CREATE TABLE `nutrition_values` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `label` varchar(100) NOT NULL,
  `value` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `nutrition_values`
--

INSERT INTO `nutrition_values` (`id`, `product_id`, `label`, `value`) VALUES
(1, 1, 'Calories', '47 Kcal'),
(2, 1, 'Vitamin C', '53mg'),
(3, 1, 'Fiber', '2.4g'),
(4, 2, 'Calories', '52 Kcal'),
(5, 2, 'Carbs', '14g'),
(6, 2, 'Fiber', '2.4g'),
(7, 3, 'Vitamin C', '58mg'),
(8, 3, 'Fiber', '3g'),
(9, 4, 'Calories', '69 Kcal'),
(10, 5, 'Vitamin A', '54 IU'),
(11, 6, 'Iron', '2.7mg'),
(12, 7, 'Vitamin A', '835µg'),
(13, 10, 'Protein', '8g'),
(14, 11, 'Calcium', '300mg'),
(15, 12, 'Fiber', '2g');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `payment_method` varchar(100) DEFAULT NULL,
  `shipping_address` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `group_name` varchar(100) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `rating` decimal(2,1) DEFAULT 0.0,
  `origin` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `unit` varchar(100) DEFAULT NULL,
  `stock` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `category_id`, `group_name`, `name`, `price`, `rating`, `origin`, `image`, `unit`, `stock`, `created_at`) VALUES
(1, 1, 'Cam', 'Cam sành', 4.20, 4.6, 'Hậu Giang', 'https://images.unsplash.com/photo-1547514701-42782101795e', '1kg', 90, '2026-05-07 22:55:52'),
(2, 1, 'Táo', 'Táo Fuji', 5.20, 4.8, 'Nhật Bản', 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce', '1kg', 120, '2026-05-07 22:55:52'),
(3, 1, NULL, 'Dâu tây Đà Lạt', 6.50, 4.9, 'Đà Lạt', 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6', '1 hộp', 70, '2026-05-07 22:55:52'),
(4, 1, 'Nho', 'Nho đỏ', 5.80, 4.7, 'Ninh Thuận', 'https://images.unsplash.com/photo-1515778767554-1f1ed57b5c74', '1kg', 110, '2026-05-07 22:55:52'),
(5, 1, NULL, 'Xoài cát Hòa Lộc', 5.70, 4.9, 'Tiền Giang', 'https://images.unsplash.com/photo-1553279768-865429fa0078', '1kg', 95, '2026-05-07 22:55:52'),
(6, 2, NULL, 'Rau cải xanh', 2.20, 4.4, 'Đà Lạt', 'https://images.unsplash.com/photo-1540420773420-3366772f4999', '1 bó', 200, '2026-05-07 22:55:52'),
(7, 2, NULL, 'Cà rốt', 1.80, 4.3, 'Lâm Đồng', 'https://images.unsplash.com/photo-1447175008436-170170753d52', '1kg', 180, '2026-05-07 22:55:52'),
(8, 2, NULL, 'Khoai tây', 2.90, 4.5, 'Đà Lạt', 'https://images.unsplash.com/photo-1518977676601-b53f82aba655', '1kg', 160, '2026-05-07 22:55:52'),
(9, 2, NULL, 'Xà lách', 2.70, 4.6, 'Đà Lạt', 'https://images.unsplash.com/photo-1498837167922-ddd27525d352', '1 bó', 140, '2026-05-07 22:55:52'),
(10, 3, 'Sữa', 'Sữa Vinamilk', 6.20, 4.9, 'Việt Nam', 'https://images.unsplash.com/photo-1550583724-b2692b85b150', '1 hộp', 60, '2026-05-07 22:55:52'),
(11, 3, 'Sữa', 'Sữa hạnh nhân', 5.50, 4.6, 'Mỹ', 'https://images.unsplash.com/photo-1600788907416-456578634209', '1 hộp', 50, '2026-05-07 22:55:52'),
(12, 3, 'Sữa', 'Sữa yến mạch', 6.10, 4.7, 'Úc', 'https://images.unsplash.com/photo-1563636619-e9143da7973b', '1 hộp', 45, '2026-05-07 22:55:52');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `nutrition_values`
--
ALTER TABLE `nutrition_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `nutrition_values`
--
ALTER TABLE `nutrition_values`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `nutrition_values`
--
ALTER TABLE `nutrition_values`
  ADD CONSTRAINT `nutrition_values_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

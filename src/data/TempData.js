const APPLE_IMAGE = require('../../assets/images/apple.jpg');

/* =========================
   PRODUCTS
========================= */

export const products = [
  {
    id: 'p1',
    name: 'Táo Fuji',
    slug: 'tao-fuji',
    price: 5.2,
    discountPrice: 4.8,
    rating: 4.8,
    reviewCount: 128,
    stock: 20,

    origin: 'Nhật Bản',
    category: 'Trái cây',
    group: 'Táo',

    description: 'Táo Fuji nhập khẩu có vị ngọt thanh, giòn và nhiều nước.',

    image: APPLE_IMAGE,

    images: [APPLE_IMAGE, APPLE_IMAGE, APPLE_IMAGE],

    tags: ['organic', 'fresh', 'imported'],

    unit: '1 kg',
    isFeatured: true,
    isPopular: true,
  },

  {
    id: 'p2',
    name: 'Táo Gala',
    slug: 'tao-gala',
    price: 4.9,
    discountPrice: null,
    rating: 4.7,
    reviewCount: 95,
    stock: 16,

    origin: 'Mỹ',
    category: 'Trái cây',
    group: 'Táo',

    description:
      'Táo Gala có vị ngọt nhẹ, thích hợp ăn trực tiếp hoặc làm salad.',

    image: APPLE_IMAGE,

    images: [APPLE_IMAGE, APPLE_IMAGE],

    tags: ['sweet', 'fresh'],

    unit: '1 kg',
    isFeatured: false,
    isPopular: true,
  },

  {
    id: 'p3',
    name: 'Táo Envy',
    slug: 'tao-envy',
    price: 6.1,
    discountPrice: 5.6,
    rating: 4.9,
    reviewCount: 210,
    stock: 10,

    origin: 'New Zealand',
    category: 'Trái cây',
    group: 'Táo',

    description: 'Táo Envy cao cấp với độ giòn và ngọt nổi bật.',

    image: APPLE_IMAGE,

    images: [APPLE_IMAGE, APPLE_IMAGE],

    tags: ['premium', 'imported'],

    unit: '1 kg',
    isFeatured: true,
    isPopular: true,
  },

  {
    id: 'p4',
    name: 'Táo Jazz',
    slug: 'tao-jazz',
    price: 5.5,
    discountPrice: null,
    rating: 4.6,
    reviewCount: 80,
    stock: 25,

    origin: 'Úc',
    category: 'Trái cây',
    group: 'Táo',

    description: 'Táo Jazz có vị chua nhẹ cân bằng với độ ngọt tự nhiên.',

    image: APPLE_IMAGE,

    images: [APPLE_IMAGE, APPLE_IMAGE],

    tags: ['fresh'],

    unit: '1 kg',
    isFeatured: false,
    isPopular: false,
  },

  {
    id: 'p5',
    name: 'Táo Pink Lady',
    slug: 'tao-pink-lady',
    price: 6.3,
    discountPrice: 5.9,
    rating: 4.9,
    reviewCount: 145,
    stock: 12,

    origin: 'Pháp',
    category: 'Trái cây',
    group: 'Táo',

    description: 'Táo Pink Lady nổi bật với màu sắc đẹp và hương vị thơm ngọt.',

    image: APPLE_IMAGE,

    images: [APPLE_IMAGE, APPLE_IMAGE],

    tags: ['premium', 'sweet'],

    unit: '1 kg',
    isFeatured: true,
    isPopular: true,
  },
];

/* =========================
   CATEGORIES
========================= */

export const categories = [
  {
    id: 'c1',
    name: 'Trái cây',
    icon: 'nutrition',

    groups: [
      {
        id: 'g1',
        name: 'Táo',
      },

      {
        id: 'g2',
        name: 'Cam',
      },

      {
        id: 'g3',
        name: 'Dâu',
      },
    ],
  },

  {
    id: 'c2',
    name: 'Rau củ',
    icon: 'leaf',

    groups: [
      {
        id: 'g4',
        name: 'Rau lá',
      },

      {
        id: 'g5',
        name: 'Củ',
      },
    ],
  },

  {
    id: 'c3',
    name: 'Đồ uống',
    icon: 'water',

    groups: [
      {
        id: 'g6',
        name: 'Nước ép',
      },

      {
        id: 'g7',
        name: 'Sữa',
      },
    ],
  },
];

/* =========================
   FEATURED PRODUCTS
========================= */

export const featuredProducts = products.filter((item) => item.isFeatured);

/* =========================
   POPULAR PRODUCTS
========================= */

export const popularProducts = products.filter((item) => item.isPopular);

/* =========================
   USER
========================= */

export const user = {
  id: 'u1',

  name: 'Sarah Jenkins',

  email: 'sarah.j@example.com',

  phone: '+84 912 345 678',

  verified: true,

  points: 450,

  avatar: null,

  address: {
    city: 'Hồ Chí Minh',
    district: 'Quận 1',
    street: '12 Nguyễn Huệ',
  },
};

/* =========================
   DELIVERY METHODS
========================= */

export const deliveryMethods = [
  {
    id: 'standard',

    label: 'Tiêu chuẩn',

    desc: 'Ngày mai, 9AM - 12PM',

    fee: 0,

    feeLabel: 'Miễn phí',
  },

  {
    id: 'express',

    label: 'Giao nhanh',

    desc: 'Hôm nay, trong 2 giờ',

    fee: 5.0,

    feeLabel: '+5$',
  },
];

/* =========================
   PAYMENT METHODS
========================= */

export const paymentMethods = [
  {
    id: 'card',

    label: 'Thẻ tín dụng',

    desc: '**** **** **** 4242',

    icon: 'card-outline',
  },

  {
    id: 'momo',

    label: 'MoMo Wallet',

    desc: 'Ví điện tử',

    icon: 'wallet-outline',
  },

  {
    id: 'cod',

    label: 'Thanh toán khi nhận hàng',

    desc: 'Thanh toán trực tiếp cho tài xế',

    icon: 'cash-outline',
  },
];

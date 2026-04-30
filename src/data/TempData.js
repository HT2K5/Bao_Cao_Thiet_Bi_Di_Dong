export const categories = [
  {
    id: "c1",
    name: "Trái cây",
    icon: "leaf",
    groups: [
      {
        id: "g1",
        name: "Cam",
        items: [
          { id: "p1", name: "Cam sành", price: 4.2, rating: 4.8, origin: "Hậu Giang", image: require("../../assets/images/apple.jpg") },
          { id: "p2", name: "Cam Valencia", price: 3.5, rating: 4.7, origin: "Mỹ", image: require("../../assets/images/apple.jpg") },
          { id: "p3", name: "Cam quýt", price: 4.0, rating: 4.6, origin: "Đồng Nai", image: require("../../assets/images/apple.jpg") },
        ],
      },
      {
        id: "g2",
        name: "Táo",
        items: [
          { id: "p4", name: "Táo Fuji", price: 5.2, rating: 4.8, origin: "Nhật Bản", image: require("../../assets/images/apple.jpg") },
          { id: "p5", name: "Táo Gala", price: 4.9, rating: 4.6, origin: "Mỹ", image: require("../../assets/images/apple.jpg") },
        ],
      },
      {
        id: "g3",
        name: "Dâu",
        items: [
          { id: "p6", name: "Dâu tây Đà Lạt", price: 6.5, rating: 4.9, origin: "Đà Lạt", image: require("../../assets/images/apple.jpg") },
        ],
      },
    ],
  },
  {
    id: "c2",
    name: "Rau củ",
    icon: "nutrition",
    groups: [
      {
        id: "g4",
        name: "Rau lá",
        items: [
          { id: "p7", name: "Rau cải xanh", price: 2.2, rating: 4.4, origin: "Đà Lạt", image: require("../../assets/images/apple.jpg") },
        ],
      },
      {
        id: "g5",
        name: "Củ",
        items: [
          { id: "p8", name: "Cà rốt", price: 1.8, rating: 4.3, origin: "Lâm Đồng", image: require("../../assets/images/apple.jpg") },
        ],
      },
    ],
  },
  {
    id: "c3",
    name: "Sữa",
    icon: "water",
    groups: [
      {
        id: "g6",
        name: "Sữa tươi",
        items: [
          { id: "p9", name: "Sữa Vinamilk", price: 6.2, rating: 4.9, origin: "Việt Nam", image: require("../../assets/images/apple.jpg") },
        ],
      },
      {
        id: "g7",
        name: "Sữa hạt",
        items: [
          { id: "p10", name: "Sữa hạnh nhân", price: 5.5, rating: 4.6, origin: "Mỹ", image: require("../../assets/images/apple.jpg") },
        ],
      },
    ],
  },
];

// Flatten tất cả items ra thành list phẳng cho Cart/Checkout
export const products = categories.flatMap(c =>
  c.groups.flatMap(g =>
    g.items.map(item => ({
      ...item,
      category: c.name,
      group: g.name,
      unit: '1 kg',
    }))
  )
);

export const user = {
  name: 'Sarah Jenkins',
  email: 'sarah.j@example.com',
  verified: true,
  points: 450,
  avatar: null,
};

export const deliveryMethods = [
  { id: 'standard', label: 'Tiêu chuẩn', desc: 'Ngày mai, 9AM - 12PM', fee: 0,    feeLabel: 'Miễn phí' },
  { id: 'express',  label: 'Giao nhanh', desc: 'Hôm nay, trong 2 giờ', fee: 5.00, feeLabel: '+$5.00' },
];

export const paymentMethods = [
  { id: 'card', label: 'Thẻ tín dụng',          desc: '**** **** **** 4242',              icon: 'card-outline' },
  { id: 'momo', label: 'MoMo Wallet',            desc: '',                                 icon: 'wallet-outline' },
  { id: 'cod',  label: 'Thanh toán khi nhận hàng', desc: 'Thanh toán trực tiếp cho tài xế', icon: 'cash-outline' },
];
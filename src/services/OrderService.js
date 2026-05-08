import AsyncStorage from '@react-native-async-storage/async-storage';

const ORDERS_KEY = '@farmdirect_orders';

// Tạo ID đơn hàng duy nhất
function generateOrderId() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return (
    'ORD' + timestamp.toString().slice(-6) + random.toString().padStart(3, '0')
  );
}

// Lấy tất cả đơn hàng
export async function getOrders() {
  try {
    const ordersJson = await AsyncStorage.getItem(ORDERS_KEY);
    if (ordersJson) {
      const orders = JSON.parse(ordersJson);
      // Sắp xếp theo ngày mới nhất
      return orders.sort(function (a, b) {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
    }
    return [];
  } catch (error) {
    console.error('Error getting orders:', error);
    return [];
  }
}

// Thêm đơn hàng mới
export async function addOrder(orderData) {
  try {
    const orders = await getOrders();

    const newOrder = {
      id: generateOrderId(),
      date: formatDate(new Date()),
      timestamp: new Date().toISOString(),
      status: 'shipping',
      statusText: 'Đang giao',
      items: orderData.items.length,
      total: orderData.total,
      products: orderData.items.map(function (item) {
        return {
          name: item.name,
          qty: item.qty,
          price: item.price,
        };
      }),
      address: orderData.address,
      deliveryMethod: orderData.deliveryMethod,
      paymentMethod: orderData.paymentMethod,
    };

    orders.unshift(newOrder);
    await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

    return newOrder;
  } catch (error) {
    console.error('Error adding order:', error);
    return null;
  }
}

// Cập nhật trạng thái đơn hàng
export async function updateOrderStatus(orderId, status, statusText) {
  try {
    const orders = await getOrders();
    const updatedOrders = orders.map(function (order) {
      if (order.id === orderId) {
        return { ...order, status: status, statusText: statusText };
      }
      return order;
    });

    await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
    return true;
  } catch (error) {
    console.error('Error updating order:', error);
    return false;
  }
}

// Xóa tất cả đơn hàng (dùng khi test)
export async function clearOrders() {
  try {
    await AsyncStorage.removeItem(ORDERS_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing orders:', error);
    return false;
  }
}

// Format ngày
function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return day + '/' + month + '/' + year;
}

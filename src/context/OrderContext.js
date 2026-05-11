import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  function createOrder(orderData) {
    const newOrder = {
      id: Date.now().toString(),

      ...orderData,

      status: 'Đang xử lý',

      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}

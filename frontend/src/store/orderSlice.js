import { createSlice } from "@reduxjs/toolkit";

const OrderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    orderSummary: JSON.parse(localStorage.getItem("orderSummary")) || [],
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    clearOrders: (state) => {
      state.orders = [];
    },
    cancelOrder: (state, action) => {
      const order = state.orders.find((o) => action.payload === o.id);
      if (order) order.status = "CANCELLED";
    },  

    setOrderSummary: (state, action) => {
      state.orderSummary = action.payload;
      localStorage.setItem("orderSummary", JSON.stringify(state.orderSummary));
    },
    clearOrderSummary: (state) => {
      state.orderSummary = [];
      localStorage.removeItem("orderSummary");
    },
  },
});

export const ordersActions = OrderSlice.actions;
export default OrderSlice.reducer;

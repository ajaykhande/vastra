import { createSlice } from "@reduxjs/toolkit";

const bagSlice = createSlice({
  name: "bag",
  initialState: [],
  reducers: {
    addToBag: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("bag", JSON.stringify(state));
    },

    removeFromBag: (state, action) => {
      const newState = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("bag", JSON.stringify(newState));
      return newState;
    },

    updateSize: (state, action) => {
      const { id, size } = action.payload;
      const item = state.find((i) => i.id === id);
      if (item) {
        item.size = size;
        localStorage.setItem("bag", JSON.stringify(state));
      }
    },

    updateQty: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.find((i) => i.id === id);
      if (item) {
        item.qty = qty;
        localStorage.setItem("bag", JSON.stringify(state));
      }
    },
    clearBag: (state) => {
      localStorage.removeItem("bag");
      return (state = []);
    },
  },
});

export const bagActions = bagSlice.actions;
export default bagSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "Carts",
  initialState: {
    dataCart: {
      isFetching: false,
      dataCart: [],
      error: false,
    },
  },
  reducers: {
    CartStart: (state) => {
      state.dataCart.isFetching = true;
    },
    // CartSuccess: (state, action) => {
    //   (state.dataCart.isFetching = false),
    //     (state.dataCart.dataCart = [action.payload]),
    //     (state.dataCart.error = false);
    // },
    CartSuccess: (state, action) => {
      state.dataCart.isFetching = false;
      state.dataCart.dataCart.push(action.payload); 
      state.dataCart.error = false;
    },
    CartFailed: (state) => {
      state.dataCart.isFetching = false;
      state.dataCart.error = true;
    },
    IncreaseMount: (state, action) => {
      const index = state.dataCart.dataCart.findIndex(
        (item) => item._id === action.payload
      );
      if (index !== -1) {
        state.dataCart.dataCart[index].mount++; 
      }
    },
  },
});
export const { CartStart, CartSuccess, CartFailed, IncreaseMount } = CartSlice.actions;
export default CartSlice.reducer;

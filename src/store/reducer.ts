import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export interface CardData {
  id: string;
  name: string;
  image: string;
  description: string;
  count: number;
  amount: number;
}
export interface CartState {
  orders: {
    id: string;
    items: CardData[];
    total: number;
  }[];
  items: CardData[];
  total: number;
}
const initialState: CartState = {
  orders: [],
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "eshop",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ cartData: CardData; value: number }>
    ) => {
      const newFood = action.payload.cartData;
      const countFlag = action.payload.value;
      const addedFood = state.items?.find((data) => data.id === newFood.id);
      if (!addedFood && countFlag === 1) {
        newFood.count = countFlag;
        state.items.push(newFood);
      }
      state.total = state.items.reduce(
        (total, item) => total + item.amount * item.count,
        0
      );
    },
    updateItem: (
      state,
      action: PayloadAction<{ cartData: CardData; value: number }>
    ) => {
      const newFood = action.payload.cartData;
      const countFlag = action.payload.value;
      const addedFood = state.items?.find((data) => data.id === newFood.id);
      if (addedFood) {
        if (addedFood.count === 1 && countFlag === -1) {
          const removeIndex = state.items?.findIndex(
            (item) => item.id === newFood.id
          );
          state.items.splice(removeIndex, 1);
        } else {
          addedFood.count += countFlag;
        }
      }
      state.total = state.items.reduce(
        (total, item) => total + item.amount * item.count,
        0
      );
    },

    placeOrder: (state) => {
      const order = {
        id: `${Math.floor(Math.random() * 1000)}`,
        items: state.items,
        total: state.total,
      };
      state.orders.unshift(order);
      state.items = [];
      state.total = 0;
    },
    clearCart: (state) => {
      state = initialState;
    },
  },
});

export const { addItem, updateItem, clearCart, placeOrder } = cartSlice.actions;

export default cartSlice.reducer;

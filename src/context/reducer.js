import { REMOVE, INCREASE, DECREASE, ADD_TO_CART, CLEAR_CART } from './actions';

export default (state, action) => {
  switch (action.type) {
    case REMOVE:
      return state.filter(item => item.id !== action.payload);
    case INCREASE:
      return state.map(item => {
        return item.id === action.payload
          ? { ...item, amount: item.amount + 1 }
          : { ...item };
      });
    case DECREASE:
      return state.map(item => {
        return item.id === action.payload
          ? { ...item, amount: item.amount - 1 }
          : { ...item };
      });
    case ADD_TO_CART:
      const { id, image, price, title } = action.payload;
      const product = { id, image, price, title, amount: 1 };
      return [...state, product];
    case CLEAR_CART:
      return [];
    default:
      return state;
  }
};

import { ADD_TO_CART, REMOVE_FROM_CART, SET_USER } from "./actionTypes";
const initialState = {
  basket: [],
  user: null,
};

export const getBasketTotal = (basket) => {
  basket?.reduce((amount, payload) => payload.price + amount, 0);
};

const cartItemReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        basket: [...state.basket, action.payload],
      };

    case REMOVE_FROM_CART:
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );

      let newbasket = [...state.basket];

      if (index >= 0) {
        newbasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload.id}) as its not in basket`
        );
      }

      return {
        ...state,
        basket: newbasket,
      };

    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
  }
  return state;
};

export default cartItemReducer;

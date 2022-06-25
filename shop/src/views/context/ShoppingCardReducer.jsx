export function shoppingCartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id),
      }
    default:
      return state
  }
}

//TODO: This will be removed to other locations

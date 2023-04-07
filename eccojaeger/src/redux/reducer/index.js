/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';
import productReducer from './productReducer';
import authReducer from './authReducer';
import buyingReducer from './buyingReducer';
import cartReducer from './cartReducer';
import masterReducer from './masterReducer';
const rootReducer = combineReducers({
  productState: productReducer,
  authState: authReducer,
  buyingState: buyingReducer,
  cartState: cartReducer,
  masterState: masterReducer,
});

export default rootReducer;

/* eslint-disable prettier/prettier */
import * as productActions from './productActions';
import * as authActions from './authActions';
import * as buyingActions from './buyingActions';
import * as cartActions from './cartActions';
import * as masterActions from './masterActions'

export const ActionCreators = Object.assign(
  {},
  productActions,
  authActions,
  buyingActions,
  cartActions,
  masterActions
);

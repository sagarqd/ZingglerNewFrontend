import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';

import authReducer from './authReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  auth: authReducer, // Add other reducers here if needed
});

export default reducer;
 
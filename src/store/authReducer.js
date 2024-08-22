
const initialState = {
    token: localStorage.getItem('authToken') || null,
    isAuthenticated: !!localStorage.getItem('authToken'),
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        localStorage.setItem('authToken', action.payload);
        return {
          ...state,
          token: action.payload,
          isAuthenticated: true,
        };
      case 'LOGOUT':
        localStorage.removeItem('authToken');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  
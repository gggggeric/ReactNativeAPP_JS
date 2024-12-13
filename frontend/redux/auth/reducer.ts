interface AuthState {
    jwtToken: string | null;
  }
  
  const initialState: AuthState = {
    jwtToken: null,
  };
  
  const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'SET_JWT_TOKEN':
        return {
          ...state,
          jwtToken: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  
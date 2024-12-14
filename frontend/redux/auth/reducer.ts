// auth/reducer.ts
interface AuthState {
  jwtToken: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  jwtToken: null,
  isLoggedIn: false,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_JWT_TOKEN':
      return {
        ...state,
        jwtToken: action.payload,
        isLoggedIn: !!action.payload, // If token exists, user is logged in
      };
    case 'LOGOUT':
      return {
        ...state,
        jwtToken: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;

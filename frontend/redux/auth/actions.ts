// auth/actions.ts
export const setJwtToken = (token: string) => ({
  type: 'SET_JWT_TOKEN',
  payload: token,
});

export const logout = () => ({
  type: 'LOGOUT',
});

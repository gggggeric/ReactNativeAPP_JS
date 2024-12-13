export const setJwtToken = (token: string) => ({
    type: 'SET_JWT_TOKEN',
    payload: token,
  });
  
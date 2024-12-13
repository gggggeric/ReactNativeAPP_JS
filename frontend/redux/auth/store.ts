// store.ts
import { createStore, combineReducers } from 'redux';
import authReducer from './reducer'; // Assuming your reducer is in the same folder

// Combine reducers into the root reducer
const rootReducer = combineReducers({
  auth: authReducer,
});

// Define RootState type based on the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// Create the Redux store
const store = createStore(rootReducer);

export default store;

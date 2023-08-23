import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Auth/AuthSlice";
import { userReducer } from "./User/UserSlice";
import { productsReducer } from "./Products/ProductSlice";
// ...

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

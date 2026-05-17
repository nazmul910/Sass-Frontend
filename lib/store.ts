import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import usersReducer from "../features/users/usersSlice";
import paymentReducer from "../features/payment/paymentSlice";
import featuresReducer from "../features/features/featuresSlice";
import stripePaymentReducer from "../features/stripe-payment/stripePaymentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    payment: paymentReducer,
    stripePayment: stripePaymentReducer,
    features: featuresReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
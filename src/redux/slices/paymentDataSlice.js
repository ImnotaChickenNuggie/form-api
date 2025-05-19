import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cardName: '',
  cardNumber: '',
  securityCode: '',
  expirationDate: null,
  errors: {}
};

const paymentDataSlice = createSlice({
  name: 'paymentData',
  initialState,
  reducers: {
    setPaymentData: (state, action) => {
      return { ...state, ...action.payload };
    },
    setErrors: (state, action) => {
      state.errors = { ...state.errors, ...action.payload };
    },
    clearErrors: (state) => {
      state.errors = {};
    },
    resetPaymentData: () => initialState,
  },
});

export const { setPaymentData, setErrors, clearErrors, resetPaymentData } = paymentDataSlice.actions;

export default paymentDataSlice.reducer; 
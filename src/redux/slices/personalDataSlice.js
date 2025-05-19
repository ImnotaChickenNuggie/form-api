import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  postalCode: '',
  state: null,
  errors: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  }
};

const personalDataSlice = createSlice({
  name: 'personalData',
  initialState,
  reducers: {
    setPersonalData: (state, action) => {
      return { ...state, ...action.payload };
    },
    setErrors: (state, action) => {
      state.errors = { ...state.errors, ...action.payload };
    },
    clearErrors: (state) => {
      state.errors = initialState.errors;
    },
    resetPersonalData: () => initialState,
  },
});

export const { setPersonalData, setErrors, clearErrors, resetPersonalData } = personalDataSlice.actions;

export default personalDataSlice.reducer; 
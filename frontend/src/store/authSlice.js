import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: {},
  otp: {
    phone: "",
    hash: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { user } = action.payload;
      console.log("user: ", user);
      state.user = user.user;
      state.isAuth = true;
      //
    },
    setOtp: (state, action) => {
      const { hash, phone } = action.payload;
      state.otp.phone = phone;
      state.otp.hash = hash;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, setOtp } = authSlice.actions;

export default authSlice.reducer;

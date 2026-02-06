import { IUser } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";



export interface authState {
  user: IUser | null;
}

const initialState: authState = {
  user:  null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      localStorage.setItem("user",JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user")
      console.log(state.user)
    }
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

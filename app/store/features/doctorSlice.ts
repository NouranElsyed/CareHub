import { IDoctor } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";



export interface doctorState {
  doctor: IDoctor | null;
  isModalOpen:boolean
}

const initialState: doctorState = {
  doctor:  null,
  isModalOpen: false
};

export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setShowedDoctor: (state, action: PayloadAction<{doctor:IDoctor|null,isModalOpen:boolean}>) => {
      state.doctor = action.payload.doctor;
      state.isModalOpen = action.payload.isModalOpen;

    },
    
  },
});

// Action creators are generated for each case reducer function
export const { setShowedDoctor} = doctorSlice.actions;

export default doctorSlice.reducer;

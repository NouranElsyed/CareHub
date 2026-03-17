
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";



export interface doctorState {
  doctorId: string | null;
  isModalOpen:boolean;
  doctorProfileLoading:boolean
}

const initialState: doctorState = {
  doctorId:  null,
  isModalOpen: false,
  doctorProfileLoading:true
};

export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setShowedDoctor: (state, action: PayloadAction<{doctorId:string|null,isModalOpen:boolean}>) => {
      state.doctorId = action.payload.doctorId;
      state.isModalOpen = action.payload.isModalOpen;

    },
    setdoctorProfileLoading:(state,action: PayloadAction<{doctorProfileLoading:boolean}>)=>{
      state.doctorProfileLoading = action.payload.doctorProfileLoading
    }
    
  },
});

// Action creators are generated for each case reducer function
export const { setShowedDoctor} = doctorSlice.actions;

export default doctorSlice.reducer;

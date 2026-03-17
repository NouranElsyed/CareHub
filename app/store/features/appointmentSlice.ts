
import { Iappointment } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";



export interface appointmentState {
  appointments: Iappointment[] ;
}

const initialState: appointmentState = {
  appointments: [],
};

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setAppointment: (state, action: PayloadAction<Iappointment>) => {
      state.appointments?.push(action.payload) ;
    },
    deleteAppointment: (state,action: PayloadAction<string>) => {
      state.appointments = state.appointments.filter(appoint=>appoint._id!== action.payload);
      console.log(state.appointments)
    }
  },
});

// Action creators are generated for each case reducer function
export const { setAppointment, deleteAppointment } = appointmentSlice.actions;

export default appointmentSlice.reducer;

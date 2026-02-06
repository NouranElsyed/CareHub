export interface IDoctor {
  _id: string;
  user: IUser;
  specialization: string;
  price: number;
  isActive: boolean;
  availableSlots: [];
  createdAt: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
}

export interface ISignupForm {
  name: string;
  email: string;
  password: string;
}
export interface ILoginForm {
  email: string;
  password: string;
}
export const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export interface bookedSuccess {
  appointment: {
    doctor: string;
    patient: string;
    bookedBy: string;
    appointmentDate: string;
    dayOfWeek: number;

    countdown: {
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
      expired: boolean;
    };
    createdAt: string;
    history: {
      action: string;
      by: string;
      date: string;
      details: string;
      id: string;
      _id: string;
    };
    id: string;
    isForDependent: boolean;
    lateFee: number;
    notes: string;

    paymentStatus: string;
    reminderSent: boolean;
    status: string;
    time: string;

    timeUntilAppointment: number;
    updatedAt: string;

    _id: string;
  };
  feeDetails: { consultationFee: number; lateFee: number; total: number };
  message: string;
  patientInfo: { id: string; name: string; type: string };
  restrictions: { canBookAgain: boolean; nextBookingAllowed: string };
  success: boolean;
}

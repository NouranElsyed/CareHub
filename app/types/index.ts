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
  image: string
}

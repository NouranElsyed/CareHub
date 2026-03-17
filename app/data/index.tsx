import { Clock2, Mail, MapPin, Phone } from "lucide-react";
import { ReactNode } from "react";

export const doctorInfo: {
  datatitle: string;
  icon: ReactNode;
   iconModal: ReactNode;
  data: string;
  bgColor: string;
  iconColor: string;
}[] = [
  {
    datatitle: "Phone",
    icon: <Phone  />,
    iconModal: <Phone  size={15}/>,
    data: "01234567890",
    bgColor: "bg-cyan-300/30",
    iconColor: "text-cyan-700",
  },
  {
    datatitle: "Email",
    icon: <Mail />,
    iconModal: <Mail size={15} />,
    data: "doctor@gmail.com",
    bgColor: "bg-emerald-300/30 ",
    iconColor: "text-emerald-700",
  },
  {
    datatitle: "Location",
    icon: <MapPin />,
    iconModal: <MapPin size={15} />,
    data: "Main clinic",
    bgColor: "bg-fuchsia-300/30",
    iconColor: "text-fuchsia-700",
  },
  {
    datatitle: "Consultation duration",
    icon: <Clock2 />,
    iconModal: <Clock2 size={15} />,
    data: "30 mins",
    bgColor: "bg-amber-300/30",
    iconColor: "text-amber-700",
  },
];
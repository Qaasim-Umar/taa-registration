export interface AttendeeData {
  fullName: string;
  email: string;
  phone: string;
  state: string;
  address: string;
  gender: "Male" | "Female" | "";
  institution: string;
}

export interface RegistrationData {
  numberOfAttendees: number;
  attendees: AttendeeData[];
  totalAmount: number;
}

export interface ConfirmedRegistration {
  registrationId: string;
  attendee: AttendeeData;
  amount: number;
  qrCode: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

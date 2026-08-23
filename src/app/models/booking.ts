import { Space } from './space';


export interface Booking {

  id: number;

  user?: {
    id?: number;
    fullName?: string;
    email?: string;
  };

  space?: Space;

  bookingDate: string;

  createdDate?: string;

  startTime: string;

  duration: number;

  totalAmount: number;

  status: string;

}


export interface BookingRequest {

  userId: number;

  spaceId: number;

  bookingDate: string;

  startTime: string;

  duration: number;

  totalAmount: number;

}
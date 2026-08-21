import { Space } from './space';
import { User } from './user';

export interface Booking {

  id: number;

  user?: User;

  space?: Space;

  // Date for which the space was booked
  bookingDate: string;

  // Date on which the booking was created
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
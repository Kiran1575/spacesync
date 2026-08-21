import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  Booking,
  BookingRequest
} from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly apiUrl =
    'http://localhost:8080/api/bookings';

  constructor(
    private http: HttpClient
  ) {}

  createBooking(
    request: BookingRequest
  ): Observable<Booking> {

    return this.http.post<Booking>(
      this.apiUrl,
      request
    );
  }

  getBookingsByUser(
    userId: number
  ): Observable<Booking[]> {

    return this.http.get<Booking[]>(
      `${this.apiUrl}/user/${userId}`
    );
  }
}
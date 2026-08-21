import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { timeout } from 'rxjs';

import { AuthService } from '../../services/auth';
import { BookingService } from '../../services/booking';
import { Booking } from '../../models/booking';

import {
  handleImageError,
  IMAGE_PLACEHOLDER
} from '../../shared/image-fallback';

import { downloadBookingReceipt } from '../../shared/pdf-receipt';


@Component({
  selector: 'app-my-bookings',

  standalone: true,

  imports: [
    CommonModule,
    RouterLink
  ],

  templateUrl: './my-bookings.html',

  styleUrl: './my-bookings.css'
})


export class MyBookings implements OnInit {


  // =========================================
  // STATE
  // =========================================

  bookings: Booking[] = [];

  isLoading = true;

  errorMessage = '';


  // =========================================
  // CONSTRUCTOR
  // =========================================

  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {}


  // =========================================
  // INITIALIZATION
  // =========================================

  ngOnInit(): void {

    console.log(
      'MY BOOKINGS COMPONENT STARTED'
    );

    this.loadBookings();
  }


  // =========================================
  // LOAD BOOKINGS
  // =========================================

  loadBookings(): void {

    const userId =
      this.authService.getUserId();


    console.log(
      'MY BOOKINGS USER ID:',
      userId
    );


    // -----------------------------------------
    // USER NOT LOGGED IN
    // -----------------------------------------

    if (!userId) {

      this.bookings = [];

      this.isLoading = false;

      this.errorMessage =
        'Please login to view your bookings.';

      this.cdr.detectChanges();

      return;
    }


    // -----------------------------------------
    // START LOADING
    // -----------------------------------------

    this.isLoading = true;

    this.errorMessage = '';

    this.bookings = [];


    const numericUserId =
      Number(userId);


    console.log(
      'MY BOOKINGS REQUEST:',
      `http://localhost:8080/api/bookings/user/${numericUserId}`
    );


    // -----------------------------------------
    // API REQUEST
    // -----------------------------------------

    this.bookingService

      .getBookingsByUser(numericUserId)

      .pipe(
        timeout(10000)
      )

      .subscribe({

        // =====================================
        // SUCCESS
        // =====================================

        next: (data) => {

          console.log(
            'MY BOOKINGS API RESPONSE:',
            data
          );


          // Make a completely new array
          // so Angular detects the change.

          if (Array.isArray(data)) {

            this.bookings = [...data].sort(
              (a, b) =>
                Number(b.id) -
                Number(a.id)
            );

          } else {

            this.bookings = [];

          }


          // Stop loading

          this.isLoading = false;


          console.log(
            'BOOKINGS LOADED:',
            this.bookings.length
          );


          console.log(
            'BOOKINGS DATA:',
            this.bookings
          );


          console.log(
            'LOADING STATE:',
            this.isLoading
          );


          // =================================
          // FORCE ANGULAR UI UPDATE
          // =================================

          this.cdr.detectChanges();

        },


        // =====================================
        // ERROR
        // =====================================

        error: (error) => {

          console.error(
            'MY BOOKINGS ERROR:',
            error
          );


          this.bookings = [];

          this.isLoading = false;


          if (
            error?.name ===
            'TimeoutError'
          ) {

            this.errorMessage =
              'The server took too long to respond. Please try again.';

          } else {

            this.errorMessage =
              error?.error?.message ||
              'Unable to load your bookings.';

          }


          console.log(
            'ERROR MESSAGE:',
            this.errorMessage
          );


          console.log(
            'LOADING STATE:',
            this.isLoading
          );


          // =================================
          // FORCE ANGULAR UI UPDATE
          // =================================

          this.cdr.detectChanges();

        }

      });

  }


  // =========================================
  // SPACE NAME
  // =========================================

  getSpaceName(
    booking: Booking
  ): string {

    return booking?.space?.name ||
      'Workspace';
  }


  // =========================================
  // LOCATION
  // =========================================

  getLocation(
    booking: Booking
  ): string {

    return booking?.space?.location ||
      'Location unavailable';
  }


  // =========================================
  // IMAGE
  // =========================================

  getImage(
    booking: Booking
  ): string {

    const image =
      booking?.space?.imageUrl;


    if (
      image &&
      image.trim().length > 0
    ) {

      return image;
    }


    return IMAGE_PLACEHOLDER;
  }


  // =========================================
  // IMAGE ERROR
  // =========================================

  onImageError(
    event: Event
  ): void {

    handleImageError(event);
  }


  // =========================================
  // DOWNLOAD RECEIPT
  // =========================================

  downloadReceipt(
    booking: Booking
  ): void {

    if (!booking) {
      return;
    }


    const user =
      this.authService.getCurrentUser();


    downloadBookingReceipt(
      booking,
      user?.fullName || 'User'
    );
  }

}
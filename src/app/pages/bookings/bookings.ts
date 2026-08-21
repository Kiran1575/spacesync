import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { AuthService } from '../../services/auth';
import { SpaceService } from '../../services/space';
import { BookingService } from '../../services/booking';

import { Space } from '../../models/space';
import { Booking } from '../../models/booking';

import { handleImageError } from '../../shared/image-fallback';
import { downloadBookingReceipt } from '../../shared/pdf-receipt';


@Component({
  selector: 'app-bookings',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './bookings.html',

  styleUrl: './bookings.css'
})
export class Bookings implements OnInit {

  // ==========================================
  // SPACE
  // ==========================================

  space: Space | null = null;

  isLoadingSpace = true;


  // ==========================================
  // BOOKING
  // ==========================================

  isBooking = false;

  confirmedBooking: Booking | null = null;


  // ==========================================
  // FORM
  // ==========================================

  bookingDate = '';

  startTime = '09:00';

  duration = 1;


  // ==========================================
  // ERROR
  // ==========================================

  errorMessage = '';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public spaceService: SpaceService,
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {}


  // ==========================================
  // INITIALIZE
  // ==========================================

  ngOnInit(): void {

    console.log('================================');
    console.log('BOOKING PAGE LOADED');
    console.log('CURRENT URL:', this.router.url);
    console.log('================================');


    const spaceId =
      this.route.snapshot.queryParamMap.get('spaceId');


    console.log(
      'SPACE ID FROM URL:',
      spaceId
    );


    if (!spaceId) {

      this.isLoadingSpace = false;

      this.errorMessage =
        'No space was selected for booking.';

      this.cdr.detectChanges();

      return;
    }


    const id =
      Number(spaceId);


    if (!Number.isInteger(id) || id <= 0) {

      this.isLoadingSpace = false;

      this.errorMessage =
        'Invalid space selected for booking.';

      this.cdr.detectChanges();

      return;
    }


    this.loadSpace(id);
  }


  // ==========================================
  // LOAD SPACE
  // ==========================================

  loadSpace(id: number): void {

    console.log(
      'LOADING BOOKING SPACE:',
      id
    );


    this.isLoadingSpace = true;

    this.errorMessage = '';


    this.spaceService
      .getSpaceById(id)
      .subscribe({

        next: (response) => {

          console.log(
            'BOOKING SPACE RESPONSE:',
            response
          );


          // Store the space

          this.space = response;


          // Set today's date

          this.setDefaultDate();


          // IMPORTANT:
          // Space loading is now finished.

          this.isLoadingSpace = false;


          // Force Angular to update the UI.

          this.cdr.detectChanges();


          console.log(
            'BOOKING SPACE LOADED:',
            this.space
          );

          console.log(
            'LOADING:',
            this.isLoadingSpace
          );
        },


        error: (error) => {

          console.error(
            'BOOKING SPACE ERROR:',
            error
          );


          this.space = null;

          this.isLoadingSpace = false;


          this.errorMessage =
            'Unable to load the selected space. Please try again.';


          // Force Angular to update the UI.

          this.cdr.detectChanges();
        }

      });
  }


  // ==========================================
  // DEFAULT DATE
  // ==========================================

  setDefaultDate(): void {

    const today =
      new Date();


    const year =
      today.getFullYear();


    const month =
      String(
        today.getMonth() + 1
      ).padStart(2, '0');


    const day =
      String(
        today.getDate()
      ).padStart(2, '0');


    this.bookingDate =
      `${year}-${month}-${day}`;
  }


  // ==========================================
  // IMAGE
  // ==========================================

  onImageError(event: Event): void {

    handleImageError(event);
  }


  // ==========================================
  // SPACE INFORMATION
  // ==========================================

  getSpaceName(): string {

    return this.space?.name ||
      'Workspace';
  }


  getLocation(): string {

    return this.space?.location ||
      'Location unavailable';
  }


  getPrice(): number {

    if (
      this.space?.price !== undefined &&
      this.space?.price !== null
    ) {

      return Number(
        this.space.price
      );
    }


    return 0;
  }


  getTotal(): number {

    return (
      this.getPrice() *
      Number(this.duration)
    );
  }


  // ==========================================
  // CONFIRM BOOKING
  // ==========================================

  confirmBooking(): void {

    console.log('================================');
    console.log('CONFIRM BOOKING CLICKED');
    console.log('CURRENT URL:', this.router.url);
    console.log('SPACE:', this.space);
    console.log('================================');


    // Prevent double click

    if (this.isBooking) {

      return;
    }


    this.errorMessage = '';


    // ==========================================
    // SPACE VALIDATION
    // ==========================================

    if (!this.space) {

      this.errorMessage =
        'Space information is not available.';

      this.cdr.detectChanges();

      return;
    }


    // ==========================================
    // LOGIN VALIDATION
    // ==========================================

    const userId =
      this.authService.getUserId();


    if (!userId) {

      this.errorMessage =
        'Please login before booking.';


      this.router.navigate(
        ['/login'],
        {
          queryParams: {
            returnUrl: this.router.url
          }
        }
      );


      return;
    }


    // ==========================================
    // DATE VALIDATION
    // ==========================================

    if (!this.bookingDate) {

      this.errorMessage =
        'Please select a booking date.';

      this.cdr.detectChanges();

      return;
    }


    // ==========================================
    // TIME VALIDATION
    // ==========================================

    if (!this.startTime) {

      this.errorMessage =
        'Please select a start time.';

      this.cdr.detectChanges();

      return;
    }


    // ==========================================
    // DURATION VALIDATION
    // ==========================================

    if (
      !this.duration ||
      Number(this.duration) < 1
    ) {

      this.errorMessage =
        'Please select a valid duration.';

      this.cdr.detectChanges();

      return;
    }


    // ==========================================
    // BOOKING DATA
    // ==========================================

    const bookingData = {

      userId: Number(userId),

      spaceId: Number(
        this.space.id
      ),

      bookingDate:
        this.bookingDate,

      startTime:
        this.startTime,

      duration:
        Number(this.duration),

      totalAmount:
        this.getTotal()

    };


    console.log(
      'CREATING BOOKING:',
      bookingData
    );


    // Start booking request

    this.isBooking = true;


    this.cdr.detectChanges();


    // ==========================================
    // CREATE BOOKING
    // ==========================================

    this.bookingService
      .createBooking(bookingData)
      .subscribe({

        next: (response) => {

          console.log(
            'BOOKING CREATED:',
            response
          );


          // Store successful booking

          this.confirmedBooking =
            response;


          // Stop booking spinner

          this.isBooking = false;


          // IMPORTANT:
          // Do NOT touch isLoadingSpace here.

          this.cdr.detectChanges();


          console.log(
            'BOOKING CONFIRMED'
          );

          console.log(
            'SPACE LOADING:',
            this.isLoadingSpace
          );

          console.log(
            'BOOKING LOADING:',
            this.isBooking
          );
        },


        error: (error) => {

          console.error(
            'BOOKING ERROR:',
            error
          );


          // Stop booking spinner

          this.isBooking = false;


          if (
            error?.error?.message
          ) {

            this.errorMessage =
              error.error.message;

          } else {

            this.errorMessage =
              'Unable to confirm booking. Please try again.';
          }


          this.cdr.detectChanges();
        }

      });
  }


  // ==========================================
  // DOWNLOAD RECEIPT
  // ==========================================

  downloadReceipt(): void {

    if (!this.confirmedBooking) {

      return;
    }


    const user =
      this.authService.getCurrentUser();


    downloadBookingReceipt(
      this.confirmedBooking,
      user?.fullName ||
        'SpaceSync User'
    );
  }


  // ==========================================
  // NAVIGATION
  // ==========================================

  viewMyBookings(): void {

    this.router.navigate(
      ['/my-bookings']
    );
  }


  bookAnother(): void {

    this.router.navigate(
      ['/spaces']
    );
  }


  goBack(): void {

    this.router.navigate(
      ['/spaces']
    );
  }

}
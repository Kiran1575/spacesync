import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { AuthService } from '../../services/auth';
import { SpaceService } from '../../services/space';

import { Space } from '../../models/space';

import { handleImageError } from '../../shared/image-fallback';


@Component({
  selector: 'app-space-details',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './space-details.html',

  styleUrl: './space-details.css'
})


export class SpaceDetails implements OnInit {

  // ==========================================
  // COMPONENT STATE
  // ==========================================

  space: Space | null = null;

  isLoading = true;

  errorMessage = '';

  private spaceId = 0;


  // ==========================================
  // CONSTRUCTOR
  // ==========================================

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public spaceService: SpaceService,
    private cdr: ChangeDetectorRef
  ) {}


  // ==========================================
  // INITIALIZATION
  // ==========================================

  ngOnInit(): void {

    console.log('================================');
    console.log('SPACE DETAILS PAGE LOADED');
    console.log('CURRENT URL:', this.router.url);
    console.log('================================');


    const id =
      this.route.snapshot.paramMap.get('id');


    console.log(
      'SPACE ID FROM URL:',
      id
    );


    if (!id) {

      this.isLoading = false;

      this.errorMessage =
        'Space ID was not found.';

      this.cdr.detectChanges();

      return;
    }


    const parsedId =
      Number(id);


    if (
      !Number.isFinite(parsedId) ||
      parsedId <= 0
    ) {

      this.isLoading = false;

      this.errorMessage =
        'Invalid space ID.';

      this.cdr.detectChanges();

      return;
    }


    this.spaceId =
      parsedId;


    this.loadSpace(
      this.spaceId
    );
  }


  // ==========================================
  // LOAD SPACE
  // ==========================================

  loadSpace(id: number): void {

    console.log(
      'LOADING SPACE DETAILS:',
      id
    );


    this.isLoading = true;

    this.errorMessage = '';


    this.cdr.detectChanges();


    this.spaceService
      .getSpaceById(id)
      .subscribe({

        next: (response) => {

          console.log(
            'SPACE DETAILS RESPONSE:',
            response
          );


          this.space =
            response;


          this.isLoading =
            false;


          console.log(
            'SPACE LOADED:',
            this.space
          );


          console.log(
            'LOADING:',
            this.isLoading
          );


          // IMPORTANT:
          // Force Angular to update the page.

          this.cdr.detectChanges();
        },


        error: (error) => {

          console.error(
            'SPACE DETAILS ERROR:',
            error
          );


          this.space =
            null;


          this.isLoading =
            false;


          this.errorMessage =
            'Unable to load this space. Please try again.';


          // Force Angular to update the page.

          this.cdr.detectChanges();
        }

      });
  }


  // ==========================================
  // RETRY
  // ==========================================

  retry(): void {

    if (!this.spaceId) {

      return;
    }


    this.loadSpace(
      this.spaceId
    );
  }


  // ==========================================
  // SPACE INFORMATION
  // ==========================================

  getSpaceName(): string {

    return (
      this.space?.name ||
      'Workspace'
    );
  }


  getLocation(): string {

    return (
      this.space?.location ||
      'Location unavailable'
    );
  }


  getPrice(): string {

    if (
      this.space?.price !== undefined &&
      this.space?.price !== null
    ) {

      return `₹${this.space.price}`;
    }


    return 'Price unavailable';
  }


  getImage(): string {

    return this.spaceService
      .resolveImage(this.space);
  }


  // ==========================================
  // IMAGE ERROR
  // ==========================================

  onImageError(event: Event): void {

    handleImageError(event);
  }


  // ==========================================
  // BOOK SPACE
  // ==========================================

  bookSpace(): void {

    console.log('================================');
    console.log('BOOK SPACE CLICKED');
    console.log('CURRENT URL:', this.router.url);
    console.log('SPACE:', this.space);
    console.log('================================');


    // ==========================================
    // CHECK LOGIN
    // ==========================================

    if (
      !this.authService.isLoggedIn()
    ) {

      console.log(
        'USER NOT LOGGED IN'
      );


      this.router.navigate(
        ['/login'],
        {
          queryParams: {
            returnUrl:
              this.router.url
          }
        }
      );


      return;
    }


    // ==========================================
    // CHECK SPACE
    // ==========================================

    if (!this.space) {

      console.error(
        'BOOKING FAILED: SPACE NOT LOADED'
      );

      return;
    }


    // ==========================================
    // CHECK SPACE ID
    // ==========================================

    const spaceId =
      Number(this.space.id);


    if (
      !Number.isInteger(spaceId) ||
      spaceId <= 0
    ) {

      console.error(
        'BOOKING FAILED: INVALID SPACE ID',
        this.space.id
      );

      return;
    }


    console.log(
      'NAVIGATING TO BOOKING PAGE'
    );


    console.log(
      'SPACE ID:',
      spaceId
    );


    // ==========================================
    // NAVIGATE TO BOOKING
    // ==========================================

    this.router
      .navigate(
        ['/bookings'],
        {
          queryParams: {
            spaceId:
              spaceId
          }
        }
      )
      .then((success) => {

        console.log(
          'BOOKING NAVIGATION RESULT:',
          success
        );


        console.log(
          'NEW URL:',
          this.router.url
        );
      })
      .catch((error) => {

        console.error(
          'BOOKING NAVIGATION ERROR:',
          error
        );
      });
  }

}
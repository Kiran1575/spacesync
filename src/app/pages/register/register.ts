import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface RegisterResponse {
  id?: number;
  fullName?: string;
  email?: string;
  role?: string;
  message?: string;
}

interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  // ==========================================
  // FORM DATA
  // ==========================================

  fullName: string = '';
  email: string = '';
  password: string = '';
  agreeTerms: boolean = false;


  // ==========================================
  // UI STATE
  // ==========================================

  showPassword: boolean = false;
  isLoading: boolean = false;


  // ==========================================
  // MESSAGES
  // ==========================================

  successMessage: string = '';
  errorMessage: string = '';


  // ==========================================
  // BACKEND API
  // ==========================================

private readonly apiUrl = 'https://spacesync-backend-production.up.railway.app/api/users';


  // ==========================================
  // CONSTRUCTOR
  // ==========================================

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}


  // ==========================================
  // REGISTER
  // ==========================================

  register(): void {

    // Clear previous messages
    this.successMessage = '';
    this.errorMessage = '';


    // ========================================
    // VALIDATION
    // ========================================

    if (!this.fullName.trim()) {

      this.errorMessage =
        'Please enter your full name.';

      return;
    }


    if (!this.email.trim()) {

      this.errorMessage =
        'Please enter your email address.';

      return;
    }


    if (!this.isValidEmail(this.email)) {

      this.errorMessage =
        'Please enter a valid email address.';

      return;
    }


    if (!this.password) {

      this.errorMessage =
        'Please enter a password.';

      return;
    }


    if (this.password.length < 6) {

      this.errorMessage =
        'Password must contain at least 6 characters.';

      return;
    }


    if (!this.agreeTerms) {

      this.errorMessage =
        'Please agree to the Terms & Conditions.';

      return;
    }


    // ========================================
    // START LOADING
    // ========================================

    this.isLoading = true;


    // ========================================
    // REQUEST DATA
    // ========================================

    const userData: RegisterRequest = {

      fullName: this.fullName.trim(),

      email: this.email.trim(),

      password: this.password,

      role: 'USER'

    };


    console.log(
      'Sending registration request:',
      userData
    );


    // ========================================
    // API CALL
    // ========================================

    this.http
      .post<RegisterResponse>(
        `${this.apiUrl}/register`,
        userData
      )
      .subscribe({

        // ====================================
        // SUCCESS
        // ====================================

        next: (response: RegisterResponse) => {

          console.log(
            'REGISTRATION SUCCESS:',
            response
          );


          this.isLoading = false;

          this.errorMessage = '';


          // Show success feedback
          this.successMessage =
            'Account created successfully! You can now log in to SpaceSync.';


          // Clear form
          this.fullName = '';
          this.email = '';
          this.password = '';
          this.agreeTerms = false;
          this.showPassword = false;


          // Redirect to login after 3 seconds
          setTimeout(() => {

            this.router.navigate(['/login']);

          }, 3000);

        },


        // ====================================
        // ERROR
        // ====================================

        error: (error: any) => {

          console.error(
            'REGISTRATION ERROR:',
            error
          );


          this.isLoading = false;

          this.successMessage = '';


          // ----------------------------------
          // Backend returned message
          // ----------------------------------

          if (error?.error?.message) {

            this.errorMessage =
              error.error.message;

          }


          // ----------------------------------
          // Backend returned string
          // ----------------------------------

          else if (
            typeof error?.error === 'string' &&
            error.error.trim()
          ) {

            this.errorMessage =
              error.error;

          }


          // ----------------------------------
          // Duplicate email
          // ----------------------------------

          else if (error?.status === 409) {

            this.errorMessage =
              'This email is already registered. Please login or use another email.';

          }


          // ----------------------------------
          // Server error
          // ----------------------------------

          else if (error?.status === 500) {

            this.errorMessage =
              'Registration could not be completed. The email may already be registered.';

          }


          // ----------------------------------
          // Backend unavailable
          // ----------------------------------

          else if (error?.status === 0) {

            this.errorMessage =
              'Cannot connect to the server. Please make sure the backend is running.';

          }


          // ----------------------------------
          // Other errors
          // ----------------------------------

          else {

            this.errorMessage =
              'Registration failed. Please check your details and try again.';

          }

        }

      });

  }


  // ==========================================
  // EMAIL VALIDATION
  // ==========================================

  private isValidEmail(email: string): boolean {

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email.trim());

  }

}
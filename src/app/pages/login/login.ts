import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    FormsModule,
    RouterModule
  ],

  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  credentials = {
    email: '',
    password: ''
  };

  showPassword = false;

  isLoading = false;

  successMessage = '';

  errorMessage = '';


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  login(): void {

    this.successMessage = '';

    this.errorMessage = '';


    if (!this.credentials.email.trim()) {

      this.errorMessage =
        'Please enter your email address.';

      return;
    }


    if (!this.credentials.password) {

      this.errorMessage =
        'Please enter your password.';

      return;
    }


    this.isLoading = true;


    this.authService
      .login(this.credentials)
      .subscribe({

        next: (response: any) => {

          console.log(
            'LOGIN SUCCESS:',
            response
          );


          /*
           * User is already saved by AuthService.
           */

          const user =
            this.authService.getCurrentUser();


          console.log(
            'CURRENT USER:',
            user
          );


          console.log(
            'CURRENT USER ID:',
            this.authService.getUserId()
          );


          this.isLoading = false;

          this.errorMessage = '';

          this.successMessage =
            'Login successful! Welcome back to SpaceSync.';


          setTimeout(() => {

            this.router.navigate([
              '/dashboard'
            ]);

          }, 1000);

        },


        error: (error: any) => {

          console.error(
            'LOGIN ERROR:',
            error
          );


          this.isLoading = false;

          this.successMessage = '';


          if (error?.error?.message) {

            this.errorMessage =
              error.error.message;

          }

          else if (error?.status === 401) {

            this.errorMessage =
              'Invalid email or password. Please try again.';

          }

          else {

            this.errorMessage =
              'Login failed. Please check your details and try again.';

          }

        }

      });
  }
}
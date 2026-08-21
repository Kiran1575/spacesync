import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth';

@Component({

  selector: 'app-profile',

  standalone: true,

  imports: [

    FormsModule

  ],

  templateUrl: './profile.html',

  styleUrl: './profile.css'

})

export class Profile {

  // ======================================

  // PANEL STATES

  // ======================================

  showChangePassword = false;

  showForgotPassword = false;

  showChangeEmail = false;



  // ======================================

  // PASSWORD VISIBILITY

  // ======================================

  showCurrentPassword = false;

  showNewPassword = false;

  showConfirmPassword = false;

  showForgotNewPassword = false;

  showForgotConfirmPassword = false;



  // ======================================

  // SUCCESS / FAIL POPUP

  // ======================================

  showSuccessPopup = false;

  successPopupMessage = '';

  popupType: 'success' | 'error' = 'success';

  private popupTimer: any;



  // ======================================

  // CHANGE PASSWORD FORM

  // ======================================

  currentPassword = '';

  newPassword = '';

  confirmPassword = '';



  // ======================================

  // FORGOT PASSWORD FORM

  // ======================================

  forgotEmail = '';

  forgotNewPassword = '';

  forgotConfirmPassword = '';



  // ======================================

  // CHANGE EMAIL FORM

  // ======================================

  newEmail = '';



  // ======================================

  // INLINE MESSAGES

  // ======================================

  passwordMessage = '';

  passwordError = '';

  forgotMessage = '';

  forgotError = '';

  emailMessage = '';

  emailError = '';



  // ======================================

  // CONSTRUCTOR

  // ======================================

  constructor(

    private authService: AuthService,

    private router: Router

  ) {}



  // ======================================

  // SUCCESS / FAIL POPUP

  // ======================================

  showPopup(message: string, type: 'success' | 'error' = 'success'): void {

    this.successPopupMessage = message;

    this.popupType = type;

    this.showSuccessPopup = true;

    // Clear previous timer if popup is

    // triggered again before 3 seconds

    if (this.popupTimer) {

      clearTimeout(this.popupTimer);

    }

    this.popupTimer = setTimeout(() => {

      this.showSuccessPopup = false;

    }, 3000);

  }



  closePopup(): void {

    this.showSuccessPopup = false;

    if (this.popupTimer) {

      clearTimeout(this.popupTimer);

      this.popupTimer = null;

    }

  }



  // ======================================

  // CURRENT USER

  // ======================================

  getUser(): any {

    return this.authService.getCurrentUser();

  }



  getFullName(): string {

    const user = this.getUser();

    return user?.fullName || 'User';

  }



  getEmail(): string {

    const user = this.getUser();

    return user?.email || 'Email unavailable';

  }



  getUserId(): number | string {

    const user = this.getUser();

    return user?.id ?? 'N/A';

  }



  getRole(): string {

    const user = this.getUser();

    return user?.role || 'USER';

  }



  getInitial(): string {

    const name = this.getFullName();

    if (!name || name === 'User') {

      return 'U';

    }

    return name

      .trim()

      .charAt(0)

      .toUpperCase();

  }



  // ======================================

  // TOGGLE CHANGE PASSWORD

  // ======================================

  toggleChangePassword(): void {

    this.showChangePassword =

      !this.showChangePassword;

    this.passwordMessage = '';

    this.passwordError = '';

    if (this.showChangePassword) {

      this.showForgotPassword = false;

      this.showChangeEmail = false;

    }

  }



  // ======================================

  // TOGGLE FORGOT PASSWORD

  // ======================================

  toggleForgotPassword(): void {

    this.showForgotPassword =

      !this.showForgotPassword;

    this.forgotMessage = '';

    this.forgotError = '';

    if (this.showForgotPassword) {

      this.showChangePassword = false;

      this.showChangeEmail = false;

      this.forgotEmail =

        this.getEmail();

    }

  }



  // ======================================

  // TOGGLE CHANGE EMAIL

  // ======================================

  toggleChangeEmail(): void {

    this.showChangeEmail =

      !this.showChangeEmail;

    this.emailMessage = '';

    this.emailError = '';

    if (this.showChangeEmail) {

      this.showChangePassword = false;

      this.showForgotPassword = false;

    }

  }



  // ======================================

  // PASSWORD VISIBILITY

  // ======================================

  toggleCurrentPassword(): void {

    this.showCurrentPassword =

      !this.showCurrentPassword;

  }



  toggleNewPassword(): void {

    this.showNewPassword =

      !this.showNewPassword;

  }



  toggleConfirmPassword(): void {

    this.showConfirmPassword =

      !this.showConfirmPassword;

  }



  toggleForgotNewPassword(): void {

    this.showForgotNewPassword =

      !this.showForgotNewPassword;

  }



  toggleForgotConfirmPassword(): void {

    this.showForgotConfirmPassword =

      !this.showForgotConfirmPassword;

  }



  // ======================================

  // CHANGE PASSWORD

  // ======================================

  submitChangePassword(): void {

    this.passwordMessage = '';

    this.passwordError = '';



    // Validate current and new password

    if (

      !this.currentPassword.trim() ||

      !this.newPassword.trim()

    ) {

      this.passwordError =

        'Please enter your current and new password.';

      this.showPopup(this.passwordError, 'error');

      return;

    }



    // Confirm password

    if (

      this.newPassword !==

      this.confirmPassword

    ) {

      this.passwordError =

        'New passwords do not match.';

      this.showPopup(this.passwordError, 'error');

      return;

    }



    // Call backend

    this.authService

      .changePassword(

        this.currentPassword,

        this.newPassword

      )

      .subscribe({

        next: (response) => {

          this.passwordMessage =

            response?.message ||

            'Password changed successfully.';



          // SUCCESS POPUP

          this.showPopup(

            'Password updated successfully.',

            'success'

          );



          // Clear form

          this.currentPassword = '';

          this.newPassword = '';

          this.confirmPassword = '';



          // Reset password visibility

          this.showCurrentPassword = false;

          this.showNewPassword = false;

          this.showConfirmPassword = false;

        },



        error: (error) => {

          console.error(

            'CHANGE PASSWORD ERROR:',

            error

          );



          this.passwordError =

            error?.error?.message ||

            error?.error?.error ||

            'Unable to change password.';



          // FAIL POPUP

          this.showPopup(this.passwordError, 'error');

        }

      });

  }



  // ======================================

  // FORGOT PASSWORD

  // ======================================

  submitForgotPassword(): void {

    this.forgotMessage = '';

    this.forgotError = '';



    // Validate email

    if (

      !this.forgotEmail.trim()

    ) {

      this.forgotError =

        'Please enter your registered email.';

      this.showPopup(this.forgotError, 'error');

      return;

    }



    // Validate new password

    if (

      !this.forgotNewPassword.trim()

    ) {

      this.forgotError =

        'Please enter a new password.';

      this.showPopup(this.forgotError, 'error');

      return;

    }



    // Confirm password

    if (

      this.forgotNewPassword !==

      this.forgotConfirmPassword

    ) {

      this.forgotError =

        'New passwords do not match.';

      this.showPopup(this.forgotError, 'error');

      return;

    }



    // Call backend

    this.authService

      .forgotPassword(

        this.forgotEmail,

        this.forgotNewPassword

      )

      .subscribe({

        next: (response) => {

          this.forgotMessage =

            response?.message ||

            'Password reset successfully.';



          // SUCCESS POPUP

          this.showPopup(

            'Password reset successfully.',

            'success'

          );



          // Clear form

          this.forgotNewPassword = '';

          this.forgotConfirmPassword = '';



          // Reset visibility

          this.showForgotNewPassword = false;

          this.showForgotConfirmPassword = false;

        },



        error: (error) => {

          console.error(

            'FORGOT PASSWORD ERROR:',

            error

          );



          this.forgotError =

            error?.error?.message ||

            error?.error?.error ||

            'Unable to reset password.';



          // FAIL POPUP

          this.showPopup(this.forgotError, 'error');

        }

      });

  }



  // ======================================

  // CHANGE EMAIL

  // ======================================

  submitChangeEmail(): void {

    this.emailMessage = '';

    this.emailError = '';



    // Validate email

    if (

      !this.newEmail.trim()

    ) {

      this.emailError =

        'Please enter a new email address.';

      this.showPopup(this.emailError, 'error');

      return;

    }



    // Check if email is same

    if (

      this.newEmail.trim().toLowerCase() ===

      this.getEmail().trim().toLowerCase()

    ) {

      this.emailError =

        'Please enter a different email address.';

      this.showPopup(this.emailError, 'error');

      return;

    }



    // Basic email validation

    const emailPattern =

      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



    if (

      !emailPattern.test(

        this.newEmail.trim()

      )

    ) {

      this.emailError =

        'Please enter a valid email address.';

      this.showPopup(this.emailError, 'error');

      return;

    }



    // Call backend

    this.authService

      .changeEmail(

        this.newEmail.trim()

      )

      .subscribe({

        next: (updatedUser) => {

          this.emailMessage =

            'Email address changed successfully.';



          // SUCCESS POPUP

          this.showPopup(

            'Email updated successfully.',

            'success'

          );



          // Clear field

          this.newEmail = '';



          // Update local user information

          if (updatedUser) {

            localStorage.setItem(

              'currentUser',

              JSON.stringify(updatedUser)

            );

          }

        },



        error: (error) => {

          console.error(

            'CHANGE EMAIL ERROR:',

            error

          );



          this.emailError =

            error?.error?.message ||

            error?.error?.error ||

            'Unable to change email address.';



          // FAIL POPUP

          this.showPopup(this.emailError, 'error');

        }

      });

  }



  // ======================================

  // LOGOUT

  // ======================================

  logout(): void {

    this.authService.logout();

    this.router.navigate(

      ['/login']

    );

  }

}
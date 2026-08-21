import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl =
    'http://localhost:8080/api/users';

  constructor(
    private http: HttpClient
  ) {}


  // =========================================
  // REGISTER
  // =========================================

  register(user: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/register`,
      user
    );

  }


  // =========================================
  // LOGIN
  // =========================================

  login(user: any): Observable<any> {

    return this.http
      .post<any>(
        `${this.apiUrl}/login`,
        user
      )
      .pipe(

        tap((response) => {

          localStorage.setItem(
            'currentUser',
            JSON.stringify(response)
          );

        })

      );

  }


  // =========================================
  // GET CURRENT USER
  // =========================================

  getCurrentUser(): any {

    const user =
      localStorage.getItem(
        'currentUser'
      );

    if (!user) {
      return null;
    }

    try {

      return JSON.parse(user);

    } catch (error) {

      console.error(
        'ERROR READING CURRENT USER:',
        error
      );

      return null;

    }

  }


  // =========================================
  // GET USER ID
  // =========================================

  getUserId(): number | null {

    const user =
      this.getCurrentUser();

    if (!user) {
      return null;
    }

    return user.id ?? null;

  }


  // =========================================
  // CHECK LOGIN
  // =========================================

  isLoggedIn(): boolean {

    return this.getCurrentUser() !== null;

  }


  // =========================================
  // CHANGE PASSWORD
  // =========================================

  changePassword(
    currentPassword: string,
    newPassword: string
  ): Observable<any> {

    const userId =
      this.getUserId();

    if (userId === null) {

      throw new Error(
        'User is not logged in'
      );

    }

    return this.http.put<any>(

      `${this.apiUrl}/${userId}/change-password`,

      {
        currentPassword: currentPassword,
        newPassword: newPassword
      }

    );

  }


  // =========================================
  // FORGOT PASSWORD
  // =========================================

  forgotPassword(
    email: string,
    newPassword: string
  ): Observable<any> {

    return this.http.put<any>(

      `${this.apiUrl}/forgot-password`,

      {
        email: email,
        newPassword: newPassword
      }

    );

  }


  // =========================================
  // CHANGE EMAIL
  // =========================================

  changeEmail(
    newEmail: string
  ): Observable<any> {

    const userId =
      this.getUserId();

    if (userId === null) {

      throw new Error(
        'User is not logged in'
      );

    }

    return this.http
      .put<any>(

        `${this.apiUrl}/${userId}/change-email`,

        {
          newEmail: newEmail
        }

      )
      .pipe(

        tap((updatedUser) => {

          localStorage.setItem(
            'currentUser',
            JSON.stringify(updatedUser)
          );

        })

      );

  }


  // =========================================
  // LOGOUT
  // =========================================

  logout(): void {

    localStorage.removeItem(
      'currentUser'
    );

  }

}
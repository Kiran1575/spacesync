import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  userName: string = 'User';

constructor() {

  const savedUser =
    localStorage.getItem('currentUser');

  if (savedUser) {

    const user = JSON.parse(savedUser);

    this.userName =
      user.fullName || user.name || 'User';

  }

}
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css'
})
export class Testimonials {

  reviews = [

    {
      name: 'Rahul Sharma',
      role: 'Software Engineer',
      comment: 'Booking a workspace was incredibly easy. The platform is fast and intuitive.',
      rating: 5
    },

    {
      name: 'Priya Patil',
      role: 'College Student',
      comment: 'Perfect for finding quiet study rooms before exams.',
      rating: 5
    },

    {
      name: 'Amit Deshmukh',
      role: 'Startup Founder',
      comment: 'Meeting room booking was seamless. Clean UI and great experience.',
      rating: 5
    }

  ];

}
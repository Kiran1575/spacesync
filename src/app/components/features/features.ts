import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.html',
  styleUrl: './features.css'
})
export class Features {

  features = [

    {
      icon: '⚡',
      title: 'Instant Booking',
      description: 'Book your preferred space within seconds.'
    },

    {
      icon: '🔒',
      title: 'Secure Access',
      description: 'Safe and verified spaces for everyone.'
    },

    {
      icon: '📍',
      title: 'Multiple Locations',
      description: 'Find spaces across different cities.'
    },

    {
      icon: '⭐',
      title: 'Verified Spaces',
      description: 'Only trusted and highly rated workspaces.'
    }

  ];

}
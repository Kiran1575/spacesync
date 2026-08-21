import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purpose-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purpose-selector.html',
  styleUrl: './purpose-selector.css'
})
export class PurposeSelector {

  purposes = [

    {
      icon: '🏢',
      title: 'Coworking',
      description: 'Modern desks for professionals'
    },

    {
      icon: '📚',
      title: 'Study',
      description: 'Quiet study rooms'
    },

    {
      icon: '👥',
      title: 'Discussion',
      description: 'Group discussion spaces'
    },

    {
      icon: '🎤',
      title: 'Meeting',
      description: 'Meeting & conference rooms'
    }

  ];

}
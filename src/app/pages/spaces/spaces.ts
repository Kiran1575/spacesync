import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { SpaceService } from '../../services/space';
import { Space } from '../../models/space';
import { handleImageError } from '../../shared/image-fallback';

@Component({

  selector: 'app-spaces',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './spaces.html',

  styleUrl: './spaces.css'

})


export class Spaces implements OnInit {

  spaces: Space[] = [];

  loading = true;

  errorMessage = '';


  constructor(
  private spaceService: SpaceService,
  private router: Router,
  private cdr: ChangeDetectorRef
) {}


  ngOnInit(): void {

    this.loadSpaces();

  }


 loadSpaces(): void {

  this.loading = true;
  this.errorMessage = '';

  this.spaceService.getAllSpaces().subscribe({

    next: (data: Space[]) => {

      console.log('SPACES RESPONSE:', data);

      this.spaces = Array.isArray(data) ? data : [];

      this.loading = false;

      console.log('SPACES LOADED:', this.spaces);
      console.log('LOADING:', this.loading);

      // Force Angular to refresh the page
      this.cdr.detectChanges();

    },

    error: (error) => {

      console.error('SPACES API ERROR:', error);

      this.spaces = [];
      this.loading = false;

      this.errorMessage =
        'Unable to load spaces. Please make sure the backend is running.';

      this.cdr.detectChanges();

    }

  });

}


  getImage(space: Space): string {

    return this.spaceService.resolveImage(space);

  }


  onImageError(event: Event): void {

    handleImageError(event);

  }


  viewDetails(id: number): void {

    this.router.navigate(['/spaces', id]);

  }

}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SpaceService } from '../../services/space';
import { Space } from '../../models/space';
import { handleImageError } from '../../shared/image-fallback';

@Component({
  selector: 'app-featured-spaces',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './featured-spaces.html',
  styleUrl: './featured-spaces.css'
})
export class FeaturedSpaces implements OnInit {

  spaces: Space[] = [];
  loading = true;
  errorMessage = '';

  constructor(private spaceService: SpaceService) {}

  ngOnInit(): void {
    this.loadFeatured();
  }

  loadFeatured(): void {

    this.loading = true;
    this.errorMessage = '';

    this.spaceService.getAllSpaces().subscribe({

      next: (data) => {

        console.log('FEATURED SPACES:', data);

        this.spaces =
          Array.isArray(data)
            ? data.slice(0, 4)
            : [];

        this.loading = false;
      },

      error: (error) => {

        console.error(
          'FEATURED SPACES ERROR:',
          error
        );

        this.spaces = [];

        this.loading = false;

        this.errorMessage =
          'Unable to load spaces right now.';
      }

    });
  }

  getImage(space: Space): string {

    return this.spaceService.resolveImage(space);
  }

  onImageError(event: Event): void {

    handleImageError(event);
  }

}
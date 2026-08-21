import { Component } from '@angular/core';

import { Hero } from '../../components/hero/hero';
import { PurposeSelector } from '../../components/purpose-selector/purpose-selector';
import { FeaturedSpaces } from '../../components/featured-spaces/featured-spaces';
import { Features } from '../../components/features/features';
import { Testimonials } from '../../components/testimonials/testimonials';
import { Cta } from '../../components/cta/cta';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Hero,
    PurposeSelector,
    FeaturedSpaces,
    Features,
    Testimonials,
    Cta,
    Footer
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}
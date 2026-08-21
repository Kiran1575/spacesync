import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedSpaces } from './featured-spaces';

describe('FeaturedSpaces', () => {
  let component: FeaturedSpaces;
  let fixture: ComponentFixture<FeaturedSpaces>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedSpaces],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedSpaces);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

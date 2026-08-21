import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurposeSelector } from './purpose-selector';

describe('PurposeSelector', () => {
  let component: PurposeSelector;
  let fixture: ComponentFixture<PurposeSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurposeSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(PurposeSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

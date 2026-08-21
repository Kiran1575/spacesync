import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceAssistant } from './workspace-assistant';

describe('WorkspaceAssistant', () => {
  let component: WorkspaceAssistant;
  let fixture: ComponentFixture<WorkspaceAssistant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceAssistant],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkspaceAssistant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

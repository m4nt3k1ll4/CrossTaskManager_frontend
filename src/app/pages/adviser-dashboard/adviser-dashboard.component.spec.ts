import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviserDashboardComponent } from './adviser-dashboard.component';

describe('AdviserDashboardComponent', () => {
  let component: AdviserDashboardComponent;
  let fixture: ComponentFixture<AdviserDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdviserDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdviserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

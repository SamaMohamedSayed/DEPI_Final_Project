import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvJobsComponent } from './av-jobs.component';

describe('AvJobsComponent', () => {
  let component: AvJobsComponent;
  let fixture: ComponentFixture<AvJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvJobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

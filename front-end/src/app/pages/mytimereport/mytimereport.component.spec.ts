import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MytimereportComponent } from './mytimereport.component';

describe('MytimereportComponent', () => {
  let component: MytimereportComponent;
  let fixture: ComponentFixture<MytimereportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MytimereportComponent]
    });
    fixture = TestBed.createComponent(MytimereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

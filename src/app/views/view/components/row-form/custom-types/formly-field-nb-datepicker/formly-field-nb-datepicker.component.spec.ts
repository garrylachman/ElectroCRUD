import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormlyFieldNbDatepickerComponent } from './formly-field-nb-datepicker.component';

describe('FormlyFieldNbDatepickerComponent', () => {
  let component: FormlyFieldNbDatepickerComponent;
  let fixture: ComponentFixture<FormlyFieldNbDatepickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormlyFieldNbDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyFieldNbDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

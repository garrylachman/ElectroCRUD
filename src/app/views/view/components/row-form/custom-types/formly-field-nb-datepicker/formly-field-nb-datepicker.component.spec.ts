import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldNbDatepickerComponent } from './formly-field-nb-datepicker.component';

describe('FormlyFieldNbDatepickerComponent', () => {
  let component: FormlyFieldNbDatepickerComponent;
  let fixture: ComponentFixture<FormlyFieldNbDatepickerComponent>;

  beforeEach(async(() => {
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

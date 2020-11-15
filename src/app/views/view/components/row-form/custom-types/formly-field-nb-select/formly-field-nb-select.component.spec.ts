import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormlyFieldNbSelectComponent } from './formly-field-nb-select.component';

describe('FormlyFieldNbSelectComponent', () => {
  let component: FormlyFieldNbSelectComponent;
  let fixture: ComponentFixture<FormlyFieldNbSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormlyFieldNbSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyFieldNbSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

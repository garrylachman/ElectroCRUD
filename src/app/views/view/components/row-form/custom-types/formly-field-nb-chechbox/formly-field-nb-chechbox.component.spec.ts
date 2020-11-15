import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormlyFieldNbChechboxComponent } from './formly-field-nb-chechbox.component';

describe('FormlyFieldNbChechboxComponent', () => {
  let component: FormlyFieldNbChechboxComponent;
  let fixture: ComponentFixture<FormlyFieldNbChechboxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormlyFieldNbChechboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyFieldNbChechboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormlyFieldNbTextareaComponent } from './formly-field-nb-textarea.component';

describe('FormlyFieldNbTextareaComponent', () => {
  let component: FormlyFieldNbTextareaComponent;
  let fixture: ComponentFixture<FormlyFieldNbTextareaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormlyFieldNbTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyFieldNbTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

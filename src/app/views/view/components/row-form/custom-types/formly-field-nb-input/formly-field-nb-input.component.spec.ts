import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldNbInputComponent } from './formly-field-nb-input.component';

describe('FormlyFieldNbInputComponent', () => {
  let component: FormlyFieldNbInputComponent;
  let fixture: ComponentFixture<FormlyFieldNbInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormlyFieldNbInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyFieldNbInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddEditWidgetModalComponent } from './add-edit-widget-modal.component';

describe('AddEditWidgetModalComponent', () => {
  let component: AddEditWidgetModalComponent;
  let fixture: ComponentFixture<AddEditWidgetModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditWidgetModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditWidgetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

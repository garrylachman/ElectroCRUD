import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditWidgetModalComponent } from './add-edit-widget-modal.component';

describe('AddEditWidgetModalComponent', () => {
  let component: AddEditWidgetModalComponent;
  let fixture: ComponentFixture<AddEditWidgetModalComponent>;

  beforeEach(async(() => {
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

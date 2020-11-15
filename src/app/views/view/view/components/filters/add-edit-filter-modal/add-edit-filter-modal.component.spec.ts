import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddEditFilterModalComponent } from './add-edit-filter-modal.component';

describe('AddEditFilterModalComponent', () => {
  let component: AddEditFilterModalComponent;
  let fixture: ComponentFixture<AddEditFilterModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditFilterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

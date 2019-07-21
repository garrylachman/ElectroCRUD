import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFilterModalComponent } from './add-edit-filter-modal.component';

describe('AddEditFilterModalComponent', () => {
  let component: AddEditFilterModalComponent;
  let fixture: ComponentFixture<AddEditFilterModalComponent>;

  beforeEach(async(() => {
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

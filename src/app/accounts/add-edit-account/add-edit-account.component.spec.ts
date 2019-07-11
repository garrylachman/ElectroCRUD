import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAccountComponent } from './add-edit-account.component';

describe('AddEditAccountComponent', () => {
  let component: AddEditAccountComponent;
  let fixture: ComponentFixture<AddEditAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

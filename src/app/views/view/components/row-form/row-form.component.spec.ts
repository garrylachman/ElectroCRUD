import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RowFormComponent } from './row-form.component';

describe('RowFormComponent', () => {
  let component: RowFormComponent;
  let fixture: ComponentFixture<RowFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RowFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

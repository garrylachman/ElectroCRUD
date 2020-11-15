import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewEditComponent } from './edit.component';

describe('ViewEditComponent', () => {
  let component: ViewEditComponent;
  let fixture: ComponentFixture<ViewEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

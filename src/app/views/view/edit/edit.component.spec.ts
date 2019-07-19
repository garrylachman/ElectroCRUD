import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditComponent } from './edit.component';

describe('ViewEditComponent', () => {
  let component: ViewEditComponent;
  let fixture: ComponentFixture<ViewEditComponent>;

  beforeEach(async(() => {
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

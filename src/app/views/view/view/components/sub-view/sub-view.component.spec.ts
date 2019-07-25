import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubViewComponent } from './sub-view.component';

describe('SubViewComponent', () => {
  let component: SubViewComponent;
  let fixture: ComponentFixture<SubViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

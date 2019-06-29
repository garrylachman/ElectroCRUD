import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureComponent } from './configure.component';

describe('ConfigureComponent', () => {
  let component: ConfigureComponent;
  let fixture: ComponentFixture<ConfigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

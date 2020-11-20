import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionViewComponent } from './extension-view.component';

describe('ExtensionViewComponent', () => {
  let component: ExtensionViewComponent;
  let fixture: ComponentFixture<ExtensionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtensionViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtensionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

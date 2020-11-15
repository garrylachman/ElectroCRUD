import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ColumnReferanceDialogComponent } from './column-referance-dialog.component';

describe('ColumnReferanceDialogComponent', () => {
  let component: ColumnReferanceDialogComponent;
  let fixture: ComponentFixture<ColumnReferanceDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnReferanceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnReferanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

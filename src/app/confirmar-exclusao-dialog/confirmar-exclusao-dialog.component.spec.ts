import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarExclusaoDialogComponent } from './confirmar-exclusao-dialog.component';

describe('ConfirmarExclusaoDialogComponent', () => {
  let component: ConfirmarExclusaoDialogComponent;
  let fixture: ComponentFixture<ConfirmarExclusaoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmarExclusaoDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmarExclusaoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

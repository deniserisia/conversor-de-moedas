import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHistoricoComponent } from './page-historico.component';

describe('PageHistoricoComponent', () => {
  let component: PageHistoricoComponent;
  let fixture: ComponentFixture<PageHistoricoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageHistoricoComponent]
    });
    fixture = TestBed.createComponent(PageHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageContatoComponent } from './page-contato.component';

describe('PageContatoComponent', () => {
  let component: PageContatoComponent;
  let fixture: ComponentFixture<PageContatoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageContatoComponent]
    });
    fixture = TestBed.createComponent(PageContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

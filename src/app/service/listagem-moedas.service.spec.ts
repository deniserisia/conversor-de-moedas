import { TestBed } from '@angular/core/testing';

import { ListagemMoedasService } from './listagem-moedas.service';

describe('ListagemMoedasService', () => {
  let service: ListagemMoedasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListagemMoedasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

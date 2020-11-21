import { TestBed } from '@angular/core/testing';

import { CartItemsToDBService } from './cart-items-to-db.service';

describe('CartItemsToDBService', () => {
  let service: CartItemsToDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartItemsToDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

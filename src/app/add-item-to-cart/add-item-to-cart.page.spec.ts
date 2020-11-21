import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddItemToCartPage } from './add-item-to-cart.page';

describe('AddItemToCartPage', () => {
  let component: AddItemToCartPage;
  let fixture: ComponentFixture<AddItemToCartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemToCartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddItemToCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

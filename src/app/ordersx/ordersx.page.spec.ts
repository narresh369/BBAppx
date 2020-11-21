import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrdersxPage } from './ordersx.page';

describe('OrdersxPage', () => {
  let component: OrdersxPage;
  let fixture: ComponentFixture<OrdersxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

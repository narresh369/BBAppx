import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BillCartListPage } from './bill-cart-list.page';

describe('BillCartListPage', () => {
  let component: BillCartListPage;
  let fixture: ComponentFixture<BillCartListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillCartListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BillCartListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

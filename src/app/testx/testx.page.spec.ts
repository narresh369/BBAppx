import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestxPage } from './testx.page';

describe('TestxPage', () => {
  let component: TestxPage;
  let fixture: ComponentFixture<TestxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

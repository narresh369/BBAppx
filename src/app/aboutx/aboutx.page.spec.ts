import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AboutxPage } from './aboutx.page';

describe('AboutxPage', () => {
  let component: AboutxPage;
  let fixture: ComponentFixture<AboutxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

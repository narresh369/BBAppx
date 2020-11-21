import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SplashxPage } from './splashx.page';

describe('SplashxPage', () => {
  let component: SplashxPage;
  let fixture: ComponentFixture<SplashxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplashxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SplashxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

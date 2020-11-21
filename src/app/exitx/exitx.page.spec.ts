import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExitxPage } from './exitx.page';

describe('ExitxPage', () => {
  let component: ExitxPage;
  let fixture: ComponentFixture<ExitxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExitxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

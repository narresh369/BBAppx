import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomexshellPage } from './homexshell.page';

describe('HomexshellPage', () => {
  let component: HomexshellPage;
  let fixture: ComponentFixture<HomexshellPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomexshellPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomexshellPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

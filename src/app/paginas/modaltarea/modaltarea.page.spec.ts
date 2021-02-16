import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModaltareaPage } from './modaltarea.page';

describe('ModaltareaPage', () => {
  let component: ModaltareaPage;
  let fixture: ComponentFixture<ModaltareaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaltareaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModaltareaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

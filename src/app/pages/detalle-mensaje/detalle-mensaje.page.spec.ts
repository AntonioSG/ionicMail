import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalleMensajePage } from './detalle-mensaje.page';

describe('DetalleMensajePage', () => {
  let component: DetalleMensajePage;
  let fixture: ComponentFixture<DetalleMensajePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleMensajePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleMensajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListadoMensajesPage } from './listado-mensajes.page';

describe('ListadoMensajesPage', () => {
  let component: ListadoMensajesPage;
  let fixture: ComponentFixture<ListadoMensajesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoMensajesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoMensajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

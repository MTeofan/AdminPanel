import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KundenlisteComponent } from './kundenliste.component';

describe('KundenlisteComponent', () => {
  let component: KundenlisteComponent;
  let fixture: ComponentFixture<KundenlisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KundenlisteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KundenlisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

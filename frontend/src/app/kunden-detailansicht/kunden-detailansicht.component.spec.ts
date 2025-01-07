import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KundenDetailansichtComponent } from './kunden-detailansicht.component';

describe('KundenDetailansichtComponent', () => {
  let component: KundenDetailansichtComponent;
  let fixture: ComponentFixture<KundenDetailansichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KundenDetailansichtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KundenDetailansichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

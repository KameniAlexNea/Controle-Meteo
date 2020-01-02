import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoActuelleComponent } from './meteo-actuelle.component';

describe('MeteoActuelleComponent', () => {
  let component: MeteoActuelleComponent;
  let fixture: ComponentFixture<MeteoActuelleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeteoActuelleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeteoActuelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

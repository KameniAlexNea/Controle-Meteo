import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayVilleComponent } from './display-ville.component';

describe('DisplayVilleComponent', () => {
  let component: DisplayVilleComponent;
  let fixture: ComponentFixture<DisplayVilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayVilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayVilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

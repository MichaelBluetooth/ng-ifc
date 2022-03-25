import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesDisplayComponent } from './properties-display.component';

describe('PropertiesDisplayComponent', () => {
  let component: PropertiesDisplayComponent;
  let fixture: ComponentFixture<PropertiesDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

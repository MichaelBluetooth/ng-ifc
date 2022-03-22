import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTypesComponent } from './component-types.component';

describe('ComponentTypesComponent', () => {
  let component: ComponentTypesComponent;
  let fixture: ComponentFixture<ComponentTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IfcViewer2Component } from './ifc-viewer2.component';

describe('IfcViewer2Component', () => {
  let component: IfcViewer2Component;
  let fixture: ComponentFixture<IfcViewer2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IfcViewer2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IfcViewer2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

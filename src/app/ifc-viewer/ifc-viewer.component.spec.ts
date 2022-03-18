import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IfcViewerComponent } from './ifc-viewer.component';

describe('IfcViewerComponent', () => {
  let component: IfcViewerComponent;
  let fixture: ComponentFixture<IfcViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IfcViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IfcViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

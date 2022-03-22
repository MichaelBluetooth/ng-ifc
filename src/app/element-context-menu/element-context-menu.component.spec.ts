import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementContextMenuComponent } from './element-context-menu.component';

describe('ElementContextMenuComponent', () => {
  let component: ElementContextMenuComponent;
  let fixture: ComponentFixture<ElementContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementContextMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

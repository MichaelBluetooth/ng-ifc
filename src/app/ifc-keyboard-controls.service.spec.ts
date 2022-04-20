import { TestBed } from '@angular/core/testing';

import { IfcKeyboardControlsService } from './ifc-keyboard-controls.service';
import { IFCService } from './viewer/ifc/ifc';

fdescribe('IfcKeyboardControlsService', () => {
  let service: IfcKeyboardControlsService;
  let mockIFC = jasmine.createSpyObj('ifc', ['hideSelected']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: IFCService, useValue: mockIFC}]
    });
    service = TestBed.inject(IfcKeyboardControlsService);
  });

  it('should hide selected elements when the Delete key is pressed', () => {
    service.keyPress(new KeyboardEvent('keydown', {key: 'Delete'}));
    expect(mockIFC.hideSelected).toHaveBeenCalled();
  });
});

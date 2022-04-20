import { Injectable } from '@angular/core';
import { IFCService } from './viewer/ifc/ifc';

@Injectable({
  providedIn: 'root',
})
export class IfcKeyboardControlsService {
  constructor(private ifc: IFCService) {}

  keyPress(keyboardEvt: KeyboardEvent) {
    if (keyboardEvt.key === 'Delete') {
      this.ifc.hideSelected();
    }
  }
}

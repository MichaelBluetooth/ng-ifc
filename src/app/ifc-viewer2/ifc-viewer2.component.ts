import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IfcKeyboardControlsService } from '../ifc-keyboard-controls.service';
import { IFCService } from '../viewer/ifc/ifc';
import { WorldService } from '../viewer/world';

@Component({
  selector: 'app-ifc-viewer2',
  templateUrl: './ifc-viewer2.component.html',
  styleUrls: ['./ifc-viewer2.component.less'],
})
export class IfcViewer2Component implements OnInit {
  isMulti: boolean;

  @ViewChild('threeCanvas', { static: true }) canvas: ElementRef;

  constructor(
    private worldService: WorldService,
    private ifc: IFCService,
    private ifcKeyboardControls: IfcKeyboardControlsService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.worldService.init(this.canvas.nativeElement);
    this.worldService.animate();

    this.ifc.loadUrl('assets/ifc/Test Building 1.ifc');
    // this.ifc.loadUrl('assets/ifc/IFC Viewer Dev Building 2 - Export A.ifc');
  }

  pick(event: any) {
    this.ifc.highlight(event.clientX, event.clientY, this.isMulti);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event) {
    this.ifc.preselect(event.clientX, event.clientY);
  }

  @HostListener('document:keydown', ['$event'])
  keyDown(evt: KeyboardEvent) {
    if (evt.key === 'Shift') {
      this.isMulti = true;
    }

    this.ifcKeyboardControls.keyPress(evt);
  }

  @HostListener('document:keyup', ['$event'])
  keyUp(evt: any) {
    if (evt.key === 'Shift') {
      this.isMulti = false;
    }
  }
}

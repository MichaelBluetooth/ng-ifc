import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AmbientLight,
  AxesHelper,
  DirectionalLight,
  GridHelper,
  PerspectiveCamera,
  Scene,
  Vector2,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { IFCLoader } from 'web-ifc-three/IFCLoader';
import {
  acceleratedRaycast,
  computeBoundsTree,
  disposeBoundsTree,
} from 'three-mesh-bvh';
import {
  IFCWALLSTANDARDCASE,
  IFCSLAB,
  IFCDOOR,
  IFCWINDOW,
  IFCFURNISHINGELEMENT,
  IFCMEMBER,
  IFCPLATE,
  IFCWALL,
} from 'web-ifc';
import { SpatialStructUtils } from '../spatial-struct-utils';
import { IFCNode } from '../models/ifc-node';
import { IFCRootNode } from '../models/ifc-root-node';
import { IFCService } from '../ifc.service';

@Component({
  selector: 'app-ifc-viewer',
  templateUrl: './ifc-viewer.component.html',
  styleUrls: ['./ifc-viewer.component.less'],
})
export class IfcViewerComponent implements AfterContentInit {
  @ViewChild('threeCanvas', { static: true }) canvas: ElementRef;

  isMulti: boolean = false;

  constructor(private ifc: IFCService) {}

  ngAfterContentInit() {
    this.ifc.init(this.canvas);
    this.ifc.loadUrl('assets/ifc/Test Building 1.ifc');
    // this.ifc.loadUrl('/assets/ifc/231110AC11-FZK-Haus-IFC.ifc');
    // this.ifc.loadUrl('/assets/ifc/301110FJK-Project-Final.ifc');
    // this.ifc.loadUrl('/assets/ifc/301110FZK-Haus-EliteCAD.ifc');
  }

  pick(event: any) {
    this.ifc.highlight(event.clientX, event.clientY, this.isMulti);
  }

  @HostListener('document:keydown', ['$event'])
  shiftdown(evt: any) {
    if (evt.key === 'Shift') {
      this.isMulti = true;
    }
  }

  @HostListener('document:keyup', ['$event'])
  shiftup(evt: any) {
    if (evt.key === 'Shift') {
      this.isMulti = false;
    }
  }
}

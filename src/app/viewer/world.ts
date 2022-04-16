import { WebGLRenderer } from 'three';
import { createCamera } from './camera';
import { RaycasterHelper } from './raycaster-helper';
import { createControls } from './controls';
import { IFCService } from './ifc/ifc';
import { addLight } from './lights';
import { createRenderer } from './renderer';
import { Resizer } from './resizer';
import { createScene } from './scene';
import { Injectable } from '@angular/core';

let renderer: WebGLRenderer;
let camera: any;
let scene: any;
let controls: any;
let animateFn: any;

@Injectable({ providedIn: 'root' })
export class WorldService {

  constructor(private ifc: IFCService){}

  init(container: any) {
    scene = createScene();
    camera = createCamera();
    controls = createControls(camera, container);
    addLight(scene);

    renderer = createRenderer(container);
    // container.append(renderer.domElement);

    const resizer = new Resizer(container, camera, renderer);

    animateFn = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animateFn);
    };

    const raycaster = new RaycasterHelper(container, camera);

    this.ifc.init(scene, raycaster);
  }

  animate() {
    animateFn();
  }

  reset() {
    //original hard-coded position
    //todo: center on ifc model?
    camera.position.z = 15;
    camera.position.y = 13;
    camera.position.x = 8;

    this.ifc.reset(true);
  }
}

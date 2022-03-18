import {
  AfterContentInit,
  Component,
  ElementRef,
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
} from 'web-ifc';

@Component({
  selector: 'app-ifc-viewer',
  templateUrl: './ifc-viewer.component.html',
  styleUrls: ['./ifc-viewer.component.less'],
})
export class IfcViewerComponent implements AfterContentInit {
  @ViewChild('threeCanvas', { static: true }) canvas: ElementRef;

  scene: Scene;
  ifcLoader: IFCLoader;
  ifcModels: any[] = [];

  ngOnInit() {
    this.ifcLoader = new IFCLoader();
    this.ifcLoader.ifcManager.setWasmPath('/assets/ifc/');
  }

  ngAfterContentInit() {
    this.initScene();
    this.ifcLoader.load('/assets/ifc/test.ifc', async (ifcModel) => {
      this.ifcModels.push(ifcModel);
      this.scene.add(ifcModel);
    });
  }

  initScene() {
    //Creates the Three.js scene
    this.scene = new Scene();

    //Object to store the size of the viewport
    const size = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    //Creates the camera (point of view of the user)
    const camera = new PerspectiveCamera(75, size.width / size.height);
    camera.position.z = 15;
    camera.position.y = 13;
    camera.position.x = 8;

    //Creates the lights of the scene
    const lightColor = 0xffffff;

    const ambientLight = new AmbientLight(lightColor, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new DirectionalLight(lightColor, 1);
    directionalLight.position.set(0, 10, 0);
    directionalLight.target.position.set(-5, 0, 0);
    this.scene.add(directionalLight);
    this.scene.add(directionalLight.target);

    //Sets up the renderer, fetching the canvas of the HTML
    const threeCanvas = this.canvas.nativeElement;
    const renderer = new WebGLRenderer({ canvas: threeCanvas, alpha: true });
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    //Creates grids and axes in the scene
    const grid = new GridHelper(50, 30);
    this.scene.add(grid);

    //Creates the orbit controls (to navigate the scene)
    const controls = new OrbitControls(camera, threeCanvas);
    controls.enableDamping = true;
    controls.target.set(-2, 0, 0);

    //Animation loop
    const animate = () => {
      controls.update();
      renderer.render(this.scene, camera);
      requestAnimationFrame(animate);
    };

    animate();
  }
}

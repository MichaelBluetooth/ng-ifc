// import { ElementRef, Injectable } from '@angular/core';
// import { BehaviorSubject, from, Observable } from 'rxjs';
// import {
//   AmbientLight,
//   Camera,
//   DirectionalLight,
//   GridHelper,
//   MeshLambertMaterial,
//   PerspectiveCamera,
//   Raycaster,
//   Scene,
//   Vector2,
//   WebGLRenderer,
// } from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { IFCLoader } from 'web-ifc-three';
// import { Subset } from 'web-ifc-three/IFC/components/subsets/SubsetManager';
// import { IFCNode } from './models/ifc-node';
// import { SpatialStructUtils } from './spatial-struct-utils';
// import * as _WEBIFC from 'web-ifc';

// @Injectable({ providedIn: 'root' })
// export class IFCServicex {
//   private WEBIFC: any = _WEBIFC;
//   private wasmPath = 'assets/ifc/';
//   private canvas: any;
//   private scene: Scene;
//   private ifcLoader: IFCLoader;
//   private ifcModels: any[] = [];
//   private subsets: any = {};
//   private raycaster: Raycaster;
//   private camera: Camera;
//   private ALL_ELEMENTS_SUBSET_NAME = 'all_elements';
//   private HIDDEN_ELEMENTS_SUBSET_NAME = 'hidden_elements';

//   private selectMat = new MeshLambertMaterial({
//     transparent: true,
//     opacity: 0.6,
//     color: 0xff00ff,
//     depthTest: false,
//   });

//   private _prevFileUrl: string;

//   private _selectedIds = new BehaviorSubject<number[]>([]);
//   private _hiddenIds = new BehaviorSubject<number[]>([]);

//   get selectedIds$() {
//     return this._selectedIds.asObservable();
//   }

//   get selectedIds() {
//     return this._selectedIds.value;
//   }

//   get hiddenIds$() {
//     return this._hiddenIds.asObservable();
//   }

//   constructor(private spatialUtils: SpatialStructUtils) {
//     this.ifcLoader = new IFCLoader();
//     this.ifcLoader.ifcManager.setWasmPath(this.wasmPath);
//   }

//   init(canvas: ElementRef): void {
//     this.canvas = canvas;
//     this.initScene();
//   }

//   async reset(reloadPrevious: boolean = true) {
//     if (this.ifcLoader) {
//       this.ifcLoader.ifcManager.dispose();
//       this.ifcLoader = null;
//       this.ifcModels = [];
//       this.ifcLoader = new IFCLoader();
//       this.ifcLoader.ifcManager.setWasmPath(this.wasmPath);

//       this._hiddenIds.next([]);
//       this._selectedIds.next([]);
//       this.spatialUtils.clear();

//       if (reloadPrevious && this._prevFileUrl) {
//         this.loadUrl(this._prevFileUrl);

//         //reset the camera position to where it originally started
//         this.camera.position.z = 15;
//         this.camera.position.y = 13;
//         this.camera.position.x = 8;
//       }
//     }
//   }

//   initScene(): void {
//     //Creates the Three.js scene
//     this.scene = new Scene();

//     //Object to store the size of the viewport
//     const size = {
//       width: window.innerWidth,
//       height: window.innerHeight,
//     };

//     //Creates the camera (point of view of the user)
//     this.camera = new PerspectiveCamera(75, size.width / size.height);
//     this.camera.position.z = 15;
//     this.camera.position.y = 13;
//     this.camera.position.x = 8;

//     //Creates the lights of the scene
//     const lightColor = 0xffffff;

//     const ambientLight = new AmbientLight(lightColor, 0.5);
//     this.scene.add(ambientLight);

//     const directionalLight = new DirectionalLight(lightColor, 1);
//     directionalLight.position.set(0, 10, 0);
//     directionalLight.target.position.set(-5, 0, 0);
//     this.scene.add(directionalLight);
//     this.scene.add(directionalLight.target);

//     //Sets up the renderer, fetching the canvas of the HTML
//     const threeCanvas = this.canvas.nativeElement;
//     const renderer = new WebGLRenderer({ canvas: threeCanvas, alpha: true });
//     // renderer.setSize(size.width, size.height);
//     const rect = threeCanvas.getBoundingClientRect();
//     renderer.setSize(rect.width - 60, rect.height);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//     //Creates grids and axes in the scene
//     const grid = new GridHelper(50, 30);
//     this.scene.add(grid);

//     //Creates the orbit controls (to navigate the scene)
//     const controls = new OrbitControls(this.camera, threeCanvas);
//     controls.enableDamping = true;
//     controls.target.set(-2, 0, 0);

//     //Animation loop
//     const animate = () => {
//       controls.update();
//       renderer.render(this.scene, this.camera);
//       requestAnimationFrame(animate);
//     };

//     animate();

//     this.raycaster = new Raycaster();
//     this.raycaster.firstHitOnly = true;
//   }

//   loadFile(file: File) {
//     this.reset(false);
//     const fileUrl = URL.createObjectURL(file);
//     this.loadUrl(fileUrl);
//   }

//   loadUrl(url: string) {
//     this._prevFileUrl = url;
//     this.ifcLoader.load(url, async (ifcModel) => {
//       this.ifcModels.push(ifcModel);

//       //get the spatial structure, organize it by type and load it into the scene
//       const spatialStruct = await this.ifcLoader.ifcManager.getSpatialStructure(
//         0,
//         true
//       );
//       this.spatialUtils.init(spatialStruct);
//       // this.initSubsetsByType();
//       this.initModel();
//     });
//   }

//   cast(x: number, y: number) {
//     const mouse = new Vector2();

//     // Computes the position of the mouse on the screen
//     const bounds = this.canvas.nativeElement.getBoundingClientRect();

//     const x1 = x - bounds.left;
//     const x2 = bounds.right - bounds.left;
//     mouse.x = (x1 / x2) * 2 - 1;

//     const y1 = y - bounds.top;
//     const y2 = bounds.bottom - bounds.top;
//     mouse.y = -(y1 / y2) * 2 + 1;

//     // Places it on the camera pointing to the mouse
//     this.raycaster.setFromCamera(mouse, this.camera);

//     // Casts a ray
//     return this.raycaster.intersectObjects(this.ifcModels);
//   }

//   highlight(x: number, y: number, isMulti: boolean) {
//     const rayCastedElements = this.cast(x, y);

//     //For all elements in the intersected objects, find the first one that hasn't been hidden
//     let found: any = null;
//     for (const elementInSelection of rayCastedElements as any) {
//       const expressID = elementInSelection.object.getExpressId(
//         elementInSelection.object.geometry,
//         elementInSelection.faceIndex
//       );
//       if (this._hiddenIds.value.indexOf(expressID) === -1) {
//         found = elementInSelection;
//         break;
//       }
//     }

//     if (found) {
//       // Gets Express ID
//       const index = found.faceIndex;
//       const geometry = found.object.geometry;
//       const id = this.ifcLoader.ifcManager.getExpressId(geometry, index);

//       if (isMulti) {
//         const ids = [...this._selectedIds.value, id];
//         this.highlightById(ids);
//       } else {
//         this.highlightById([id]);
//       }
//     } else {
//       this._selectedIds.next([]);
//       this.ifcLoader.ifcManager.removeSubset(0, this.selectMat);
//     }
//   }

//   highlightById(expressIDs: number[]) {
//     expressIDs = Array.from(new Set<number>(expressIDs)); //remove any dupes
//     this._selectedIds.next(expressIDs);

//     this.ifcLoader.ifcManager.createSubset({
//       modelID: 0,
//       ids: expressIDs,
//       material: this.selectMat,
//       scene: this.scene,
//       removePrevious: true,
//     });
//   }

//   highlightAllVisible() {
//     let visibleIds = this.getAllIds().filter(
//       (id) => this._hiddenIds.value.indexOf(id) === -1
//     );
//     this.highlightById(visibleIds);
//   }

//   initModel() {
//     const ids = this.spatialUtils.getAllIds();
//     this.ifcLoader.ifcManager.createSubset({
//       modelID: 0,
//       ids: ids,
//       scene: this.scene,
//       removePrevious: true,
//       customID: this.ALL_ELEMENTS_SUBSET_NAME,
//     });
//   }

//   initSubsetsByType() {
//     const byType = this.spatialUtils.getTypes();
//     Object.keys(byType).forEach((type) => {
//       if (this.subsets[type]) {
//         this.ifcLoader.ifcManager.removeSubset(0, null, type);
//       }

//       const nodesOfType: IFCNode[] = byType[type];
//       const subsetOfType = this.ifcLoader.ifcManager.createSubset({
//         modelID: 0,
//         ids: nodesOfType.map((n) => n.expressID),
//         scene: this.scene,
//         removePrevious: true,
//         customID: type,
//       });
//       this.subsets[type] = subsetOfType;
//     });
//   }

//   hideElementsByType(type: string) {
//     const subset = this.subsets[type];
//     subset.removeFromParent();

//     const byType = this.spatialUtils.getTypes();
//     byType[type].forEach((elementByType: any) => {
//       const hiddenIds = this._hiddenIds.value;
//       hiddenIds.push(elementByType.expressID);
//       this._hiddenIds.next(hiddenIds);
//     });
//   }

//   showElementsByType(type: string) {
//     const subset = this.subsets[type];
//     this.scene.add(subset);
//   }

//   private hiddenElementsSubset: Subset = null;
//   hideElementsById(ids: number[]) {
//     if (this.hiddenElementsSubset) {
//       this.ifcLoader.ifcManager.removeSubset(
//         0,
//         null,
//         this.HIDDEN_ELEMENTS_SUBSET_NAME
//       );
//     }

//     let hiddenIds = this._hiddenIds.value;
//     hiddenIds = hiddenIds.concat(ids);
//     this._hiddenIds.next(hiddenIds);
//     ids.forEach((id) => {
//       const ifcType = this.ifcLoader.ifcManager.getIfcType(0, id);
//       // this.ifcLoader.ifcManager.removeFromSubset(0, ids, ifcType);
//       this.ifcLoader.ifcManager.removeFromSubset(
//         0,
//         ids,
//         this.ALL_ELEMENTS_SUBSET_NAME
//       );
//     });

//     this.hiddenElementsSubset = this.ifcLoader.ifcManager.createSubset({
//       modelID: 0,
//       ids: ids,
//       scene: this.scene,
//       removePrevious: true,
//       customID: this.HIDDEN_ELEMENTS_SUBSET_NAME,
//     });

//     this.hiddenElementsSubset.removeFromParent();
//     this._selectedIds.next([]);
//     this.ifcLoader.ifcManager.removeSubset(0, this.selectMat);
//   }

//   showElementsById(ids: number[]) {
//     if (this.hiddenElementsSubset) {
//       const newHiddenIds = this._hiddenIds.value;
//       ids.forEach((id) => {
//         const idx = newHiddenIds.indexOf(id);
//         newHiddenIds.splice(idx, 1);
//       });

//       this.showAll();
//       this.hideElementsById(newHiddenIds);
//       this._hiddenIds.next(newHiddenIds);
//     }
//   }

//   hideOthers(ids: number[]) {
//     const otherIds = this.spatialUtils
//       .getAllIds()
//       .filter((id) => ids.indexOf(id) === -1);
//     this.hideElementsById(otherIds);
//   }

//   showAll() {
//     //if there's a subset of individual elements, remove it
//     if (this.hiddenElementsSubset) {
//       this.ifcLoader.ifcManager.removeSubset(
//         0,
//         this.selectMat,
//         'hidden_subset'
//       );
//     }

//     //rebuild the subsets by type to make sure we have all the IDs for each type
//     //this ensures any elements that were individually hidden are put back in the subset by type
//     // this.initSubsetsByType();
//     this.initModel();
//     this._hiddenIds.next([]);
//   }



//   getAllIds() {
//     return this.spatialUtils.getAllIds();
//   }
// }

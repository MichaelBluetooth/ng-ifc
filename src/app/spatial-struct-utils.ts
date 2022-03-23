import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IFCNode } from './models/ifc-node';
import { IFCRootNode } from './models/ifc-root-node';

@Injectable({ providedIn: 'root' })
export class SpatialStructUtils {
  private _spatialStruct = new BehaviorSubject<IFCRootNode>(null);
  private _byType = new BehaviorSubject<any>(null);

  get spatialStruct$(): Observable<IFCRootNode> {
    return this._spatialStruct.asObservable();
  }

  get byType$(): Observable<IFCRootNode> {
    return this._byType.asObservable();
  }

  init(spatialStruct: IFCRootNode) {
    this._spatialStruct.next(spatialStruct);
    const _byType: any = {};

    this._recurseTree(this._spatialStruct.value, (node: IFCNode) => {
      //Only collect "leaf" types.
      //All others won't be something that can be hidden (e.x. a "roof" node may have two child elements)
      if (!node.children || node.children.length === 0) {
        if (!_byType[node.type]) {
          _byType[node.type] = [];
        }

        _byType[node.type].push(node);
      }
    });

    this._byType.next(_byType)
  }

  getTypes() {
    return this._byType.value;
  }

  getAllIds(): number[] {
    const allIds: number[] = [];

    this._recurseTree(this._spatialStruct.value, (node: IFCRootNode) => {
      allIds.push(node.expressID);
    });

    return allIds;
  }

  private _recurseTree(root: IFCRootNode | IFCNode, callback: Function) {
    callback(root);

    root.children.forEach((child: IFCNode) => {
      this._recurseTree(child, callback);
    });
  }

  clear(){
    this._byType.next({});
    this._spatialStruct.next(null);
  }
}

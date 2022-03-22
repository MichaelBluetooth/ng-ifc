import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IfcContextMenuService } from '../ifc-context-menu.service';
import { IFCNode } from '../models/ifc-node';
import { IFCRootNode } from '../models/ifc-root-node';
import { SpatialStructUtils } from '../spatial-struct-utils';

@Component({
  selector: 'app-spatial-tree',
  templateUrl: './spatial-tree.component.html',
  styleUrls: ['./spatial-tree.component.less'],
})
export class SpatialTreeComponent implements OnInit {
  tree$: Observable<IFCRootNode> = this.utils.spatialStruct$;

  constructor(
    private utils: SpatialStructUtils,
    private ctxMenu: IfcContextMenuService
  ) {}

  ngOnInit(): void {}

  select(node: IFCNode) {
    console.debug(node);
  }

  openContextMenu(node: IFCNode, e: MouseEvent) {
    this.ctxMenu.openContextMenu(node, e.pageX, e.pageY);
    return false; //prevent the browser from opening the default context menu
  }
}

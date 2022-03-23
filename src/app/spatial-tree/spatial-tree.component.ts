import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IfcContextMenuService } from '../ifc-context-menu.service';
import { IFCService } from '../ifc.service';
import { IFCNode } from '../models/ifc-node';
import { IFCRootNode } from '../models/ifc-root-node';
import { SpatialStructUtils } from '../spatial-struct-utils';

@Component({
  selector: 'app-spatial-tree',
  templateUrl: './spatial-tree.component.html',
  styleUrls: ['./spatial-tree.component.less'],
})
export class SpatialTreeComponent implements OnInit {
  isMulti = false;
  tree$: Observable<IFCRootNode> = this.utils.spatialStruct$;
  selectedIds: Set<number> = new Set<number>();

  constructor(
    private utils: SpatialStructUtils,
    private ifc: IFCService,
    private ctxMenu: IfcContextMenuService
  ) {}

  ngOnInit(): void {
    this.ifc.selectedIds$.subscribe((ids) => {
      if(ids.length > 0 && !this.selectedIds.has(ids[0])){
        document.getElementById(ids[0].toString()).scrollIntoView()
      }
      this.selectedIds = new Set(ids);
    });
  }

  isSelected(node: IFCNode) {
    return this.selectedIds.has(node.expressID);
  }

  select(node: IFCNode) {
    const newSelectedIds = this.getAllChildren(node);

    if (this.isSelected(node)) {
      newSelectedIds.forEach((id) => {
        this.selectedIds.delete(id);
      });
      this.ifc.highlightById(Array.from(this.selectedIds));
    } else {
      if (this.isMulti) {
        this.selectedIds = new Set<number>([
          ...this.selectedIds,
          ...newSelectedIds,
        ]);
        this.ifc.highlightById(Array.from(this.selectedIds));
      } else {
        this.selectedIds = new Set(newSelectedIds);
        this.ifc.highlightById(newSelectedIds);
      }
    }
  }

  getAllChildren(node: IFCNode, ids: number[] = []): number[] {
    ids.push(node.expressID);

    if (node.children) {
      node.children.forEach((child: IFCNode) => {
        this.getAllChildren(child, ids);
      });
    }

    return ids;
  }

  openContextMenu(node: IFCNode, e: MouseEvent) {
    this.ctxMenu.openContextMenu(node, e.pageX, e.pageY);
    return false; //prevent the browser from opening the default context menu
  }

  @HostListener('document:keydown', ['$event'])
  shiftdown(evt: KeyboardEvent) {
    if (evt.key === 'Shift') {
      this.isMulti = true;
    }
  }

  @HostListener('document:keyup', ['$event'])
  shiftup(evt: KeyboardEvent) {
    if (evt.key === 'Shift') {
      this.isMulti = false;
    }
  }
}

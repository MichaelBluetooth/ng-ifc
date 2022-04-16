import { Component, HostListener, Input, OnInit } from '@angular/core';
import { IfcContextMenuService } from '../ifc-context-menu.service';
import { IFCNode } from '../models/ifc-node';
import { IFCRootNode } from '../models/ifc-root-node';
import { IFCService } from '../viewer/ifc/ifc';

@Component({
  selector: 'app-spatial-tree',
  templateUrl: './spatial-tree.component.html',
  styleUrls: ['./spatial-tree.component.less'],
})
export class SpatialTreeComponent implements OnInit {
  isMulti = false;
  selectedIds: Set<number> = new Set<number>();
  hiddenIds: Set<number> = new Set<number>();
  tree: IFCRootNode;

  constructor(private ctxMenu: IfcContextMenuService, private ifc: IFCService) {}

  ngOnInit(): void {
    this.ifc.selectedIds$.subscribe((ids) => {
      if (ids.length > 0 && !this.selectedIds.has(ids[0])) {
        document.getElementById(ids[0].toString()).scrollIntoView();
      }
      this.selectedIds = new Set(ids);
    });

    this.ifc.hiddenIds$.subscribe((ids) => {
      this.hiddenIds = new Set(ids);
    });

    this.ifc.spatialStructure$.subscribe(tree => {
      this.tree = tree;
    })
  }

  isSelected(node: IFCNode) {
    return this.selectedIds.has(node.expressID);
  }

  isHidden(node: IFCNode) {
    return this.hiddenIds.has(node.expressID);
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

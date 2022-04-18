import { Component, HostListener, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { IfcContextMenuService } from '../ifc-context-menu.service';
import { IFCNode } from '../models/ifc-node';
import { SpatialTreeNode } from '../models/spatial-tree-node';
import { IFCService } from '../viewer/ifc/ifc';
import {
  groupStoreyElements,
  buildTreeNode,
  recurseTree,
} from '../viewer/ifc/spatial-utils';

@Component({
  selector: 'app-spatial-tree',
  templateUrl: './spatial-tree.component.html',
  styleUrls: ['./spatial-tree.component.less'],
})
export class SpatialTreeComponent implements OnInit {
  isMulti = false;
  selectedIds: Set<number> = new Set<number>();
  hiddenIds: Set<number> = new Set<number>();
  tree: SpatialTreeNode;
  highlightedElementIds: Set<any> = new Set<any>();
  skip: boolean = false;

  constructor(
    private ctxMenu: IfcContextMenuService,
    private ifc: IFCService
  ) {}

  ngOnInit(): void {
    this.ifc.selectedIds$.subscribe((ids) => {
      if (ids.length > 0 && !this.selectedIds.has(ids[0])) {
        document.getElementById(ids[0].toString())?.scrollIntoView();
      }
      this.selectedIds = new Set(ids);

      if (!this.skip) {
        this.highlightedElementIds = new Set(ids);
      }
      this.skip = false;
    });

    this.ifc.hiddenIds$.subscribe((ids) => {
      this.hiddenIds = new Set(ids);
    });

    this.ifc.spatialStructure$
      .pipe(
        map((tree) => {
          groupStoreyElements(tree);
          return tree;
        })
      )
      .pipe(map((tree) => buildTreeNode(tree)))
      .subscribe((tree) => {
        this.tree = tree;
      });
  }

  isSelected(node: SpatialTreeNode) {
    return this.highlightedElementIds.has(node.nodeId);
  }

  isHidden(node: SpatialTreeNode) {
    return false; //TODO: make this work...
    // return this.hiddenIds.has(node.data.expressID);
  }

  select(node: SpatialTreeNode) {
    this.skip = true;
    this.highlightedElementIds = new Set([node.nodeId]);

    const newSelectedIds = this.getAllChildren(node);
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

  getAllChildren(node: SpatialTreeNode, ids: number[] = []): number[] {
    if (node.data.expressID) {
      ids.push(node.data.expressID);
    }

    if (node.children) {
      node.children.forEach((child: SpatialTreeNode) => {
        this.getAllChildren(child, ids);
      });
    }

    return ids;
  }

  openContextMenu(node: SpatialTreeNode, e: MouseEvent) {
    this.ctxMenu.openContextMenu(node.data, e.pageX, e.pageY);
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

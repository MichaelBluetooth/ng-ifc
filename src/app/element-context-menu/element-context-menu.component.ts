import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { IfcContextMenuService } from '../ifc-context-menu.service';
import { IFCService } from '../ifc.service';
import { IFCNode } from '../models/ifc-node';

@Component({
  selector: 'app-element-context-menu',
  templateUrl: './element-context-menu.component.html',
  styleUrls: ['./element-context-menu.component.less'],
})
export class ElementContextMenuComponent implements OnInit {
  @Input() ifcNode: IFCNode;
  @Input() positionX: number;
  @Input() positionY: number;

  constructor(
    private eRef: ElementRef,
    private ctxMenuService: IfcContextMenuService,
    private ifcService: IFCService
  ) {}

  ngOnInit(): void {}

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: any): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.ctxMenuService.destroyContextMenu();
    }
  }

  select() {
    if (this.ifcNode.children && this.ifcNode.children.length > 0) {
      //collect and hide all _leaf_ nodes
      const ids: number[] = [];
      this.iterateChildren(this.ifcNode, (child: IFCNode) => {
        if(!child.children || child.children.length === 0){
          ids.push(child.expressID);
        }
      });
      this.ifcService.highlightById(ids);
      this.ctxMenuService.destroyContextMenu();

    } else {
      //this is a leaf node, so we can hide it
      this.ifcService.highlightById([this.ifcNode.expressID]);
      this.ctxMenuService.destroyContextMenu();
    }
  }

  iterateChildren(node: IFCNode, callback: Function){
    callback(node);
    if(node.children){
      node.children.forEach(child => {
        this.iterateChildren(child, callback);
      });
    }
  }
}

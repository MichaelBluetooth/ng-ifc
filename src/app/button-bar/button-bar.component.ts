import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IFCService } from '../viewer/ifc/ifc';
import { WorldService } from '../viewer/world';

@Component({
  selector: 'app-button-bar',
  templateUrl: './button-bar.component.html',
  styleUrls: ['./button-bar.component.less']
})
export class ButtonBarComponent implements OnInit {

  @ViewChild('fileUpload', { static: true }) uploadField: ElementRef;

  constructor(private world: WorldService, private ifc: IFCService){}

  ngOnInit(): void {
  }

  upload() {
    if (
      this.uploadField.nativeElement.files &&
      this.uploadField.nativeElement.files.length > 0
    ) {
      this.ifc.loadFile(this.uploadField.nativeElement.files[0]);
    }
  }

  reset(){
    this.world.reset();
  }

  hideSelected(){
    this.ifc.hideSelected();
  }

  hideOthers(){
    this.ifc.hideOthers();
  }

  showAll(){
    this.ifc.showAll();
  }

  generateGridData(){
    // this.gridData.readSelected();
  }

  deselectAll(){
    this.ifc.highlightById([]);
  }

  selectAll(){
    this.ifc.highlightAllVisible();
  }
}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { IFCDataService } from './ifc-data.service';
import { IFCService } from './viewer/ifc/ifc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  
  @ViewChild('fileUpload', {static: true}) uploadField: ElementRef;

  selectedIds: number[] = [];
  hiddenIds: number[] = [];

  constructor(private ifc: IFCService, private gridData: IFCDataService){}

  ngOnInit(){
    // this.ifc.selectedIds$.subscribe(ids => {
    //   this.selectedIds = ids;
    // });
  }

  reset(){
    this.ifc.reset(true);
  }

  upload(){
    if(this.uploadField.nativeElement.files && this.uploadField.nativeElement.files.length > 0){
      this.ifc.loadFile(this.uploadField.nativeElement.files[0]);
    }
  }

  hideSelected(){
    this.ifc.hideElementsById(this.selectedIds);
  }

  hideOthers(){
    this.ifc.hideOthers(this.selectedIds);
  }

  showAll(){
    this.ifc.showAll();
  }

  generateGridData(){
    this.gridData.readSelected();
  }

  deselectAll(){
    this.ifc.highlightById([]);
  }

  selectAll(){
    this.ifc.highlightAllVisible();
  }
}

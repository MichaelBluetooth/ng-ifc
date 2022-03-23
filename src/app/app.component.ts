import { Component, ElementRef, ViewChild } from '@angular/core';
import { IFCService } from './ifc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  
  @ViewChild('fileUpload', {static: true}) uploadField: ElementRef;

  selectedIds: number[] = [];

  constructor(private ifc: IFCService){}

  ngOnInit(){
    this.ifc.selectedIds$.subscribe(ids => {
      this.selectedIds = ids;
    });
  }

  reset(){
    this.ifc.reset();
  }

  upload(){
    if(this.uploadField.nativeElement.files && this.uploadField.nativeElement.files.length > 0){
      this.ifc.loadFile(this.uploadField.nativeElement.files[0]);
    }
  }

  hideSelected(){
    alert('TODO: make this button do the thing');
  }

  hideOthers(){
    alert('TODO: make this button do the thing');
  }

  showAll(){
    alert('TODO: make this button do the thing');
  }

  generateGridData(){
    alert('TODO: make this button do the thing');
  }

  deselectAll(){
    this.ifc.highlightById([]);
  }
}

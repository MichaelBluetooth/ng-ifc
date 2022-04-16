import { Component, OnInit } from '@angular/core';
import { IFCDataService } from '../ifc-data.service';
import { IFCService } from '../viewer/ifc/ifc';

@Component({
  selector: 'app-properties-display',
  templateUrl: './properties-display.component.html',
  styleUrls: ['./properties-display.component.less'],
})
export class PropertiesDisplayComponent implements OnInit {
  propertyData: any[] = [];
  propertyNames: string[] = [];

  constructor(private ifc: IFCService, private ifcData: IFCDataService) {}

  ngOnInit() {
    this.ifc.selectedIds$.subscribe(async (ids) => {
      if (ids.length === 1) {
        const propData = await this.ifcData.getPropertyData([ids[0]]);
        this.propertyData = propData.propertyValues.map((pv: any) => {
          return {
            collapsed: false,
            values: pv,
          };
        });
        this.propertyNames = propData.propertyNames.filter(
          (p: string) => p !== 'name'
        );
      }
    });
  }

  collapseAll() {
    this.propertyData.forEach((p) => {
      p.collapsed = true;
    });
  }

  expandAll() {
    this.propertyData.forEach((p) => {
      p.collapsed = false;
    });
  }


  items: any[] = [];
  addItem(name: string, value: any){
    this.items = [{
      name, value
    }];
  }

  search(){
    // this.ifcSearchService.search(this.items);
  }
}

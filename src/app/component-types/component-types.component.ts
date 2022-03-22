import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { IFCService } from '../ifc.service';
import { SpatialStructUtils } from '../spatial-struct-utils';

@Component({
  selector: 'app-component-types',
  templateUrl: './component-types.component.html',
  styleUrls: ['./component-types.component.less'],
})
export class ComponentTypesComponent implements OnInit {
  types$ = this.spatialUtils.byType$.pipe(
    map((t) => {
      if (t) {
        return Object.keys(t);
      } else {
        return [];
      }
    })
  );

  constructor(private spatialUtils: SpatialStructUtils, private ifcService: IFCService) {}

  ngOnInit(): void {}

  toggle(type: string, evt: any){
    if(evt.target.checked){
      this.ifcService.showElementsByType(type);
    }else{
      this.ifcService.hideElementsByType(type);
    }
  }  

}

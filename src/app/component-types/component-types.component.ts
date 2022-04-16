import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-types',
  templateUrl: './component-types.component.html',
  styleUrls: ['./component-types.component.less'],
})
export class ComponentTypesComponent implements OnInit {
  // types$ = this.spatialUtils.byType$.pipe(
  //   map((t) => {
  //     if (t) {
  //       return Object.keys(t);
  //     } else {
  //       return [];
  //     }
  //   })
  // );

  // constructor(private spatialUtils: SpatialStructUtils, private ifcService: IFCServicex) {}

  ngOnInit(): void {}

  // toggle(type: string, evt: any){
  //   if(evt.target.checked){
  //     this.ifcService.showElementsByType(type);
  //   }else{
  //     this.ifcService.hideElementsByType(type);
  //   }
  // }  

}

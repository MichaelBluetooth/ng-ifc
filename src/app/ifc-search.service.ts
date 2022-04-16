// import { Injectable } from '@angular/core';
// import { forkJoin, from, map, Observable } from 'rxjs';
// import { IFCServicex } from './ifc.service';
// import { SpatialStructUtils } from './spatial-struct-utils';

// @Injectable({ providedIn: 'root' })
// export class IFCSearchService {
//   constructor(
//     private ifc: IFCServicex,
//     private spatialUtils: SpatialStructUtils
//   ) {}

//   getPropertySets(expressID: number): Observable<any> {
//     return from(this.ifc.getPropertySets(expressID));
//   }

//   getItemProperties(expressID: number): Observable<any> {
//     return from(this.ifc.getItemProperties(expressID));
//   }

//   getIFCType(expressID: number): Observable<any> {
//     return from(this.ifc.getIFCType(expressID));
//   }

//   isIfcPropertySet(propertySet: any): boolean {
//     return (
//       // propertySet.constructor.name === 'IfcPropertySet' &&
//       propertySet.HasProperties
//     );
//   }

//   isIfcElementQuantity(propertySet: any): boolean {
//     return (
//       // propertySet.constructor.name === 'IfcElementQuantity' && <--this doesn't work when we build in prod mode!
//       propertySet.Quantities
//     );
//   }

//   search(fields: any[]) {
//     if (typeof Worker !== 'undefined') {
//       const worker = new Worker(
//         new URL('./properties-display.worker', import.meta.url)
//       );
//       worker.onmessage = ({ data }) => {
//         const matches = data.filter((result: number) => !!result);
//         this.ifc.highlightById(matches);
//       };


//       const ids = this.spatialUtils.getAllIds();
//       const ifc = this.ifc;

//       worker.postMessage({ids, ifc});
//     } else {
//       alert('Web workers are not supported!');
//     }

//     // const searches: Observable<any>[] = [];
//     // const ids = this.spatialUtils.getAllIds();
//     // ids.forEach((id) => {
//     //   searches.push(
//     //     this.getPropertySets(id).pipe(
//     //       map((propertySets) => {
//     //         let ret: number = null;
//     //         fields.forEach((field) => {
//     //           const name = field.name;
//     //           const value = field.value;

//     //           for (const propertySet of propertySets) {
//     //             if (this.isIfcPropertySet(propertySet)) {
//     //               for (const prop of propertySet.HasProperties) {
//     //                 if (
//     //                   prop.Name.value === name &&
//     //                   prop.NominalValue.value === value
//     //                 ) {
//     //                   ret = id;
//     //                 }
//     //               }
//     //             }
//     //           }
//     //         });
//     //         return ret;
//     //       })
//     //     )
//     //   );
//     // });

//     // setTimeout(() => {
//     //   forkJoin(searches).subscribe((results) => {
//     //     const matches = results.filter((result) => !!result);
//     //     this.ifc.highlightById(matches);
//     //   });
//     // }, 5);
//   }
// }

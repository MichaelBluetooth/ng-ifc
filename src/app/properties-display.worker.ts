/// <reference lib="webworker" />

import { map, Observable } from 'rxjs';

addEventListener('message', ({ data }) => {
  const fields = data.fields;
  const ids: number[] = data.ids;
  const ifc: any = data.ifc;

  const x = ifc.getIFCType(ids[0]);

  // const searches: Observable<any>[] = [];
  // ids.forEach((id: number) => {
  //   searches.push(
  //     this.getPropertySets(id).pipe(
  //       map((propertySets: any) => {
  //         let ret: number = null;
  //         fields.forEach((field: any) => {
  //           const name = field.name;
  //           const value = field.value;

  //           for (const propertySet of propertySets) {
  //             if (this.isIfcPropertySet(propertySet)) {
  //               for (const prop of propertySet.HasProperties) {
  //                 if (
  //                   prop.Name.value === name &&
  //                   prop.NominalValue.value === value
  //                 ) {
  //                   ret = id;
  //                 }
  //               }
  //             }
  //           }
  //         });
  //         return ret;
  //       })
  //     )
  //   );
  // });

  // setTimeout(() => {
  //   forkJoin(searches).subscribe((results) => {
  //     const matches = results.filter((result) => !!result);
  //     this.ifc.highlightById(matches);
  //   });
  // }, 5);
});

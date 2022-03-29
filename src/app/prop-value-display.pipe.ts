import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'propValueDisplay'
})
export class PropValueDisplayPipe implements PipeTransform {

  transform(value: any, fieldName: string): unknown {
    let stringValue = value[fieldName];
    if(value[fieldName + '_unit']){
      stringValue += ` ${value[fieldName + '_unit']}`;
    }
    return stringValue;
  }

}

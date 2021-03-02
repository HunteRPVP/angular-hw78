import { Pipe, PipeTransform } from '@angular/core';
import { FormArray } from '@angular/forms';

@Pipe({
  name: 'familyNames'
})
export class FamilyNamesPipe implements PipeTransform {

  transform(values: string[], ...args: unknown[]): string {
    const mapValue: string[] = values.map((value) => {return value});
    return mapValue.join(', ');
  }

}

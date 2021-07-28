import { Inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indexMapper'
})
export class IndexMapperPipe implements PipeTransform {

  indexValueMap: string[] = [];

  constructor(
    @Inject(String) valueMap: string[]
  ) {
    this.indexValueMap = valueMap;
  }

  transform(value: number, valueMap?: string[]): string | number {
    if (typeof value !== 'number') {
      return value;
    }

    valueMap = valueMap || this.indexValueMap;

    return valueMap[value];
  }

}

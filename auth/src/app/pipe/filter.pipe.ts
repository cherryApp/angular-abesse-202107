import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe<T> implements PipeTransform {

  transform(list: T[] | null, phrase: string): T[] | null {
    if (!Array.isArray(list) || !phrase) {
      return list;
    }

    phrase = phrase.toLowerCase();

    return list.filter( item => {
      return Object.values( (item as T) ).some( val => String(val).toLowerCase().includes(phrase) );
    });
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';

const fibonacci = (num: number): number => {
  if (num <= 1) {
    return 1;
  }

  return fibonacci(num - 1) + fibonacci(num - 2);
};

@Pipe({
  name: 'fibonacci'
})
export class FibonacciPipe implements PipeTransform {

  @memo({
    resolver: (...args) => `key-${args[0]}`
  })
  transform(value: number): number {
    return fibonacci(value);
  }

}

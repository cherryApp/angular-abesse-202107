import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'xpipe'
})
export class XpipePipe implements PipeTransform {

  transform(value: unknown, pipes: {transform: Function}[] | undefined, pipeArgs: any[][] = []): unknown {
    if (!Array.isArray(pipes)) {
      return value;
    }

    let output = value;
    pipes.forEach( (pipe, index) => {
      const args = pipeArgs && pipeArgs[index] ? pipeArgs[index] : [];
      output = pipe.transform(output, ...args);
    });

    return output;
  }

}

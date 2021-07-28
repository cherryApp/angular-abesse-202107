// tslint:disable: only-arrow-functions
const methodCache: {[propname: string]: any} = {};

export function Lodash(methods: string[]): ClassDecorator {
  return (target): any => {
    const original = target.prototype.ngOnInit;
    target.prototype.ngOnInit = async function(): Promise<any> {
      console.log('in decorator');

      for (const method of methods) {
        if (!methodCache[method]) {
          methodCache[method] = await import(`../../assets/lodash-es/${method}.js`).then(
            i => i.default
          );
        }
        this[method] = methodCache[method];
      }

      if (original) {
        original.bind(this)();
      }
    };
  };
}

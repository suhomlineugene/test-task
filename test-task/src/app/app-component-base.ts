import { ElementRef, Injector } from '@angular/core';
import { PrimengTableHelper } from './helpers/PrimengTableHelper';

export abstract class AppComponentBase {
  elementRef: ElementRef;
  primengTableHelper: PrimengTableHelper;

  constructor(injector: Injector) {
    this.elementRef = injector.get(ElementRef);
    this.primengTableHelper = new PrimengTableHelper();
  }
}

import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[accordionHeader]' })
export class AccordionHeaderDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

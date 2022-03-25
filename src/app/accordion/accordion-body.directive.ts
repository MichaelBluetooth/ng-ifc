import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[accordionBody]' })
export class AccordionBodyDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

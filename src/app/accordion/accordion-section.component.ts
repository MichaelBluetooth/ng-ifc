import { ThrowStmt } from '@angular/compiler';
import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import { AccordionHeaderDirective } from './accordion-header.directive';
import { AccordionBodyDirective } from './accordion-body.directive';

@Component({
  selector: 'app-accordion-section',
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class AccordionSectionComponent implements AfterViewInit {
  @ContentChildren(AccordionBodyDirective, { descendants: true })
  _sections: QueryList<AccordionBodyDirective>;

  @ContentChildren(AccordionHeaderDirective, { descendants: true })
  _headers: QueryList<AccordionHeaderDirective>;

  @Input() public isCollapsed: boolean = true;
  @Output() public isCollapsedChanged: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  public labelTemplate: TemplateRef<any>;
  public bodyTemplate: TemplateRef<any>;

  ngAfterViewInit() {
    this.labelTemplate =
      this._headers.length > 0 ? this._headers.first.templateRef : null;
    this.bodyTemplate =
      this._sections.length > 0 ? this._sections.first.templateRef : null;
  }

  setCollapsed(value: boolean) {
    this.isCollapsed = value;
    this.isCollapsedChanged.emit(value);
  }
}

import {
  AfterViewInit,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { AccordionSectionComponent } from './accordion-section.component';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.less'],
})
export class AccordionComponent implements AfterViewInit {
  @ContentChildren(AccordionSectionComponent)
  _sectionsList: QueryList<AccordionSectionComponent>;

  sections: AccordionSectionComponent[];

  ngAfterViewInit() {
    setTimeout(() => {
      this.sections = this._sectionsList.toArray();
    }, 100);
  }

  toggle(i: number): void {
    if (this.sections[i].isCollapsed) {
      this.sections[i].setCollapsed(!this.sections[i].isCollapsed);

      this._sectionsList
        .toArray()
        .forEach((section: AccordionSectionComponent, idx: number) => {
          if (idx !== i) {
            section.setCollapsed(true);
          }
        });
    }
  }
}

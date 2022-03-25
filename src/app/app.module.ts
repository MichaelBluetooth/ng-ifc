import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IfcViewerComponent } from './ifc-viewer/ifc-viewer.component';
import { SpatialTreeComponent } from './spatial-tree/spatial-tree.component';
import { ElementContextMenuComponent } from './element-context-menu/element-context-menu.component';
import { ComponentTypesComponent } from './component-types/component-types.component';
import { AccordionComponent } from './accordion/accordion.component';
import { AccordionHeaderDirective } from './accordion/accordion-header.directive';
import { AccordionBodyDirective } from './accordion/accordion-body.directive';
import { AccordionSectionComponent } from './accordion/accordion-section.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { PropertiesDisplayComponent } from './properties-display/properties-display.component';

@NgModule({
  declarations: [
    AppComponent,
    IfcViewerComponent,
    SpatialTreeComponent,
    ElementContextMenuComponent,
    ComponentTypesComponent,
    AccordionComponent,
    AccordionSectionComponent,
    AccordionHeaderDirective,
    AccordionBodyDirective,
    ControlPanelComponent,
    PropertiesDisplayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

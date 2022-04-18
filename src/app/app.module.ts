import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SpatialTreeComponent } from './spatial-tree/spatial-tree.component';
import { ElementContextMenuComponent } from './element-context-menu/element-context-menu.component';
import { ComponentTypesComponent } from './component-types/component-types.component';
import { AccordionComponent } from './accordion/accordion.component';
import { AccordionHeaderDirective } from './accordion/accordion-header.directive';
import { AccordionBodyDirective } from './accordion/accordion-body.directive';
import { AccordionSectionComponent } from './accordion/accordion-section.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { PropertiesDisplayComponent } from './properties-display/properties-display.component';
import { IsUnitFieldPipe } from './is-unit-field.pipe';
import { PropValueDisplayPipe } from './prop-value-display.pipe';
import { IfcViewer2Component } from './ifc-viewer2/ifc-viewer2.component';
import { ButtonBarComponent } from './button-bar/button-bar.component';
import { PluralizeIFCTypePipe } from './pluralize-ifc-type.pipe';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    SpatialTreeComponent,
    ElementContextMenuComponent,
    ComponentTypesComponent,
    AccordionComponent,
    AccordionSectionComponent,
    AccordionHeaderDirective,
    AccordionBodyDirective,
    ControlPanelComponent,
    PropertiesDisplayComponent,
    IsUnitFieldPipe,
    PropValueDisplayPipe,
    IfcViewer2Component,
    ButtonBarComponent,
    PluralizeIFCTypePipe,
    ProgressSpinnerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IfcViewerComponent } from './ifc-viewer/ifc-viewer.component';
import { SpatialTreeComponent } from './spatial-tree/spatial-tree.component';
import { ElementContextMenuComponent } from './element-context-menu/element-context-menu.component';
import { ComponentTypesComponent } from './component-types/component-types.component';

@NgModule({
  declarations: [
    AppComponent,
    IfcViewerComponent,
    SpatialTreeComponent,
    ElementContextMenuComponent,
    ComponentTypesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

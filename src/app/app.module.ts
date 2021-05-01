import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';
import { EstudiosComponent } from './components/estudios/estudios.component';
import { ExperienciasComponent } from './components/experiencias/experiencias.component';
import { ConocimientosComponent } from './components/conocimientos/conocimientos.component';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [
    AppComponent,
    DatosPersonalesComponent,
    EstudiosComponent,
    ExperienciasComponent,
    ConocimientosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

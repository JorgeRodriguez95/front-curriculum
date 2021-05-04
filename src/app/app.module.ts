import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';
import { EstudiosComponent } from './components/estudios/estudios.component';
import { ExperienciasComponent } from './components/experiencias/experiencias.component';
import { ConocimientosComponent } from './components/conocimientos/conocimientos.component';
import { LayoutModule } from './layout/layout.module';
import { LoginComponent } from './security/login/login.component';
import { TokenInterceptor } from './security/interceptors/token.interceptor';
import { CurriculumComponent } from './components/curriculum/curriculum.component';
import { FormsComponent } from './components/experiencias/agregar-eliminar/forms/forms.component';
import { FormsEstudiosComponent } from './components/estudios/agregar-eliminar/forms-estudios/forms-estudios.component';
import { FormsConocimientosComponent } from './components/conocimientos/agregar-eliminar/forms-conocimientos/forms-conocimientos.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    DatosPersonalesComponent,
    EstudiosComponent,
    ExperienciasComponent,
    ConocimientosComponent,
    LoginComponent,
    CurriculumComponent,
    FormsComponent,
    FormsEstudiosComponent,
    FormsConocimientosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

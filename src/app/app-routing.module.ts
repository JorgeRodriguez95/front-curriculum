import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConocimientosComponent } from './components/conocimientos/conocimientos.component';
import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';
import { EstudiosComponent } from './components/estudios/estudios.component';
import { ExperienciasComponent } from './components/experiencias/experiencias.component';

const routes: Routes = [
  { path: 'datos-personales', component: DatosPersonalesComponent},
  { path: 'experiencias', component: ExperienciasComponent },
  { path: 'estudios', component: EstudiosComponent },
  { path: 'conocimientos', component: ConocimientosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

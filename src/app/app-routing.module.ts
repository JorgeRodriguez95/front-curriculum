import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsConocimientosComponent } from './components/conocimientos/agregar-eliminar/forms-conocimientos/forms-conocimientos.component';
import { ConocimientosComponent } from './components/conocimientos/conocimientos.component';
import { CurriculumComponent } from './components/curriculum/curriculum.component';
import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';
import { FormsEstudiosComponent } from './components/estudios/agregar-eliminar/forms-estudios/forms-estudios.component';
import { EstudiosComponent } from './components/estudios/estudios.component';
import { FormsComponent } from './components/experiencias/agregar-eliminar/forms/forms.component';
import { ExperienciasComponent } from './components/experiencias/experiencias.component';
import { AuthGuard } from './security/guards/auth.guard';
import { RoleGuard } from './security/guards/role.guard';
import { LoginComponent } from './security/login/login.component';

const routes: Routes = [
  { path: 'datos-personales', component: DatosPersonalesComponent, canActivate: [AuthGuard] },
  { path: 'experiencias', component: ExperienciasComponent, canActivate: [AuthGuard] },
  { path: 'experiencias/agregar/:id', component: FormsComponent },
  { path: 'experiencias/agregar', component: FormsComponent },
  { path: 'estudios', component: EstudiosComponent, canActivate: [AuthGuard] },
  { path: 'estudios/agregar/:id', component: FormsEstudiosComponent },
  { path: 'estudios/agregar', component: FormsEstudiosComponent },
  { path: 'conocimientos', component: ConocimientosComponent, canActivate: [AuthGuard] },
  { path: 'conocimientos/agregar/:id', component: FormsConocimientosComponent, canActivate: [AuthGuard] },
  { path: 'conocimientos/agregar', component: FormsConocimientosComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: ':persona', component: CurriculumComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

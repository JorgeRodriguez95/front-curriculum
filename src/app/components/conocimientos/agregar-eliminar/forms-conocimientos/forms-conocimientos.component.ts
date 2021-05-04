import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Conocimiento } from 'src/app/models/conocimiento';
import { ConocimientoService } from 'src/app/services/conocimiento.service';
import { PersonasService } from 'src/app/services/persona.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-forms-conocimientos',
  templateUrl: './forms-conocimientos.component.html',
  styleUrls: ['./forms-conocimientos.component.css']
})
export class FormsConocimientosComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private conocimientoService: ConocimientoService,
    private router: Router, private personaService: PersonasService) { }

  public formConocimiento: FormGroup = new FormGroup({
    nombre: new FormControl(),
    descripcion: new FormControl(),
    nivel: new FormControl()
  });

  public conocimiento: Conocimiento = new Conocimiento();
  public titulo: string = '';
  public idConocimiento: number;
  public idPersona: number;
  public valores: number[] = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idConocimiento = params['id'];
      this.idPersona = +sessionStorage.getItem('idPersona');
      if (this.idConocimiento) {
        this.validarPermiso();
        this.titulo = 'Editar';
        this.conocimientoService.findConocimiento(this.idConocimiento).subscribe(response => {
          this.formularioEditar(response);
        });
      } else {
        this.titulo = 'Agregar';
        this.formularioCrear();
      }
    })
  }

  formularioEditar(con: Conocimiento) {
    this.formConocimiento = new FormGroup({
      nombre: new FormControl(con.nombre),
      descripcion: new FormControl(con.descripcion),
      nivel: new FormControl(con.nivel)
    })
  }

  guardarForm() {
    this.conocimiento = this.formConocimiento.value;
    if (this.idConocimiento) {
      this.conocimiento.id = this.idConocimiento;
      this.conocimientoService.update(this.conocimiento).subscribe(response => {
        swal.fire('Modificado con éxito', 'Modificado con éxito', 'success');
        this.router.navigate(['/conocimientos/']);
      }, err =>{
        swal.fire('Error al ingresar', 'Error del servidor', 'error');
        console.log(err.error.errors);
      });
    } else {
      this.conocimientoService.create(this.conocimiento).subscribe(response => {
        this.personaService.addConocimiento(this.idPersona, response).subscribe(response => {
          swal.fire('Ingresado con éxito', 'Ingresado con éxito', 'success');
          this.router.navigate(['/conocimientos/']);
        });
      }, err =>{
        swal.fire('Error al ingresar', 'Error del servidor', 'error');
        console.log(err.error.errors);
      });
    }
  }

  formularioCrear() {
    this.formConocimiento = new FormGroup({
      nombre: new FormControl(),
      descripcion: new FormControl(),
      nivel: new FormControl()
    })
  }

  validarPermiso() {
    this.personaService.getPersonaById(this.idPersona).subscribe(response => {
      let obj = response.conocimientos.find(e => e.id == this.idConocimiento);
      if (!obj) {
        this.router.navigate(['/datos-personales']);
      }
    });
  }

}

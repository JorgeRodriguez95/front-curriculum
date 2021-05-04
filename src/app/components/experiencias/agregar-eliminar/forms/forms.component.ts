import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciasService } from 'src/app/services/experiencia.service';
import { PersonasService } from 'src/app/services/persona.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private experienciaService: ExperienciasService,
    private router: Router, private personaService: PersonasService, private dp: DatePipe) { }

  public formExperiencia: FormGroup = new FormGroup({
    cargo: new FormControl(),
    descripcion: new FormControl(),
    lugar: new FormControl(),
    inicio: new FormControl(),
    termino: new FormControl()
  });

  public titulo: string = '';
  public fin: string = '';
  public inicio: string = '';
  public idPersona: number;

  public experiencia: Experiencia = new Experiencia();
  public idExperiencia: number;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idExperiencia = params['id'];
      this.idPersona = +sessionStorage.getItem('idPersona');
      if (this.idExperiencia) {
        this.validarPermiso();
        this.titulo = 'Editar';
        this.experienciaService.findExperiencia(this.idExperiencia).subscribe(response => {
          this.formularioEditar(response);
        });
      } else {
        this.titulo = 'Agregar';
        this.formularioCrear();
      }
    })
  }

  formularioEditar(exp: Experiencia) {
    this.fin = this.dp.transform(exp.termino, 'yyyy-MM-dd');
    this.inicio = this.dp.transform(exp.inicio, 'yyyy-MM-dd');
    this.formExperiencia = new FormGroup({
      cargo: new FormControl(exp.cargo),
      descripcion: new FormControl(exp.descripcion),
      lugar: new FormControl(exp.lugar),
      inicio: new FormControl(exp.inicio),
      termino: new FormControl(this.fin)
    })
  }

  guardarForm() {
    this.experiencia = this.formExperiencia.value;
    console.log(this.experiencia);
    if (this.idExperiencia) {
      this.experiencia.id = this.idExperiencia;
      this.experienciaService.update(this.experiencia).subscribe(response => {
        swal.fire('Modificado con éxito', 'Modificado con éxito', 'success');
        this.router.navigate(['/experiencias/']);
      }, err =>{
        swal.fire('Error al modificar', 'Error del servidor', 'error');
        console.log(err.error.errors);
      });
    } else {
      this.experienciaService.create(this.experiencia).subscribe(response => {
        this.personaService.addExperiencia(this.idPersona, response).subscribe(response => {
          swal.fire('Agregado con éxito', 'Agregado con éxito', 'success');
          this.router.navigate(['/experiencias/']);
        });
      }, err =>{
        swal.fire('Error al ingresar', 'Error del servidor', 'error');
        console.log(err.error.errors);
      });
    }
  }

  formularioCrear() {
    this.formExperiencia = new FormGroup({
      cargo: new FormControl(),
      descripcion: new FormControl(),
      lugar: new FormControl(),
      inicio: new FormControl(),
      termino: new FormControl()
    })
  }

  validarPermiso() {
    this.personaService.getPersonaById(this.idPersona).subscribe(response => {
      let obj = response.experiencias.find(e => e.id == this.idExperiencia);
      if (!obj) {
        this.router.navigate(['/datos-personales']);
      }
    });
  }
}

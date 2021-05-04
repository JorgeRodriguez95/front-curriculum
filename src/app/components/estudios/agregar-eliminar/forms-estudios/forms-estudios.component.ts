import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudio } from 'src/app/models/estudio';
import { EstudioService } from 'src/app/services/estudio.service';
import { PersonasService } from 'src/app/services/persona.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-forms-estudios',
  templateUrl: './forms-estudios.component.html',
  styleUrls: ['./forms-estudios.component.css']
})
export class FormsEstudiosComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private estudioService: EstudioService,
    private router: Router, private personaService: PersonasService, private dp: DatePipe) { }

  public formEstudio: FormGroup = new FormGroup({
    nombreTitulo: new FormControl(),
    tipoEstudio: new FormControl(),
    institucion: new FormControl(),
    desde: new FormControl(),
    hasta: new FormControl()
  });

  public estudio: Estudio = new Estudio();
  public titulo: string = '';
  public idEstudio: number;
  public inicio: string = '';
  public fin: string = '';

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idEstudio = params['id']
      if (this.idEstudio) {
        this.titulo = 'Editar';
        this.estudioService.findEstudio(this.idEstudio).subscribe(response => {
          this.formularioEditar(response);
        });
      } else {
        this.titulo = 'Agregar';
        this.formularioCrear();
      }
    })
  }

  formularioEditar(exp: Estudio) {
    this.fin = this.dp.transform(exp.hasta, 'yyyy-MM-dd');
    this.inicio = this.dp.transform(exp.desde, 'yyyy-MM-dd');
    this.formEstudio = new FormGroup({
      nombreTitulo: new FormControl(exp.nombreTitulo),
      tipoEstudio: new FormControl(exp.tipoEstudio),
      institucion: new FormControl(exp.institucion),
      desde: new FormControl(exp.desde),
      hasta: new FormControl(exp.hasta)
    })
  }

  guardarForm() {
    this.estudio = this.formEstudio.value;
    if (this.idEstudio) {
      this.estudio.id = this.idEstudio;
      this.estudioService.update(this.estudio).subscribe(response => {
        swal.fire('Modificado con éxito', 'Modificado con éxito', 'success');
        this.router.navigate(['/estudios/']);
      }, err =>{
        console.log(err);
      });
    } else {
      this.estudioService.create(this.estudio).subscribe(response => {
        let idPersona = sessionStorage.getItem('idPersona');
        this.personaService.addEstudio(+idPersona, response).subscribe(response => {
          swal.fire('Ingresado con éxito', 'Ingresado con éxito', 'success');
          this.router.navigate(['/estudios/']);
        });
      }, err =>{
        swal.fire('Error al ingresar', 'Error del servidor', 'error');
        console.log(err.error.errors);
      });
    }
  }

  formularioCrear() {
    this.formEstudio = new FormGroup({
      nombreTitulo: new FormControl(),
      tipoEstudio: new FormControl(),
      institucion: new FormControl(),
      desde: new FormControl(),
      hasta: new FormControl()
    })
  }

}

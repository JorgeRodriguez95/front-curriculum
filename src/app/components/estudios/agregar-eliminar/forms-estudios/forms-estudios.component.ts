import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudio } from 'src/app/models/estudio';
import { EstudioService } from 'src/app/services/estudio.service';
import { PersonasService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-forms-estudios',
  templateUrl: './forms-estudios.component.html',
  styleUrls: ['./forms-estudios.component.css']
})
export class FormsEstudiosComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private estudioService: EstudioService,
    private router: Router, private personaService: PersonasService) { }

  public formEstudio: FormGroup = new FormGroup({
    nombreTitulo: new FormControl(),
    tipoEstudio: new FormControl()
  });

  public estudio: Estudio = new Estudio();
  public titulo: string = '';
  public idEstudio: number;

  ngOnInit(): void {
    console.log('ESTUDIO');
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
    this.formEstudio = new FormGroup({
      nombreTitulo: new FormControl(exp.nombreTitulo),
      tipoEstudio: new FormControl(exp.tipoEstudio)
    })
  }

  guardarForm() {
    this.estudio = this.formEstudio.value;
    if (this.idEstudio) {
      this.estudio.id = this.idEstudio;
      this.estudioService.update(this.estudio).subscribe(response => {
        this.router.navigate(['/estudios/']);
      });
    } else {
      this.estudioService.create(this.estudio).subscribe(response => {
        let idPersona = sessionStorage.getItem('idPersona');
        this.personaService.addEstudio(+idPersona, response).subscribe(response => {
          this.router.navigate(['/estudios/']);
        });
      });
    }
  }

  formularioCrear() {
    this.formEstudio = new FormGroup({
      nombreTitulo: new FormControl(),
      tipoEstudio: new FormControl()
    })
  }

}

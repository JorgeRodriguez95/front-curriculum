import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciasService } from 'src/app/services/experiencia.service';
import { PersonasService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private experienciaService: ExperienciasService,
    private router: Router, private personaService: PersonasService) { }

  public formExperiencia: FormGroup = new FormGroup({
    cargo: new FormControl(),
    descripcion: new FormControl()
  });

  public titulo: string = '';

  public experiencia: Experiencia = new Experiencia();
  public idExperiencia: number;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idExperiencia = params['id']
      if (this.idExperiencia) {
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
    this.formExperiencia = new FormGroup({
      cargo: new FormControl(exp.cargo),
      descripcion: new FormControl(exp.descripcion)
    })
  }

  guardarForm() {
    this.experiencia = this.formExperiencia.value;
    if (this.idExperiencia) {
      this.experiencia.id = this.idExperiencia;
      this.experienciaService.update(this.experiencia).subscribe(response => {
        this.router.navigate(['/experiencias/']);
      });
    } else {
      this.experienciaService.create(this.experiencia).subscribe(response => {
        let idPersona = sessionStorage.getItem('idPersona');
        this.personaService.addExperiencia(+idPersona, response).subscribe(response => {
          this.router.navigate(['/experiencias/']);
        });
      });
    }
  }

  formularioCrear() {
    this.formExperiencia = new FormGroup({
      cargo: new FormControl(),
      descripcion: new FormControl()
    })
  }
}

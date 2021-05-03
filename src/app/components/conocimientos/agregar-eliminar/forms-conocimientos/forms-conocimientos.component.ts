import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Conocimiento } from 'src/app/models/conocimiento';
import { ConocimientoService } from 'src/app/services/conocimiento.service';
import { PersonasService } from 'src/app/services/persona.service';

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
    descripcion: new FormControl()
  });

  public conocimiento: Conocimiento = new Conocimiento();
  public titulo: string = '';
  public idConocimiento: number;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idConocimiento = params['id']
      if (this.idConocimiento) {
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
      descripcion: new FormControl(con.descripcion)
    })
  }

  guardarForm() {
    this.conocimiento = this.formConocimiento.value;
    if (this.idConocimiento) {
      this.conocimiento.id = this.idConocimiento;
      this.conocimientoService.update(this.conocimiento).subscribe(response => {
        this.router.navigate(['/conocimientos/']);
      });
    } else {
      console.log('guardarasdad');
      this.conocimientoService.create(this.conocimiento).subscribe(response => {
        let idPersona = sessionStorage.getItem('idPersona');
        this.personaService.addConocimiento(+idPersona, response).subscribe(response => {
          this.router.navigate(['/conocimientos/']);
        });
      });
    }
  }

  formularioCrear() {
    this.formConocimiento = new FormGroup({
      nombre: new FormControl(),
      descripcion: new FormControl()
    })
  }

}

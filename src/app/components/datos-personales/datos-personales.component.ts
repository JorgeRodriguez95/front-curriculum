import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Persona } from 'src/app/models/persona';
import { AuthService } from 'src/app/security/login/auth.service';
import { PersonasService } from 'src/app/services/persona.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  constructor(private service: PersonasService, private authService: AuthService) { }

  public persona: Persona = new Persona();
  public titulo: string = "Datos Personales";
  public editable = false;
  public idPersona: number;

  private fotoPerfil: File;
  private fotoBanner: File;

  public formPersona: FormGroup = new FormGroup({
    nombre: new FormControl(),
    apellido: new FormControl(),
    segundoApellido: new FormControl(),
    correo: new FormControl(),
    telefono: new FormControl()
  });

  ngOnInit(): void {
    this.service.getPersonaByUsername(this.authService.usuario.username).subscribe(response => {
      this.persona = response;
      this.idPersona = this.persona.id;
      sessionStorage.setItem('idPersona', JSON.stringify(this.persona.id));
      this.formPersona = new FormGroup({
        nombre: new FormControl(this.persona.nombre),
        apellido: new FormControl(this.persona.apellido),
        segundoApellido: new FormControl(this.persona.segundoApellido),
        correo: new FormControl(this.persona.correo),
        telefono: new FormControl(this.persona.telefono)
      });
      this.formPersona.disable();
    })
  }

  update() {
    if (this.editable) {
      this.persona = this.formPersona.value;
      this.persona.id = this.idPersona;
      this.service.update(this.persona).subscribe(response => {
        this.persona = response;
        swal.fire('Modificado con éxito', 'Modificado con éxito', 'success');
        this.editable = false;
      })
    }
  }

  modificar() {
    this.editable = true;
  }

  seleccionarFotoPerfil(event) {
    this.fotoPerfil = event.target.files[0];
    console.log(this.fotoPerfil);
  }

  seleccionarFotoBanner(event) {
    this.fotoPerfil = event.target.files[0];
    console.log(this.fotoPerfil);
  }

}

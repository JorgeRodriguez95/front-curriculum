import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private service: PersonasService, private authService: AuthService,
    private router: Router) { }

  public persona: Persona = new Persona();
  public titulo: string = "Datos Personales";
  public editable = false;
  public idPersona: number;

  private fotoPerfil: File;
  private fotoBanner: File;
  private archivo: File;

  public formPersona: FormGroup = new FormGroup({
    nombre: new FormControl(),
    apellido: new FormControl(),
    segundoApellido: new FormControl(),
    correo: new FormControl(),
    telefono: new FormControl(),
    presentacion: new FormControl()
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
        telefono: new FormControl(this.persona.telefono),
        presentacion: new FormControl(this.persona.presentacion)
      });
      this.formPersona.disable();
    }, err=> {
      swal.fire('No se pudo cargar el usuario', 'Error del servidor', 'error');
    })
  }

  update() {
    if (this.editable) {
      this.persona = this.formPersona.value;
      
      console.log(this.persona);
      this.persona.id = this.idPersona;
      this.service.update(this.persona).subscribe(response => {
        this.persona = response;
        swal.fire('Modificado con éxito', 'Modificado con éxito', 'success');
        this.editable = false;
      }, err =>{
        swal.fire('No se pudo actualizar el registro', 'Error del servidor', 'error');
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
    this.fotoBanner = event.target.files[0];
    console.log(this.fotoPerfil);
  }

  verCurriculum(){
    this.router.navigate(['/'+this.persona.nombre + '_' +this.persona.apellido]);
  }

  subirFoto(tipo: string){
    if(tipo === 'perfil'){
      this.archivo = this.fotoPerfil;
    }
    if(tipo === 'banner'){
      this.archivo = this.fotoBanner;
    }
    if(this.archivo){
      this.service.addFoto(this.archivo, this.idPersona, tipo).subscribe(response =>{
        swal.fire('Foto de '+ tipo +' ingresada con éxito', 'Modificado con éxito', 'success');
      })
    }else{
      swal.fire('No hay foto que subir', '', 'error');
    }
  }

}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Experiencia } from 'src/app/models/experiencia';
import { Persona } from 'src/app/models/persona';
import { AuthService } from 'src/app/security/login/auth.service';
import { ExperienciasService } from 'src/app/services/experiencia.service';
import { PersonasService } from 'src/app/services/persona.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-experiencias',
  templateUrl: './experiencias.component.html',
  styleUrls: ['./experiencias.component.css']
})
export class ExperienciasComponent implements OnInit {

  public persona: Persona = new Persona();

  public subscription: Subscription;

  constructor(private experienciaService: ExperienciasService,
    private personaService: PersonasService, private authService: AuthService,
    private router: Router ) { }

  ngOnInit(): void {
    this.subscription = this.personaService.getPersonaByUsername(this.authService.usuario.username).subscribe(response => {
      this.persona = response;
    });
  }

  modificar(id: any){
    this.router.navigate(['experiencias/agregar', id]);
  }

  eliminar(exp: Experiencia){
    let idPersona = sessionStorage.getItem('idPersona');
    this.personaService.quitarExperiencia(+idPersona, exp).subscribe(response =>{
      this.experienciaService.delete(exp.id).subscribe(response =>{
        this.subscription = this.personaService.getPersonaByUsername(this.authService.usuario.username).subscribe(response => {
          this.persona = response;
          swal.fire('Eliminado con éxito', 'Eliminado con éxito', 'success');
        });
      })
    });
  }

  ngOnDestroy(){
    this.persona = null;
    this.subscription.unsubscribe();
  }

  agregar(){
    this.router.navigate(['experiencias/agregar']);
  }

}

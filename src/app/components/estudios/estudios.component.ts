import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Estudio } from 'src/app/models/estudio';
import { Persona } from 'src/app/models/persona';
import { AuthService } from 'src/app/security/login/auth.service';
import { EstudioService } from 'src/app/services/estudio.service';
import { PersonasService } from 'src/app/services/persona.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent implements OnInit {

  public persona: Persona = new Persona();

  public subscription: Subscription;

  constructor(private estudioService: EstudioService,
    private personaService: PersonasService, private authService: AuthService,
    private router: Router ) { }

  ngOnInit(): void {
    this.subscription = this.personaService.getPersonaByUsername(this.authService.usuario.username).subscribe(response => {
      this.persona = response;
    });
  }

  modificar(id: any){
    this.router.navigate(['estudios/agregar', id]);
  }

  eliminar(est: Estudio){
    let idPersona = sessionStorage.getItem('idPersona');
    this.personaService.quitarEstudio(+idPersona, est).subscribe(response =>{
      this.estudioService.delete(est.id).subscribe(response =>{
        this.subscription = this.personaService.getPersonaByUsername(this.authService.usuario.username).subscribe(response => {
          this.persona = response;
          swal.fire('Eliminado', 'Estudio eliminado', 'success');
        });
      })
    });
  }

  ngOnDestroy(){
    this.persona = null;
    this.subscription.unsubscribe();
  }

  agregar(){
    this.router.navigate(['estudios/agregar']);
  }

}

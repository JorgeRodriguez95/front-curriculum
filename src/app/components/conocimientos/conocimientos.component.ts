import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Conocimiento } from 'src/app/models/conocimiento';
import { Persona } from 'src/app/models/persona';
import { AuthService } from 'src/app/security/login/auth.service';
import { ConocimientoService } from 'src/app/services/conocimiento.service';
import { PersonasService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-conocimientos',
  templateUrl: './conocimientos.component.html',
  styleUrls: ['./conocimientos.component.css']
})
export class ConocimientosComponent implements OnInit {

  public persona: Persona = new Persona();

  public subscription: Subscription;

  constructor(
    private personaService: PersonasService, private authService: AuthService,
    private router: Router, private conocimientoService: ConocimientoService) { }

  ngOnInit(): void {
    this.subscription = this.personaService.getPersonaByUsername(this.authService.usuario.username).subscribe(response => {
      this.persona = response;
    });
  }

  modificar(id: any) {
    this.router.navigate(['conocimientos/agregar', id]);
  }

  eliminar(con: Conocimiento) {
    let idPersona = sessionStorage.getItem('idPersona');
    this.personaService.quitarConocimiento(+idPersona, con).subscribe(response => {
      this.conocimientoService.delete(con.id).subscribe(response =>{
        this.subscription = this.personaService.getPersonaByUsername(this.authService.usuario.username).subscribe(response => {
          this.persona = response;
        });
      })
    });
  }

  ngOnDestroy() {
    this.persona = null;
    this.subscription.unsubscribe();
  }

  agregar() {
    this.router.navigate(['conocimientos/agregar']);
  }

}

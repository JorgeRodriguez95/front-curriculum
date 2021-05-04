import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from './auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo: string = "Por favor, inicia sesión";
  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) { 
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }

  login(){
    if(this.usuario.username == null || this.usuario.password == null){
      swal.fire('Error', 'Credenciales vacías!', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);

      let usuario = this.authService.usuario;
      swal.fire('Login', `Hola ${usuario.username}, has iniciado sesión con éxito!`, 'success');
      this.router.navigate(['/datos-personales']);
    },err => {
      if(err.status = 400){
        swal.fire('Error', 'Credenciales invalidas', 'error');
      }
    });
  }

}

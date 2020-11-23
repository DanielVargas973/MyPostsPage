import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user: UserModel = new UserModel();

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  onRegister(form: NgForm) {
    let responseService;
    if (form.invalid) { return; }
    Swal.fire({
      allowOutsideClick: false,
      text: 'Por favor espere',
      icon: 'info'
    });
    Swal.showLoading();
    this.auth.createUser(this.user).subscribe(response => {
      responseService = response;
      if (!responseService.newUser) {
        Swal.fire({
          allowOutsideClick: false,
          text: 'El correo especificado ya se encuentra registrado',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      } else {
        Swal.close();
        Swal.fire({
          allowOutsideClick: false,
          text: 'El registro se ha realizado de forma exitosa',
          icon: 'info',
          confirmButtonText: 'Cerrar'
        });
      }
    }, error => {
      responseService = error;
      Swal.fire({
        allowOutsideClick: false,
        text: 'Sucedió algo intesperado, lo sentimos',
        icon: 'error',
        confirmButtonText: 'Uh, ok'
      });
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { logWarnings } from 'protractor/built/driverProviders';
import Swal from 'sweetalert2';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel = new UserModel();
  rememberUser = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email');
      this.rememberUser = true;
    }
  }
  login(form: NgForm) {
    let responseService;
    if (form.invalid) { return; }
    Swal.fire({
      allowOutsideClick: false,
      text: 'Por favor espere',
      icon: 'info'
    });
    Swal.showLoading();
    this.authService.logIn(this.user)
      .subscribe(response => {
        responseService = response;
        if (responseService.id === 0) {
          Swal.fire({
            allowOutsideClick: false,
            text: 'Los datos ingresados son incorrectos',
            icon: 'error',
            confirmButtonText: 'Cerrar'
          });
        } else {
          Swal.close();
          if (this.rememberUser) {
            localStorage.setItem('email', this.user.email);
          }
          this.router.navigateByUrl('/home');
        }
      }, (error) => {
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

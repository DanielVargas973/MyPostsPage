import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PostModel } from '../../../../models/post.model';
import { AuthService } from '../../../../services/auth.service';
import { PostService } from '../../../../services/post.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  postModel: PostModel = new PostModel();

  constructor(private authService: AuthService, private postService: PostService, private router: Router) { }

  ngOnInit() {
  }

  newPost(form: NgForm) {
    if (form.invalid) { return false; }
    Swal.fire({
      allowOutsideClick: false,
      text: 'Por favor espere',
      icon: 'info'
    });
    Swal.showLoading();
    this.postModel.creationDate = new Date().toISOString();
    this.postModel.idUserPost = this.authService.getIdUser();
    if (this.authService.sessionStatus()) {
      const tokenSesion = this.authService.getToken();
      this.postService.newPost(this.postModel, tokenSesion).
        subscribe(response => {
          console.log(response);
          if (response) {
            Swal.close();
            Swal.fire({
              allowOutsideClick: false,
              text: 'Tu post se ha creado de forma exitosa',
              icon: 'info',
              confirmButtonText: 'Cerrar',
            });
            this.router.navigateByUrl('/home');
          } else {
            Swal.close();
            Swal.fire({
              allowOutsideClick: false,
              text: 'Lo sentimos, tuvimos problemas al crear tu post',
              icon: 'error',
              confirmButtonText: 'Cerrar'
            });
          }
        });
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}

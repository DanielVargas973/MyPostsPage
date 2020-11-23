import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PostModel } from '../../../models/post.model';
import { AuthService } from '../../../services/auth.service';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() postModel: PostModel;
  constructor(private router: Router, private authService: AuthService, private postService: PostService) {
  }

  ngOnInit() {
  }
  deletePost(idPost: number) {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Por favor espere',
      icon: 'info'
    });
    Swal.showLoading();
    this.postModel.creationDate = new Date().toISOString();
    console.log(this.postModel.creationDate);
    this.postModel.idUserPost = this.authService.getIdUser();
    if (this.authService.sessionStatus()) {
      const tokenSesion = this.authService.getToken();
      this.postService.deletePost(idPost, tokenSesion).
        subscribe(response => {
          console.log(response);
          if (response) {
            Swal.close();
            Swal.fire({
              allowOutsideClick: false,
              text: 'Tu post se ha eliminado de forma exitosa',
              icon: 'info',
              confirmButtonText: 'Cerrar',
            });
            this.router.navigateByUrl('/home');
          } else {
            Swal.close();
            Swal.fire({
              allowOutsideClick: false,
              text: 'Lo sentimos, tuvimos problemas al eliminar tu post',
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

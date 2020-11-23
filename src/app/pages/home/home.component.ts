import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from 'src/app/models/post.model';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postModels: PostModel[];
  constructor(private authService: AuthService, private router: Router, private postServece: PostService) {
    this.getPosts();
  }

  ngOnInit() {
  }

  closeSession() {
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }

  getPosts() {
    if (this.authService.sessionStatus()) {
      const IdUserPost = this.authService.getIdUser();
      const tokenSesion = this.authService.getToken();
      this.postServece.listPost(IdUserPost, tokenSesion).subscribe(next => {
        this.postModels = next;
        console.log(this.postModels);
      });
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}

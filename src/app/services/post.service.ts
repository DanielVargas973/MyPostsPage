import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostModel } from '../models/post.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  newPost(postModel: PostModel, tokenJwt: string) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          // tslint:disable-next-line: object-literal-key-quotes
          'Authorization': `Bearer ${tokenJwt}`
        }
      )
    };
    return this.http.post(`/api/Post/new`, postModel, httpOptions).pipe(
      map(response => {
        console.log(response);
        return true;
      }, (error) => {
        console.log(error);
        return false;
      })
    );
  }
  listPost(idUser: number, tokenJwt: string) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          // tslint:disable-next-line: object-literal-key-quotes
          'Authorization': `Bearer ${tokenJwt}`
        }
      )
    };
    return this.http.get<PostModel[]>(`/api/Post/list/${idUser}`, httpOptions);
  }
  deletePost(idUser: number, tokenJwt: string) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          // tslint:disable-next-line: object-literal-key-quotes
          'Authorization': `Bearer ${tokenJwt}`
        }
      )
    };
    return this.http.delete(`/api/Post/delete/${idUser}`, httpOptions);
  }
}

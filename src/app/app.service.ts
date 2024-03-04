import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Response} from "./response";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private readonly baseUrl = `http://localhost:8080/app-controller/equation`;
  // private httpClient = inject(HttpClient);
  constructor(private httpClient: HttpClient) {}


  equationMake(func:number, method:number, firstBoundaryOfInterval:number, secondBoundaryOfInterval:number, inaccuracy:number){
    console.log("appservice")
    const formData = {
      func: func,
      method: method,
      firstBoundaryOfInterval: firstBoundaryOfInterval,
      secondBoundaryOfInterval:secondBoundaryOfInterval,
      inaccuracy: inaccuracy
    };
    console.log(formData);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient
      .post<Response>(`${this.baseUrl}`, JSON.stringify(formData), { headers });
  }

}

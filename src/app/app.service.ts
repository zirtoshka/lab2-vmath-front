import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

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
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient
      .post<String>(`${this.baseUrl}`, JSON.stringify(formData), { headers });
  }

}

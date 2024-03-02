import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private readonly baseUrl = `http://localhost:8080/app-controller/equation`;
  // private httpClient = inject(HttpClient);
  constructor(private httpClient: HttpClient) {}


  equationMake(func:number, method:number, a:number, b:number){
    console.log("appservice")
    const formData = {
      func: func,
      method: method,
      a: a,
      b:b
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient
      .post<String>(`${this.baseUrl}`, JSON.stringify(formData), { headers });
  }

}

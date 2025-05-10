import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http:HttpClient) { }
  isLogin=false;

  registerAPI="http://localhost:5000/users/register"
  register(body:any):Observable<any>{
    return this.http.post(`${this.registerAPI}`,body)
  }

  loginAPI="http://localhost:5000/users/login"
  login(body:any):Observable<any>{
    return this.http.post(`${this.loginAPI}`,body)
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {enviroment} from "../../../enviroments/enviroment";
import {UserEntity} from "../model/user.entity";
import {BehaviorSubject, map, Observable} from "rxjs";
import {LoginRequestDTO} from "../model/login-request.dto";
import {ApiResponseEntity} from "../../../shared/model/api_response.entity";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn = new BehaviorSubject<boolean>(false);

  private baseUrl = enviroment.apiBaseUrl;


  constructor(private http: HttpClient) { }

  get isLoggedIn(){
    return this.loggedIn.asObservable();
  }

  // proceso de registro de nuevo usuario
  public registration(user: UserEntity): Observable<UserEntity> {
    return this.http.post<UserEntity>(this.baseUrl + '/user', user).pipe(map(data => data as UserEntity));
  }

  // proceso de login
  public login(user: LoginRequestDTO){
    return this.http.post(this.baseUrl + '/user/auth', user).pipe(map(data => data as ApiResponseEntity));
  }


}

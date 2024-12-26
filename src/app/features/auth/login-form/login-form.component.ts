import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginRequestDTO} from "../model/login-request.dto";
import {ApiResponseEntity} from "../../../shared/model/api_response.entity";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit{

  frm_login!: FormGroup;
  response!: ApiResponseEntity;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ){}

  ngOnInit() {
    this.frm_login = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  // validar inicio de sesion
  login(){
    let loginRequest: LoginRequestDTO = new LoginRequestDTO();
    console.table(this.frm_login.value);
    loginRequest = this.frm_login.value;

    this.authService.login(loginRequest).subscribe({
      next:(data)=>{
        this.response = data;
        if(this.response.data!==null && this.response.estado === 'SUCCESS' ){
          this.authService.loggedIn.next(true);
          this.router.navigateByUrl('/home');
        }
        sessionStorage.setItem('userLogged', JSON.stringify(this.response.data) );
      },
      error:()=>{
        Swal.fire({
          title: "Error",
          text: " Favor, revise sus credenciales",
          icon: "error",
          draggable: true
        });
      },
      complete:()=>{}
    })
  }
}

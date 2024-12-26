import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {

  registrationForm: FormGroup;
  animacion = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router

  ) {
    this.registrationForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwordHash: ['', Validators.required]
    });
  }

  onSubmit() {
    this.animacion = true;
    if (this.registrationForm.valid) {
      this.authService.registration(this.registrationForm.value).subscribe({
        next: (res) => {

        },
        error: () => {
          Swal.fire({
            title: "Error al crear el usuario",
            icon: "error",
            draggable: true
          });
          this.animacion = false;
        },
        complete: () => {
          this.animacion = false;
          Swal.fire({
            title: "Usuario creado con exito",
            icon: "success",
            draggable: true
          });
          this.router.navigateByUrl('/home');
        }
      })
    }
  }

}

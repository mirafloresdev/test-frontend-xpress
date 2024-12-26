import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../service/task.service";
import {TaskEntity} from "../model/task.entity";
import {UserEntity} from "../../auth/model/user.entity";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import Swal from 'sweetalert2'



@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {


  frm_task!: FormGroup;
  userData: UserEntity = new UserEntity();
  animacion = false;
  isEdit = false;
  editTask: TaskEntity = new TaskEntity();
  btn_save = 'Guardar tarea';
  lbl_title = 'Nueva tarea';
  lbl_alert = 'Tarea creada con exito!';

  constructor(
    private taskService: TaskService,
    private modal: MatDialog,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit() {
    this.editTask = this.data.task ?? new TaskEntity();
    this.isEdit = this.data.isEdit;


    this.frm_task = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      scheduledDate: ['', Validators.required],
      status: ['pending', Validators.required]
    });

    if (this.isEdit) {
      this.lbl_alert = 'Tarea actualizada con exito!';
      this.btn_save = 'Actualizar tarea';
      this.lbl_title = 'Editar tarea';
      this.frm_task.patchValue(
        {
          title: this.editTask.title,
          description: this.editTask.description,
          priority: this.editTask.priority,
          scheduledDate: this.editTask.scheduledDate,
          status: this.editTask.status,
        }
      )
    }

  }

  saveOrEditTask() {
    this.animacion = true;
    let task: TaskEntity = new TaskEntity();
    const userLogged = sessionStorage.getItem('userLogged');

    if (userLogged) {
      this.userData = JSON.parse(userLogged);
      task = this.frm_task.value;
      task.userId = this.userData.userId;
      console.clear();
      console.table(task);
      if (this.isEdit) {
        task.taskId = this.editTask.taskId;
        task.status = this.frm_task.value.status;
      }

      this.taskService.save(task).subscribe({
        next: res => {
          console.log(res);
        },
        error: err => {
          this.animacion = false;
        },
        complete: () => {
          Swal.fire({
            title: this.lbl_alert,
            icon: "success",
            draggable: true
          });
          this.animacion = false;
          this.frm_task.reset();
          this.modal.closeAll();

        }
      });

    }

  }

}

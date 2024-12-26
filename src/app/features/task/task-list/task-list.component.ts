import {Component, OnInit} from '@angular/core';
import {TaskService} from "../service/task.service";
import {UserEntity} from "../../auth/model/user.entity";
import {TaskEntity} from "../model/task.entity";
import {MatDialog} from "@angular/material/dialog";
import {TaskCreateComponent} from "../task-create/task-create.component";
import {map} from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  userData: UserEntity | null = null;
  tasks: TaskEntity[] = [];
  animacion = false;

  constructor(
    private taskService: TaskService,
    private matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    const userLogged = sessionStorage.getItem('userLogged');

    if (userLogged) {
      try {
        this.userData = JSON.parse(userLogged);
        this.getTasks();
      } catch (error) {
        console.error('Error al parsear JSON de userLogged:', error);
        this.userData = null;
      }
    } else {
      this.userData = null;
    }

  }

  // obtener tasks
  public getTasks() {
    this.animacion = true;
    if (this.userData) {
      this.taskService.getTasks(this.userData.userId)
        .pipe(
          map(res => {
            const sortedTasks = res.data.sort((a: { taskId: number; }, b: { taskId: number; }) => b.taskId - a.taskId);
            return {...res, data: sortedTasks};
          })
        )
        .subscribe({
          next: res => {
            this.tasks = res.data;
            console.table(this.tasks);
          },
          error: err => {
            console.log(err);
          },
          complete: () => {
            console.log('complete');
            this.animacion = false;

          }
        });
    }

  }


  public crearNuevaTarea() {
    const dialog = this.matDialog.open(TaskCreateComponent, {
      width: '500px',
      panelClass: 'mat-dialog-panel',
      data: {
        isEdit: false,
        task: new TaskEntity()
      }
    });

    dialog.afterClosed().subscribe(result => {
      this.getTasks();
    });
  }

  public edit(task: TaskEntity) {
    const dialog = this.matDialog.open(TaskCreateComponent, {
      width: '500px',
      panelClass: 'mat-dialog-panel',
      data: {
        isEdit: true,
        task: task
      }
    });
    dialog.afterClosed().subscribe(result => {
      this.getTasks();
    });
  }

  public delete(task: TaskEntity) {
    Swal.fire({
      title: "Estas seguro de eliminar esta tarea?",
      text: "Perderas la informacion de esta tarea",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.delete(task.taskId).subscribe({
          next:(res)=>{

          },
          error:(err)=>{
            Swal.fire({
              title: "Error",
              text: "Algo paso al intentar elminar esta tarea",
              icon: "error"
            });
          },
          complete:()=>{
            Swal.fire({
              title: "Tarea eliminada!",
              text: "Tu tarea fue eliminada.",
              icon: "success"
            });
            this.getTasks();
          }
        });

      }
    });

  }

}

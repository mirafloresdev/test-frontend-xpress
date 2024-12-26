import { Component } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { TaskService } from '../../task/service/task.service';
import { UserEntity } from '../../auth/model/user.entity';
import { TaskCalendarDetailComponent } from '../task-calendar-detail/task-calendar-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { parseISO } from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  viewDate: Date = new Date(); // Fecha actual
  events: CalendarEvent[] = []; // Eventos del calendario
  userData: UserEntity | null = null;
  
  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit() {
    const userLogged = sessionStorage.getItem('userLogged');

    if (userLogged) {
      try {
        this.userData = JSON.parse(userLogged);
        this.loadTasks();
      } catch (error) {
        console.error('Error al parsear JSON de userLogged:', error);
        this.userData = null;
      }
    } else {
      this.userData = null;
    }
  }

  //metodo para listar las tareas
  loadTasks(): void {
    if(this.userData){
      this.taskService.getTasks(this.userData.userId).subscribe((response) => {
        if (response.estado === 'SUCCESS' && response.data) {
          this.events = response.data.map((task: any) => ({
            id: task.taskId,
            start: parseISO(task.scheduledDate),
            title: task.title,
            color: this.getEventColor(task.priority),
            meta: task,
          }));
        }
      });
    }
  }

  getEventColor(priority: string): { primary: string; secondary: string } {
    // Devuelve colores según prioridad
    switch (priority.toLowerCase()) {
      case 'high':
        return { primary: '#f44336', secondary: '#FAE3E3' };
      case 'medium':
        return { primary: '#ff9800', secondary: '#D1E8FF' };
      case 'low':
        return { primary: '#8bc34a', secondary: '#FDF1BA' };
      default:
        return { primary: '#aaaaaa', secondary: '#eaeaea' };
    }
  }

   // Retroceder un mes
   previousMonth(): void {
    const newDate = new Date(this.viewDate);
    newDate.setMonth(newDate.getMonth() - 1); // Restar un mes
    this.viewDate = newDate;
  }

  // Avanzar un mes
  nextMonth(): void {
    const newDate = new Date(this.viewDate);
    newDate.setMonth(newDate.getMonth() + 1); // Sumar un mes
    this.viewDate = newDate;
  }

  onDayClick(event: { day: any; sourceEvent: MouseEvent | KeyboardEvent }): void {
    const clickedDate = event.day.date.toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
   
    // Filtrar las tareas para la fecha seleccionada (usando 'scheduledDate')
    const tasksForTheDay = this.events.filter(
      (task) => task.start.toISOString().split('T')[0] === clickedDate,
    );
  
    // Abrir el modal con las tareas
    this.dialog.open(TaskCalendarDetailComponent, {
      data: {
        date: clickedDate, // Fecha seleccionada en formato "YYYY-MM-DD"
        tasks: tasksForTheDay, // Pasar directamente las tareas filtradas
      },
    });

    console.log(tasksForTheDay)
  }
  
  


}

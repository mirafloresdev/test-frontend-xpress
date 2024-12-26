import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {enviroment} from "../../../enviroments/enviroment";
import {BehaviorSubject, map, Observable} from "rxjs";
import {ApiResponseEntity} from "../../../shared/model/api_response.entity";
import {TaskEntity} from "../model/task.entity";


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = enviroment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getTasks(userId: number){
    return this.http.get(this.baseUrl + '/task/' + userId).pipe(map(data => data as ApiResponseEntity));
  }

  save(task: TaskEntity){
    return this.http.post(this.baseUrl + '/task', task).pipe(map(data => data as ApiResponseEntity));
  }

  delete(taskId: number){
      return this.http.delete(this.baseUrl + '/task/' + taskId).pipe(map(data => data as ApiResponseEntity));
    }
}

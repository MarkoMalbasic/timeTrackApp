import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class TasksService {

  private URL = 'http://localhost:3000'

  constructor(private httpClient: HttpClient) { }

  getTasks() {
    return this.httpClient.get(this.URL + '/tasks');
  }



  /////////////===MONGODB===////////////

  getTasks1() {
    return this.httpClient.get<any>(this.URL + '/tasks1');
  }

  postTasks(times) {
    return this.httpClient.post(this.URL + '/savetasks', times);
  }

  /////////////===MONGODB===////////////

  getPrivateTasks() {
    return this.httpClient.get<any>(this.URL + '/private');
  }


}

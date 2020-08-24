import { Component, OnInit } from '@angular/core';
import { timer, from } from 'rxjs';
import { AuthService} from '../../services/auth.service';
import { TasksService } from '../../services/tasks.service';
import {formatDate} from '@angular/common';
import { Router } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-private-tasks',
  templateUrl: './private-tasks.component.html',
  styleUrls: ['./private-tasks.component.css']
})
export class PrivateTasksComponent implements OnInit {

  date:Date; 

  times: number = 0;
  display ;
  interval;

  time = [] as any;

 tasks = [] as any;
 user = []as any;

 

 startTime: any = formatDate(new Date(), 'yyyy/MM/dd HH:mm:ss', 'en');
 endTime: any= formatDate(new Date(), 'yyyy/MM/dd HH:mm:ss', 'en');
 elapsedTime: any = formatDate(new Date(), 'HH:mm:ss', 'en'); 

  constructor(
    public authService: AuthService,
    private tasksService: TasksService,
    private router: Router
    ) {

    setInterval(() => {
      this.date = new Date()
    }, 1000)
   }




  ngOnInit(): void {
    
  }


  startTimer() {  
    console.log("=====>");
    this.startTime = new Date();
    this.interval = setInterval(() => {
      if (this.times === 0) {
        console.log(this.startTime);
        this.times++;
      } else {
        this.times++;
      }
      this.display=this.transform( this.times)
    }, 1000);
  }
  transform(value: number) {
       var minutes: number =  Math.floor(value / 60);
       var hours : number = Math.floor(minutes / 60);
       return hours + ':' + minutes;
  }

  pauseTimer() {
    clearInterval(this.interval);

    this.endTime = new Date();
    console.log(this.endTime);

    const requestBody = {
      startTime: this.startTime,
      endTime: this.endTime,
      elapsedTime: this.endTime - this.startTime
  };
    this.tasksService.postTasks(requestBody)
      .subscribe(
        res => {
          this.time = res;
          console.log(this.time);
        },
        err => console.log(err)
      );
  }
}




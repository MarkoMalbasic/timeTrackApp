import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks = [] as any;

  constructor(
    private authService: AuthService,
    private tasksService: TasksService
  ) { }

  ngOnInit(): void {

    this.tasksService.getTasks1()
      .subscribe(
        res => {
          this.tasks = res; 
          console.log(this.tasks);
            
                       
        },
        err => console.log(err)
      );
  }

}

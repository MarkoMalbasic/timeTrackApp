import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user = {} as any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signIn(){
    this.authService.signIn(this.user)
    .subscribe(
      res => {
        console.log(this.user);
        console.log(res)
        localStorage.setItem('token', res.token);
        this.router.navigate(['/private']);
      },
      err => console.log(err)
    )
  }

}

import { Component } from '@angular/core';
import {UsersService} from '../../services/users.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user:any = {
    email: "",
    password: ""
}  

constructor(private usersService: UsersService,
  private router: Router) {}

  login() {
    this.usersService.loginUser(this.user)
    .subscribe({
      next: (res) => {
        localStorage.setItem('token',res.token);
        this.router.navigate(['/dashboard'])
      },
      error: (e) => console.error(e)
     })
  }
}

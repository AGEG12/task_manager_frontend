import { Component } from '@angular/core';
import {UsersService} from '../../services/users.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user:any = {
    username: "",
    email: "",
    password: ""
}
  //mensaje:string = '';

  constructor(private usersService: UsersService,
              private router: Router) {}

  register(): void {
    console.log(this.user);
    this.usersService.registerUser(this.user)
    .subscribe({
      next: (res) => {
        console.log(res.token);
        localStorage.setItem('token',res.token);
        this.router.navigate(['/dashboard'])
      },
      error: (e) => console.error(e)
     })
  }
}

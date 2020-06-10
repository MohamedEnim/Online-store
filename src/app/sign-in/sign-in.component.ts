import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
import { AuthService } from '../auth-servises/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  @ViewChild('formSignIn', {static: false}) formSignIn: NgForm;
  isEnabel: boolean = true;
 

  constructor(private authSErv : AuthService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  
  onSubmit(){
    this.authSErv.authenticateUser(this.formSignIn)
    .subscribe((user: User ) => {

      if(user.isEnabled){
        this.authSErv.setToken(user.username, this.formSignIn.value.password);
        this.isEnabel = true;
        this.authSErv.determineState(user);
       this.router.navigate(['/home'], {relativeTo: this.route});  
      }
     
    },(err: any)=>{
      this.isEnabel = false;
     });
     
  }
 
   


}

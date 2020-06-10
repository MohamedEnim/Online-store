import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth-servises/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('formRegister', {static: false}) formRegister: NgForm;

  constructor(private authSErv : AuthService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onSubmit(){
    this.authSErv.saveUser(this.formRegister).subscribe((resp:any)=>{
      this.authSErv.setToken(resp.username, this.formRegister.value.password);
      this.authSErv.determineState(resp);
      this.router.navigate(['/home'], {relativeTo: this.route});
    });                      
  }

}

import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../model/user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAdmin: boolean = false;
  isLogin: boolean = false;
  userId: number = null;
  isLoginisAdmin: Subject< {isLogin: boolean, isAdmin: boolean}> = new Subject<{isLogin: boolean, isAdmin: boolean}>();
  userIdUserNameSubject: BehaviorSubject<{userId: number, userName: string}> = new  BehaviorSubject<{userId: number, userName: string}>(null);
  

  constructor(private http: HttpClient) { }

  authenticateUser(signIn: NgForm){
    let username: string = signIn.value.username;
    let password: string = signIn.value.password;
    const reqHeaders = new HttpHeaders()
    .set('Authorization',  `Basic ${btoa(username + ':' + password)}`);
    return this.http.get<any>("http://localhost:8080/authenticate/" + username ,{
      headers: reqHeaders
    }).pipe(map((resp: any)=>{
      let permissions: string[] = [];
      let name: string;
      let role: string;
        for(let authority of resp.authorities) { 
          name = authority.authority;
          if(name.startsWith("ROLE")){
            role = name;
          }else{
            permissions.push(name);
          }
        }
      const user = new User(resp.username, resp.password, resp.fname, resp.lname, resp.email , resp.enabled, role, permissions);
        user.userId = resp.userId;
        return user;
    }));
  }

  saveUser(formRegister: NgForm){
    const user: User = this.registerUser(formRegister);
    return this.http.post("http://localhost:8080/authenticate/register", user);
  }

  private registerUser(formRegister: NgForm){
    let permissions: string[] = [];
    let role: string;
    role = "CUSTOMER";
    permissions.push("my_order");
   const user = new User(formRegister.value.lusername,
                          formRegister.value.lpassword, 
                          formRegister.value.fname,
                          formRegister.value.lname,
                          formRegister.value.email,
                          true,
                          role,
                          permissions
                         );
    return user;
  }

  determineState(user: User){
    let stateUser: {isLogin: boolean, isAdmin: boolean} = {isLogin: false, isAdmin: false};
       stateUser.isLogin = true;
       this.isLogin = true;
       this.userId = user.userId;
       let userIdUserName = {
         userId: user.userId,
         userName: user.username
       }
       this.userIdUserNameSubject.next(userIdUserName);
       if(user.role.includes('ROLE_ADMIN')){
        stateUser.isAdmin = true;
        this.isAdmin = true;
       }else{
        stateUser.isAdmin = false;
        this.isAdmin = false;
       }
      this.isLoginisAdmin.next(stateUser);
  }

  setToken(username: string, password: string){
    localStorage.setItem('User_Key',  `Basic ${btoa(username + ':' + password)}`);
  }

  getToken(){
    return localStorage.getItem('User_Key');
  }

  deleteToken(){
    localStorage.removeItem('User_Key');
  }

  getIsAdmin(){
    return this.isAdmin;
  }

  getIsLogin(){
    return this.isLogin;
  }
}

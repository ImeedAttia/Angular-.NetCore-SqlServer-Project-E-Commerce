import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin:boolean | undefined;
  constructor(private router:Router,private http:HttpClient) { }

  login(form: NgForm) {
    const credentials = {
      'UserLogin':form.value.username,
      'userPassword':form.value.password
       
    };
    this.http.post("http://localhost:24543/api/auth/login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).Token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.router.navigate(["Home"]);
      
    }, err => {
      this.invalidLogin = true;
    });
  }


  ngOnInit(): void {
  }

}

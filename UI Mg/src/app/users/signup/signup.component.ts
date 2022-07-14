import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/Service/article.service';
import { UsersService } from 'src/app/Service/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  invalidregister:boolean | undefined;
  constructor(private as:UsersService,private http:HttpClient,private router : Router) { }

  ngOnInit(): void {
  }




  ajouter(f : NgForm){
    let name = f.value['Name'];
    let Last = f.value['Last'];
    let Password = f.value['Password'];
    let Confirm = f.value['Confirm'];
    let Email = f.value['Email'];
    let Username=f.value['Username'];
    let phone = f.value['phone'];
    let country = f.value['country'];
   
   if(Password == Confirm && Password !== "" && Password.length >8 ){
    var val = {
        UserName: name,
        UserLName:Last,
        UserCountry:country,
        UserNumber: phone,
        UsrEmail: Email,
        UserLogin: Username,
        UserPassword: Password,
        UserRole: "user",
        UserPhotoName: "annonyms.jpg"
    }
    this.as.AddUser(val).subscribe(res=>{
      this.router.navigateByUrl('/Home');
    });

    const credentials = {
      'UserLogin':Username,
      'userPassword':Password
       
    };
    this.http.post("http://localhost:24543/api/auth/login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).Token;
      localStorage.setItem("jwt", token);
      this.invalidregister = false;
      this.router.navigate(["Home"]);
      
    }, err => {
      this.invalidregister = true;
    });



   }
   
   else {
    this.invalidregister = true;
   }
   
  }

}

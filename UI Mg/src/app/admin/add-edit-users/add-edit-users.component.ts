import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/Service/article.service';
import { UsersService } from 'src/app/Service/users.service';

@Component({
  selector: 'app-add-edit-users',
  templateUrl: './add-edit-users.component.html',
  styleUrls: ['./add-edit-users.component.css']
})
export class AddEditUsersComponent implements OnInit {

 
  
  constructor(private service:UsersService,private router : Router) { }
  @Input()art:any;


  UserId:string="";
  UserName:string="";
  UserLName:string="";
  UserCountry:string="";
  UserNumber:string="";
  UsrEmail:string="";
  UserLogin:string="";
  UserPassword:string="";
  UserRole:string="";
  ngOnInit(): void {
    this.UserId=this.art.UserId;
    this.UserName=this.art.UserName;
    this.UserLName=this.art.UserLName;
    this.UserCountry=this.art.UserCountry; 
    this.UserNumber = this.art.UserNumber;
    this.UsrEmail=this.art.UsrEmail; 
    this.UserLogin=this.art.UserLogin;
    this.UserPassword=this.art.UserPassword;
    this.UserRole=this.art.UserRole;
  }

  addArt(){
    var val = {
      UserId:this.UserId,
      UserName:this.UserName,
      UserLName:this.UserLName,
      UserCountry:this.UserCountry,
      UserNumber : this.UserNumber,
      UsrEmail:this.UsrEmail, 
      UserLogin:this.UserLogin,
      UserPassword:this.UserPassword,
      UserRole:this.UserRole
    };
    this.service.AddUser(val).subscribe(res=>{
      alert(res.toString());
    });
  }
  EditArt(){
    var val = {
      UserId:this.UserId,
      UserName:this.UserName,
      UserLName:this.UserLName,
      UserCountry:this.UserCountry,
      UserNumber : this.UserNumber,
      UsrEmail:this.UsrEmail, 
      UserLogin:this.UserLogin,
      UserPassword:this.UserPassword,
      UserRole:this.UserRole
    };
    this.service.UpdateUser(val).subscribe(res=>{
      alert(res.toString());
      this.router.navigate(["Admin"]);
    });
  }


}

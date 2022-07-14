import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/Service/article.service';
import { CommandeService } from 'src/app/Service/commande.service';
import { UsersService } from 'src/app/Service/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any=[];
  Commande:any=[];
  validity : string = "";
  constructor(private service:UsersService,private servicecomm : CommandeService) { }

  ngOnInit(): void {
    
    this.refreshProfile();
   
  }
  refreshProfile(){
    let token = localStorage.getItem('jwt') as string;
   let id = JSON.parse(window.atob(token.split('.')[1]))["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    this.service.getuserFID(id).subscribe(data=>{
      this.user=data;
    });
    
    this.servicecomm.getCommFID(id).subscribe(data=>{
      this.Commande=data;
    });
    
  }
  
  
  testValidation(stock:string){
    if(stock =="valid" ){
      this.validity = "Accepted";
     return "success";
    }else if(stock == "not"){
     this.validity = "Refused"
      return "danger"
    }else{
      this.validity = "Wairing"
      return "primary"
    }
  }



}

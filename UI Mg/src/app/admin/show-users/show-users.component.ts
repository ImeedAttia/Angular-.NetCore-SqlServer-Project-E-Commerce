import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/Service/article.service';
import { UsersService } from 'src/app/Service/users.service';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {
  constructor(private service:UsersService) { }
  ModalTitle:string="";
  ActivateAddEditEmpComp:boolean=false;
  usr:any;
 UserList:any=[];


UserIdFilter:string="";
UserNameFilter:string="";
UserListWithoutFilter:any=[];


  ngOnInit(): void {
    this.refreshList();
  }


  addClick(){
  this.usr={
    UserId:0,
    UserName:"",
    UserLName:"",
    UserCountry:"",
    UserNumber:0,
    UsrEmail:"",
    UserLogin:"",
    UserPassword:"",
    UserRole:""
  }
  this.ModalTitle="add User";
  this.ActivateAddEditEmpComp=true;
}
closeClick(){
  this.ActivateAddEditEmpComp=false;
  this.refreshList();
}
EditClick(item: any){
this.usr=item;
this.ModalTitle="Edit User";
this.ActivateAddEditEmpComp=true;

}
DeleteClick(item:any){
if(confirm("are u sure ??")){
  this.service.DeleteUsr(item.UserId).subscribe(data=>{
    alert(data.toString())
    this.refreshList();
  })
}
}
  refreshList(){
    this.service.getUsrList().subscribe(data=>{
      this.UserList=data;
      this.UserListWithoutFilter=data;
    });
  }


  FilterFn(){
    var UserIdFilter = this.UserIdFilter;
    var UserNameFilter = this.UserNameFilter;

    this.UserList = this.UserListWithoutFilter.filter(function(el:any){
      return el.UserId.toString().toLowerCase().includes(
        UserIdFilter.toString().trim().toLowerCase()
      )&&
      el.UserName.toString().toLowerCase().includes(
        UserNameFilter.toString().trim().toLowerCase()
      
      )
    });
  }
  sortResult(prop:any,asc:any){
    this.UserList = this.UserListWithoutFilter.sort(function(a:any,b:any){
      if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }


}

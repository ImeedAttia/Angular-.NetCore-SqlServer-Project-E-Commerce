import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  readonly APIUrl = "http://localhost:24543/api";
  constructor(private http: HttpClient) { }




  getuserFID(id:any){
    return this.http.get<any>(this.APIUrl+'/users/'+id);
  }
  AddUser(val:any){
    return this.http.post(this.APIUrl+'/users',val);
    }
    getUsrList():Observable<any[]>
  {
    return this.http.get<any>(this.APIUrl+'/users');
  }
  
    DeleteUsr(id:any){
      return this.http.delete(this.APIUrl+'/users/'+id);
      }
      UpdateUser(val:any){
        return this.http.put(this.APIUrl+'/users',val);
        }
  
}

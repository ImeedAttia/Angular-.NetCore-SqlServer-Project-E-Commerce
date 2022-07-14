import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  readonly APIUrl = "http://localhost:24543/api";
  readonly PhotoUrl="http://localhost:24543/Photos/Article/";
  constructor(private http: HttpClient) { }
  cartTotale = 0;
  
  getcomList():Observable<any[]>
  {
    return this.http.get<any>(this.APIUrl+'/Commande');
  }

  UpdateComm(val:any){
    return this.http.put(this.APIUrl+'/Commande',val);
    }


    getCommFID(id:any){

      return this.http.get<any>(this.APIUrl+'/Commande/'+id);
    }
    CommandePost(val:any){
      return this.http.post(this.APIUrl+'/Commande',val);
      }


  counter(){
    
    let cartItems=localStorage.getItem('idCart') as string;
  if(cartItems !== "undefined"){

    return [...new Set(cartItems.split(','))].length-1;
  }else{
    return 0;
  }
  }

IteamList(){
  return localStorage.getItem('idCart') as string;
  
}
  refresh(){
    this.counter();
    this.IteamList();
  }


}

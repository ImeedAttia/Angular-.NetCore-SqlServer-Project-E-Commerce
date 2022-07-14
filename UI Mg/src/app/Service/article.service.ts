import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  readonly APIUrl = "http://localhost:24543/api";
  readonly PhotoUrl="http://localhost:24543/Photos/Article/";
  constructor(private http: HttpClient) { }




//ArticleEnCour
getArtList():Observable<any[]>
{
  return this.http.get<any>(this.APIUrl+'/article');
}
AddArt(val:any){
return this.http.post(this.APIUrl+'/article',val);
}
UpdateArt(val:any){
return this.http.put(this.APIUrl+'/article',val);
}
DeleteArt(id:any){
return this.http.delete(this.APIUrl+'/article/'+id);
}
uploadPhoto(val:any){
  return this.http.post(this.APIUrl+'/article/saveFile',val);
}
getArtFID(id:any){
  return this.http.get<any>(this.APIUrl+'/article/'+id);
}




  
}

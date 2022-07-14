import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/Service/article.service';
import { CommandeService } from 'src/app/Service/commande.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {

 
  constructor(public cs : CommandeService,public as : ArticleService,private router : Router) { }
Article:any=[];
ArticleList:any=[];
empty!:string;
totale:number=0;
valid=false;
  ngOnInit(): void {
    this.list();
   
  }
list(){
  this.Article = []
  this.ArticleList=[]
  this.totale = 0;
  this.Article=[...new Set(this.cs.IteamList().split(','))];
 if(this.Article.length == 1){
  this.Article = []
  this.ArticleList=[]
 }else if(this.Article.length > 1){
  
  for (let index = 1; index < this.Article.length; index++) {
    this.as.getArtFID(this.Article[index]).subscribe(data=>{
      this.ArticleList = this.ArticleList.concat(data);
      this.totale +=data[0].ArticlePrix ;
    });
  }
 
}

}
Cancel(){
  localStorage.setItem('idCart',this.empty);
  this.cs.refresh();
  this.router.navigate(["Produit"])

}
remove(id:string,prix:number){
  this.totale -= prix;
  this.Article.forEach((element: string,index: any)=>{
    if(element==id.toString()) this.Article.splice(index,1);
    
 });
 localStorage.setItem('idCart',this.Article);
 this.list();
}

checkout(){
  let token = localStorage.getItem('jwt') as string;
  let id = JSON.parse(window.atob(token.split('.')[1]))["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  let tot:string = "";
  for (let index = 1; index < this.Article.length; index++) {
     tot += this.Article[index]+",";
  }
  
 var  val = {
    UserId: id,
    ArticleIds:tot,
    valid:'Waiting'}
    this.cs.CommandePost(val).subscribe(res=>{
     
    
});
this.minusdata();
alert("Vous avez Passer une COmmande Avec succes avec un totale de Prix : " + this.totale + "DT .");
this.Cancel();
}


minusdata(){
  for (let index = 1; index < this.Article.length; index++) {
  console.log(this.Article[index]);
    this.as.getArtFID(this.Article[index]).subscribe(data=>{
      var stock =data[0].ArticleStock - 1;
      var val = {
        ArticleId:data[0].ArticleId,
       ArticleName:data[0].ArticleName,
       ArticlePrix:data[0].ArticlePrix ,
       ArticleDesc:data[0].ArticleDesc,
       ArticleStock:stock,
      ArticlePhotoName:data[0].ArticlePhotoName
      };
      this.as.UpdateArt(val).subscribe(res=>{
        alert(res.toString());
      });
    });

   

  
 

}}

}

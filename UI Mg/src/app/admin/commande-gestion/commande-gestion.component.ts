import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/Service/article.service';
import { CommandeService } from 'src/app/Service/commande.service';

@Component({
  selector: 'app-commande-gestion',
  templateUrl: './commande-gestion.component.html',
  styleUrls: ['./commande-gestion.component.css']
})
export class CommandeGestionComponent implements OnInit {
  Article: string[] | undefined;
  Names: any;
  constructor(private service:CommandeService,private as : ArticleService) { }
  usr:any;
  CommList:any=[];
 

  validity : string = "";


  ngOnInit(): void {
    this.refreshList();
    
  }

  testValidation(validity:string){
    if(validity === "valid" ){
      this.validity = "Accepted";
     return "success";
    }else if(validity === "not"){
     this.validity = "Refused"
      return "danger"
    }else if(validity === "Waiting"){
     
      this.validity = "Waiting"
      return "primary"
    }else{
    
      return "";
    }
  }


  refreshList(){

    
    this.service.getcomList().subscribe(data=>{
      this.CommList=data;

    });
  }

valid(CommandeId: any,valid: any){
  var val = {
    CommandeId:CommandeId,
    valid:valid
  };
this.service.UpdateComm(val).subscribe(res=>{
});

this.refreshList();
}


fetch(liste : string){
  this.Article=[...new Set(liste.split(','))];
  for (let index = 1; index < this.Article.length; index++) {
    this.as.getArtFID(this.Article[index]).subscribe(data=>{
      this.Names = data.ArticleName;
    });
  }
  console.log(this.Names)
  return this.Names;
}


}

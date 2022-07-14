import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/Service/article.service';
import { CommandeService } from 'src/app/Service/commande.service';

@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.css']
})
export class DetailsProduitComponent implements OnInit {

  id!:number;
  p:any=[];
  ids:any=[];
  valid=false;
    constructor(public ar: ActivatedRoute,private router: Router,public as:ArticleService,private cart : CommandeService) {
     // pour recuprer l'id du article
      this.ar.params.subscribe(
        data => {this.id = data.id;}
      );
     }
  
    ngOnInit(): void {
      this.refresh();
    }



  refresh(){
      this.as.getArtFID(this.id).subscribe(data=>{
        this.p=data;
      });
  }
  addCart(id:string , stock : number){
  if(stock > 0){
        let last =localStorage.getItem('idCart') as string;
        this.ids= last.split(',');
      if(this.ids.length === 0&& typeof this.ids === 'undefined'){
          this.ids=[id];
      localStorage.setItem('idCart',this.ids);
      }else{
          this.ids.push(id.toString());
          localStorage.setItem('idCart',this.ids);
      }
      this.valid = false;
  }else{
    this.valid =true;
  }
   
  
  }

}

import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/Service/article.service';

@Component({
  selector: 'app-list-produit',
  templateUrl: './list-produit.component.html',
  styleUrls: ['./list-produit.component.css']
})
export class ListProduitComponent implements OnInit {

  ArticleList:any=[];
  available : string = "";

ArticleIdFilter:string="";
ArticleNameFilter:string="";
ArticleListWithoutFilter:any=[];

  constructor(public service:ArticleService) { }



  ngOnInit(): void {
    this.refreshList();    
  }


  refreshList(){
    this.service.getArtList().subscribe(data=>{
      this.ArticleList=data;
      this.ArticleListWithoutFilter = data;   
    }); 
  }


  FilterFn(){
    var ArticleNameFilter = this.ArticleNameFilter;
    this.ArticleList = this.ArticleListWithoutFilter.filter(function(el:any){
      return el.ArticleName.toString().toLowerCase().includes(
        ArticleNameFilter.toString().trim().toLowerCase()
        )});
  }

  teststock(stock:number){
    if(stock > 0 ){
      this.available = "In Stock";
      return "success";
    }else{
      this.available = "Out of Stock"
      return "secondary"
    }

  }

}

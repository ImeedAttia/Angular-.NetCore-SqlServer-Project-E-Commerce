import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/Service/article.service';

@Component({
  selector: 'app-show-article',
  templateUrl: './show-article.component.html',
  styleUrls: ['./show-article.component.css']
})
export class ShowArticleComponent implements OnInit {
  constructor(private service:ArticleService) { }
  ModalTitle:string="";
  ActivateAddEditEmpComp:boolean=false;
  art:any;
 ArticleList:any=[];


ArticleIdFilter:string="";
ArticleNameFilter:string="";
ArticleListWithoutFilter:any=[];


  ngOnInit(): void {
    this.refreshList();
  }


  addClick(){
  this.art={
    ArticleId:0,
    ArticleName:"",
    ArticlePrix:0,
    ArticleDesc:"",
    ArticleStock:0,
    ArticlePhotoName:"annonyms.jpg"
  }
  this.ModalTitle="add Article";
  this.ActivateAddEditEmpComp=true;
}
closeClick(){
  this.ActivateAddEditEmpComp=false;
  this.refreshList();
}
EditClick(item: any){
this.art=item;
this.ModalTitle="Edit Article";
this.ActivateAddEditEmpComp=true;
}
DeleteClick(item:any){
if(confirm("are u sure ??")){
  this.service.DeleteArt(item.ArticleId).subscribe(data=>{
    alert(data.toString())
    this.refreshList();
  })
}
}
  refreshList(){
    this.service.getArtList().subscribe(data=>{
      this.ArticleList=data;
      this.ArticleListWithoutFilter=data;
    });
  }


  FilterFn(){
    var ArticleIdFilter = this.ArticleIdFilter;
    var ArticleNameFilter = this.ArticleNameFilter;

    this.ArticleList = this.ArticleListWithoutFilter.filter(function(el:any){
      return el.ArticleId.toString().toLowerCase().includes(
        ArticleIdFilter.toString().trim().toLowerCase()
      )&&
      el.ArticleName.toString().toLowerCase().includes(
        ArticleNameFilter.toString().trim().toLowerCase()
      
      )
    });
  }
  sortResult(prop:any,asc:any){
    this.ArticleList = this.ArticleListWithoutFilter.sort(function(a:any,b:any){
      if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }


}

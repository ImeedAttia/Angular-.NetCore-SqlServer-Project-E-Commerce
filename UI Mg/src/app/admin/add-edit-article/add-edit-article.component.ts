import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/Service/article.service';

@Component({
  selector: 'app-add-edit-article',
  templateUrl: './add-edit-article.component.html',
  styleUrls: ['./add-edit-article.component.css']
})
export class AddEditArticleComponent implements OnInit {

  
  constructor(private service:ArticleService,private router : Router) { }
  @Input()art:any;


    ArticleId:string="";
    ArticleName:string="";
    ArticlePrix:string="";
    ArticleDesc:string="";
    ArticleStock:string="";
    ArticlePhotoName:string="";
    ArticlePhotoPath:string="";
  ngOnInit(): void {
    this.ArticleId=this.art.ArticleId;
    this.ArticleName=this.art.ArticleName;
    this.ArticlePrix=this.art.ArticlePrix;
    this.ArticleDesc=this.art.ArticleDesc; 
    this.ArticleStock = this.art.ArticleStock;
    this.ArticlePhotoName=this.art.ArticlePhotoName; 
    this.ArticlePhotoPath=this.service.PhotoUrl+this.ArticlePhotoName; 
  }

  addArt(){
    var val = {
      ArticleId:this.ArticleId,
     ArticleName:this.ArticleName,
     ArticlePrix:this.ArticlePrix,
     ArticleDesc:this.ArticleDesc,
     ArticleStock: this.ArticleStock,
    ArticlePhotoName:this.ArticlePhotoName
    };
    this.service.AddArt(val).subscribe(res=>{
    });
  }
  EditArt(){
    var val = {
        ArticleId:this.ArticleId,
       ArticleName:this.ArticleName,
       ArticlePrix:this.ArticlePrix,
       ArticleDesc:this.ArticleDesc,
       ArticleStock:this.ArticleStock,
      ArticlePhotoName:this.ArticlePhotoName
    };
    this.service.UpdateArt(val).subscribe(res=>{
      alert(res.toString());
      this.router.navigate(["Admin"]);
    });
  }
  uploadPhoto(event:any){
  var file=event.target.files[0];
  const formData:FormData=new FormData();
  formData.append('uploadedFile',file,file.name);
  this.service.uploadPhoto(formData).subscribe((data:any)=>{
    this.ArticlePhotoName = data.toString();
    this.ArticlePhotoPath=this.service.PhotoUrl+this.ArticlePhotoName;
  });

}

}

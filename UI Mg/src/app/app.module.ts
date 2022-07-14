import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';
import { ListProduitComponent } from './Article/list-produit/list-produit.component';
import { DetailsProduitComponent } from './Article/details-produit/details-produit.component';
import { CommandeComponent } from './Article/commande/commande.component';
import { LoginComponent } from './users/login/login.component';
import { ProfileComponent } from './users/profile/profile.component';
import { SignupComponent } from './users/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ShowArticleComponent } from './admin/show-article/show-article.component';
import { AddEditArticleComponent } from './admin/add-edit-article/add-edit-article.component';
import { ArticleService } from './Service/article.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AddEditUsersComponent } from './admin/add-edit-users/add-edit-users.component';
import { ShowUsersComponent } from './admin/show-users/show-users.component';
import { CommandeGestionComponent } from './admin/commande-gestion/commande-gestion.component';




export function tokenGetter(){
  return localStorage.getItem("jwt");
}



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ShowArticleComponent,
    AddEditArticleComponent,
    ListProduitComponent,
    DetailsProduitComponent,
    CommandeComponent,
    LoginComponent,
    ProfileComponent,
    SignupComponent,
    HomeComponent,
    ShowUsersComponent,
    AddEditUsersComponent,
    CommandeGestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:tokenGetter
        ,allowedDomains:["localhost:24543"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }

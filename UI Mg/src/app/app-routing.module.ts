import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CommandeComponent } from './Article/commande/commande.component';
import { DetailsProduitComponent } from './Article/details-produit/details-produit.component';
import { ListProduitComponent } from './Article/list-produit/list-produit.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './users/login/login.component';
import { ProfileComponent } from './users/profile/profile.component';
import { SignupComponent } from './users/signup/signup.component';

const routes: Routes = [
  {path : "Produit" , component : ListProduitComponent},
  {path : "Home" , component : HomeComponent},
  {path : "" , component : HomeComponent},
  {path : "DetailsProduit/:id" , component : DetailsProduitComponent,canActivate:[AuthGuard],data: {
    role: ['admin', 'user']
  } },
  {path : "Profile" , component : ProfileComponent,canActivate:[AuthGuard],data: {
    role: ['admin', 'user']
  }},
  {path: "Admin" , component : AdminComponent,canActivate:[AuthGuard],data: {
    role: 'admin'
  } },
  {path: "Login" , component : LoginComponent},
  {path: "Commande" , component : CommandeComponent,canActivate:[AuthGuard],data: {
    role: ['admin', 'user']
  } },
  {path: "signup" , component : SignupComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

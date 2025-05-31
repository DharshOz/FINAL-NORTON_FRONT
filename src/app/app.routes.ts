import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import {ContactComponent} from './contact/contact.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import {CarrerComponent}  from './carrer/carrer.component';
import { ProductsfetchComponent } from './productsfetch/productsfetch.component';
import {ViewproductComponent} from './viewproduct/viewproduct.component'
export const routes: Routes = [
  { path: '', component: HomeComponent },
  
  { path: 'viewproduct/:id', component: ViewproductComponent },
  { path: 'Aboutus', component: AboutusComponent },
  { path: 'user-detail/:id', component: UserDetailComponent } ,
  
  { path: 'carrer', component: CarrerComponent },
  { path: 'products', component: ProductsfetchComponent },
  {path :'Contactus',component : ContactComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

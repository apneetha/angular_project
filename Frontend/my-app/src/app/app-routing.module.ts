import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsComponent } from './bookings/bookings.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path : '' , redirectTo:'/search', pathMatch:'full'},
  {path : 'search' , component: HomeComponent},
  {path: 'bookings', component:BookingsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

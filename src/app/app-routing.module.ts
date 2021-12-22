import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';

const routes: Routes = [
  { path: '', component:  HomeComponent},
  { path: ':command', component:  HomeComponent},
  { path: ':command/:value', component:  HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

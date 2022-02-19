import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutingComponent } from './components/routing/routing.component';

const routes: Routes = [
  { path: '', component:  RoutingComponent},
  { path: ':command', component:  RoutingComponent},
  { path: ':command/:value', component:  RoutingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

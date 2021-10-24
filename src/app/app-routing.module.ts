import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateNewEtlComponent } from './body/create-new-etl/create-new-etl.component';
import { EtlDetailComponent } from './body/etl-detail/etl-detail.component';
import { EtlListComponent } from './body/etl-list/etl-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'etl-list', pathMatch: 'full'},
  {path: 'etl-list', component: EtlListComponent},
  {path: 'etl-detail/:id', component: EtlDetailComponent},
  {path: 'create-new-etl', component: CreateNewEtlComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

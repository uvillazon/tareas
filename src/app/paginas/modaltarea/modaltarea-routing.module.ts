import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModaltareaPage } from './modaltarea.page';

const routes: Routes = [
  {
    path: '',
    component: ModaltareaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModaltareaPageRoutingModule {}

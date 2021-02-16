import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModaltareaPageRoutingModule } from './modaltarea-routing.module';

import { ModaltareaPage } from './modaltarea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModaltareaPageRoutingModule
  ],
  declarations: [ModaltareaPage]
})
export class ModaltareaPageModule {}

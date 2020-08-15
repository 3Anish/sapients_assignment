import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';



const Modules=[
  ButtonModule,
  CardModule
 
 
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Modules
   
  ],
  exports:[Modules]
})
export class MaterialModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelComponent } from './label.component';
import { GetArrayValuePipe } from 'src/Pipe/GetArrayValue.pipe';
import { GetSumValuePipe } from 'src/Pipe/GetSumValue.pipe';
import { RightbuttonDirective } from 'src/app/Directives/rightbutton.directive';
import { SafePipe } from 'src/Pipe/SafePipe.pipe';
import { TwoDecimalPoint } from 'src/app/Directives/two-decimal.directive';
import { FiveDecimalPoint } from 'src/app/Directives/five-decimal.directive';

@NgModule({
  declarations: [LabelComponent, GetArrayValuePipe, GetSumValuePipe, RightbuttonDirective, SafePipe, TwoDecimalPoint, FiveDecimalPoint],
  imports: [
    CommonModule
  ],
  exports: [LabelComponent, GetArrayValuePipe, GetSumValuePipe, RightbuttonDirective, SafePipe, TwoDecimalPoint, FiveDecimalPoint]
})
export class LabelModule { }

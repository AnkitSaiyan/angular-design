import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from './error.component';
import { DfmPipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [ErrorComponent],
  imports: [CommonModule, FormsModule, DfmPipesModule],
  exports: [ErrorComponent],
})
export class NgDfmErrorModule {}

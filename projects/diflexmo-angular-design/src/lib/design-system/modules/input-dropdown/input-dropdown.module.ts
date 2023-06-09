import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputDropdownComponent } from './input-dropdown.component';
import { DfmErrorModule } from '../error/error.module';
import { DfmDirectivesModule } from '../../directives/directives.module';
import { DfmPipesModule } from '../../pipes/pipes.module';
import { DfmIconModule } from '../icon/icon.module';
import { DfmInputModule } from '../input/input.module';
import { DfmTagModule } from '../tag/tag.module';

@NgModule({
  declarations: [InputDropdownComponent],
  imports: [CommonModule, FormsModule, DfmIconModule, DfmInputModule, DfmTagModule, DfmErrorModule, DfmDirectivesModule, DfmPipesModule],
  exports: [InputDropdownComponent],
})
export class DfmInputDropdownModule {}

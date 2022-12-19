import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardComponent } from './clipboard.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [ClipboardComponent],
  imports: [CommonModule, IconModule, TranslateModule.forChild()],
  exports: [ClipboardComponent],
})
export class ClipboardModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardModule } from 'ngx-clipboard';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardComponent } from './clipboard.component';
import { NgDfmIconModule } from '../icon/icon.module';

@NgModule({
  declarations: [ClipboardComponent],
  imports: [CommonModule, NgDfmIconModule, TranslateModule.forChild(), ClipboardModule, NgbTooltipModule],
  exports: [ClipboardComponent],
})
export class NgDfmClipboardModule {}

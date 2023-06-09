import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardModule } from 'ngx-clipboard';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardComponent } from './clipboard.component';
import { DfmIconModule } from '../icon/icon.module';

@NgModule({
  declarations: [ClipboardComponent],
  imports: [CommonModule, DfmIconModule, TranslateModule.forChild(), ClipboardModule, NgbTooltipModule],
  exports: [ClipboardComponent],
})
export class DfmClipboardModule {}

import { Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';

@Directive({
  selector: '[dfmDomChange]',
})
export class DomChangeDirective implements OnDestroy {
  private changes: MutationObserver;

  @Output()
  public dfmDomChange = new EventEmitter();

  constructor(private elementRef: ElementRef) {
    const element = this.elementRef.nativeElement;
    this.changes = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach((mutation: MutationRecord) => this.dfmDomChange.emit(mutation));
    });

    this.changes.observe(element, {
      attributes: true,
      childList: true,
      characterData: true,
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}

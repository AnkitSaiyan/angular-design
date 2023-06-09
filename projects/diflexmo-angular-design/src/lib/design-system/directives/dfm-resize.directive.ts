import { Directive, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[dfmResize]',
})
export class DfmResizeDirective implements OnInit, OnDestroy {
  @Output() public readonly resized = new EventEmitter();

  private observer: ResizeObserver;

  public constructor(private readonly element: ElementRef, private readonly zone: NgZone) {
    this.observer = new ResizeObserver(() => this.zone.run(() => this.observe()));
  }

  public ngOnInit(): void {
    this.observer.observe(this.element.nativeElement);
  }

  public ngOnDestroy(): void {
    this.observer.disconnect();
  }

  private observe(): void {
    this.resized.emit();
  }
}

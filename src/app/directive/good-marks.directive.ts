import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appGoodMarks]',
})
export class GoodMarksDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const value = Number(this.el.nativeElement.value);
    if (value > 80) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', 'green');
    }
  }
}

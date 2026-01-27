import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appUppercase]',
})
export class UppercaseDirective {
  private el: ElementRef<HTMLInputElement> = inject(ElementRef<HTMLInputElement>);

  constructor() {
    this.el.nativeElement.style.textTransform = 'uppercase';
  }
}

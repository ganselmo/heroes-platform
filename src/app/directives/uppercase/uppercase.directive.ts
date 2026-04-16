import { Directive, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercase]',
  host: {
    '[style.text-transform]': '"uppercase"',
    '(input)': 'toUpperCase($event)',
  },
})
export class UppercaseDirective {
  private ngControl = inject(NgControl);

  protected toUpperCase(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.ngControl.control!.setValue(input.value.toUpperCase());
  }
}

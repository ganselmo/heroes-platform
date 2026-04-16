import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UppercaseDirective } from './uppercase.directive';

@Component({
  template: `<input appUppercase [formControl]="control" />`,
  imports: [ReactiveFormsModule, UppercaseDirective],
})
class TestHostComponent {
  control = new FormControl('');
}

describe('UppercaseDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    input = fixture.nativeElement.querySelector('input');
  });

  describe('FormControl value transformation', () => {
    it('should create the directive', () => {
      expect(input).toBeTruthy();
    });

    it('should transform the FormControl value to uppercase on input', () => {
      input.value = 'batman';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.control.value).toBe('BATMAN');
    });

    it('should handle empty input', () => {
      input.value = '';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.control.value).toBe('');
    });

    it('should update the native input element value to uppercase', () => {
      input.value = 'wonder woman';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(input.value).toBe('WONDER WOMAN');
    });

    it('should handle special characters and numbers without errors', () => {
      input.value = 'hero-123!';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.control.value).toBe('HERO-123!');
    });
  });

  describe('Visual styling', () => {
    it('should apply text-transform style', () => {
      expect(input.style.textTransform).toBe('uppercase');
    });

    it('should display uppercase visually even when value is set programmatically', () => {
      component.control.setValue('batman');
      fixture.detectChanges();

      expect(input.style.textTransform).toBe('uppercase');
    });
  });
});

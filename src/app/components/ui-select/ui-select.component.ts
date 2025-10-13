import { Component, Input, forwardRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiSelectComponent),
      multi: true,
    },
  ],
  templateUrl: './ui-select.component.html',
  styleUrls: ['./ui-select.component.scss'],
})
export class UiSelectComponent implements ControlValueAccessor {
  @Input() options: { value: string; label: string; disabled?: boolean }[] = [];
  @Input() placeholder = 'Selecione';
  @Input() disabled = false;

  value?: string;
  open = false;
  focusedIndex = -1; // 👈 para navegação via teclado

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(v: string | undefined): void {
    this.value = v;
  }
  registerOnChange(fn: any) { this.onChange = fn; }
  registerOnTouched(fn: any) { this.onTouched = fn; }
  setDisabledState(dis: boolean) { this.disabled = dis; }

  toggle() {
    if (!this.disabled) {
      this.open = !this.open;
      if (this.open) {
        // inicializa índice focado no primeiro item ativo
        this.focusedIndex = this.options.findIndex(o => !o.disabled);
      }
      this.onTouched();
    }
  }

  select(opt: any) {
    if (opt.disabled) return;
    this.value = opt.value;
    this.onChange(this.value);
    this.open = false;
  }

  get selectedLabel(): string {
    return this.options.find((o) => o.value === this.value)?.label || this.placeholder;
  }

  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (this.disabled) return;

    if (!this.open && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.toggle();
      return;
    }

    if (this.open) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        this.moveFocus(1);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        this.moveFocus(-1);
      } else if (event.key === 'Enter') {
        event.preventDefault();
        if (this.focusedIndex >= 0) this.select(this.options[this.focusedIndex]);
      } else if (event.key === 'Escape') {
        this.open = false;
      }
    }
  }

  private moveFocus(delta: number) {
    let next = this.focusedIndex + delta;
    while (next >= 0 && next < this.options.length && this.options[next].disabled) {
      next += delta; 
    }
    if (next >= 0 && next < this.options.length) {
      this.focusedIndex = next;
    }
  }
}

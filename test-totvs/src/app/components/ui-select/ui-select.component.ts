import { Component, Input, forwardRef } from '@angular/core';
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

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(v: string | undefined): void {
    this.value = v;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(dis: boolean) {
    this.disabled = dis;
  }

  toggle() {
    if (!this.disabled) {
      this.open = !this.open;
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
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiSelectComponent } from './components/ui-select/ui-select.component';
import { UiSwitchComponent } from './components/ui-switch/ui-switch.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, UiSelectComponent, UiSwitchComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class AppComponent {
  selected: string | null = null;
  placeholder = 'Selecione';
  selectDisabled = false;
  switchDisabled = false;
  status = false;
  hasError = false;

  options = [
    { value: '1', label: 'Opção 1' },
    { value: '2', label: 'Opção 2' },
    { value: '3', label: 'Opção 3', disabled: true },
    { value: '4', label: 'Opção 4' },
    { value: '5', label: 'Opção 5' },
  ];

  optionsInput = 'Opção 1, Opção 2';

  get selectedLabel(): string {
    if (!this.selected) {
      return 'nenhum';
    }
    const opt = this.options.find((o) => o.value === this.selected);
    return opt ? opt.label : 'nenhum';
  }

  updateOptions() {
    this.options = this.optionsInput.split(',').map((label, idx) => ({
      value: String(idx + 1),
      label: label.trim(),
    }));
  }
}

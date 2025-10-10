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
  styleUrls: ['./app.scss']
})
export class AppComponent {
  options = [
    { value: '1', label: 'Opção 1' },
    { value: '2', label: 'Opção 2' },
    { value: '3', label: 'Opção 3', disabled: true }
  ];
  selectedValue?: string;
  switchValue = false;

  darkMode = false;
  toggleTheme() {
    this.darkMode = !this.darkMode;
  }
}

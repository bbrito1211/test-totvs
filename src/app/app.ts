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
   darkMode = false;
   selected?: string;
   placeholder = 'Selecione';
   selectDisabled = false;
   status = false;
   switchDisabled = false;
   options = [
     { value: '1', label: 'Opção 1' },
     { value: '2', label: 'Opção 2' }
   ];
   optionsInput = 'Opção 1, Opção 2';
 
   toggleTheme() {
     this.darkMode = !this.darkMode;
     document.body.classList.toggle('dark-mode', this.darkMode);
   }
 
   updateOptions() {
     this.options = this.optionsInput.split(',').map((label, idx) => ({
       value: String(idx + 1),
       label: label.trim()
     }));
   }
}

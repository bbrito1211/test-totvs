import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app';
import { FormsModule } from '@angular/forms';
import { UiSelectComponent } from './components/ui-select/ui-select.component';
import { UiSwitchComponent } from './components/ui-switch/ui-switch.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, FormsModule, UiSelectComponent, UiSwitchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render select with initial options', () => {
  const selectEl: HTMLSelectElement = fixture.debugElement.query(By.css('select')).nativeElement;

  
  expect(selectEl.options.length).toBe(6);

  expect(selectEl.options[0].textContent?.trim()).toBe('Selecione');
  expect(selectEl.options[1].textContent?.trim()).toBe('Opção 1');
  expect(selectEl.options[2].textContent?.trim()).toBe('Opção 2');
});

  it('should update selected value when user changes select', () => {
    const selectEl: HTMLSelectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    selectEl.value = selectEl.options[1].value; 
    selectEl.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.selected).toBe('1');
  });

  it('should disable select when selectDisabled = true', () => {
    component.selectDisabled = true;
    fixture.detectChanges();
    const selectEl: HTMLSelectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    expect(selectEl.disabled).toBe(true);
  });

  it('should toggle switch value when clicked', () => {
    const switchBtn = fixture.debugElement.query(By.css('button.switch'));
    expect(component.status).toBe(false);

    switchBtn.triggerEventHandler('click');
    fixture.detectChanges();

    expect(component.status).toBe(true);
  });

  it('should disable switch when switchDisabled = true', () => {
    component.switchDisabled = true;
    fixture.detectChanges();

    const switchBtn = fixture.debugElement.query(By.css('button.switch')).nativeElement;
    expect(switchBtn.disabled).toBe(true);
  });

  it('should update options when updateOptions() is called', () => {
    component.optionsInput = 'Primeira, Segunda, Terceira';
    component.updateOptions();
    fixture.detectChanges();

    expect(component.options.length).toBe(3);
    expect(component.options[0].label).toBe('Primeira');
    expect(component.options[2].label).toBe('Terceira');
  });

  it('should trim spaces when updating options', () => {
    component.optionsInput = ' A ,   B , C ';
    component.updateOptions();
    fixture.detectChanges();

    expect(component.options[0].label).toBe('A');
    expect(component.options[1].label).toBe('B');
    expect(component.options[2].label).toBe('C');
  });
});

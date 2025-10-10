import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiSelectComponent } from './ui-select.component';
import { By } from '@angular/platform-browser';

describe('UiSelectComponent', () => {
  let component: UiSelectComponent;
  let fixture: ComponentFixture<UiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show placeholder by default', async () => {
    component.placeholder = 'Selecione';
    fixture.detectChanges();
    await fixture.whenStable();

    const trigger = fixture.debugElement.query(By.css('.select-trigger'));
    expect(trigger).toBeTruthy();
    expect(trigger.nativeElement.textContent).toContain('Selecione');
  });

  it('should open options when trigger is clicked', async () => {
    component.options = [
      { value: '1', label: 'Opção 1' },
      { value: '2', label: 'Opção 2' },
    ];
    fixture.detectChanges();
    await fixture.whenStable();

    const trigger = fixture.debugElement.query(By.css('.select-trigger'));
    expect(trigger).toBeTruthy();

    trigger.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const options = fixture.debugElement.queryAll(By.css('.select-options li'));
    expect(options.length).toBe(2);
  });

  it('should select option and close list', () => {
    component.options = [
      { value: '1', label: 'Opção 1' },
      { value: '2', label: 'Opção 2' },
    ];
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.css('.select-trigger')).nativeElement;
    trigger.click();
    fixture.detectChanges();

    const firstOption = fixture.debugElement.query(By.css('.select-options li')).nativeElement;
    firstOption.click();
    fixture.detectChanges();

    expect(component.value).toBe('1');
    expect(component.open).toBe(false);
    expect(trigger.textContent).toContain('Opção 1');
  });

  it('should not select if option is disabled', () => {
    component.options = [
      { value: '1', label: 'Ativo' },
      { value: '2', label: 'Desabilitado', disabled: true },
    ];
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.css('.select-trigger')).nativeElement;
    trigger.click();
    fixture.detectChanges();

    const disabledOption = fixture.debugElement.queryAll(By.css('.select-options li'))[1]
      .nativeElement;
    disabledOption.click();
    fixture.detectChanges();

    expect(component.value).toBeUndefined();
  });

  it('should not open if select is disabled', () => {
    component.disabled = true;
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.css('.select-trigger')).nativeElement;
    trigger.click();
    fixture.detectChanges();

    expect(component.open).toBe(false);
  });

  it('should return placeholder when no value is selected', () => {
    component.options = [
      { value: '1', label: 'Opção 1' },
      { value: '2', label: 'Opção 2' },
    ];
    component.value = undefined;
    fixture.detectChanges();

    expect(component.selectedLabel).toBe(component.placeholder);
  });

  it('should not open when disabled and toggle is called', () => {
    component.disabled = true;
    component.open = false;
    fixture.detectChanges();

    component.toggle();

    expect(component.open).toBe(false);
  });
});

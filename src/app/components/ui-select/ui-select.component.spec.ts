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

  it('should render placeholder when no value selected', () => {
    const selectEl: HTMLSelectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    expect(selectEl.value).toBe('');
    expect(selectEl.options[0].textContent?.trim()).toBe('Choose an option');
  });

  it('should update value when an option is selected', () => {
    component.options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
    ];
    fixture.detectChanges();

    const selectEl: HTMLSelectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    selectEl.value = selectEl.options[1].value; 
    selectEl.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.value).toBe('1');
  });

  it('should call onChange and onTouched when selection changes', () => {
    const onChangeSpy = jest.fn();
    const onTouchedSpy = jest.fn();
    component.registerOnChange(onChangeSpy);
    component.registerOnTouched(onTouchedSpy);

    component.options = [{ value: '1', label: 'Option 1' }];
    fixture.detectChanges();

    const selectEl: HTMLSelectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    selectEl.value = '1';
    selectEl.dispatchEvent(new Event('change'));

    expect(onChangeSpy).toHaveBeenCalledWith('1');
    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should disable select when disabled=true', () => {
    component.disabled = true;
    fixture.detectChanges();

    const selectEl: HTMLSelectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    expect(selectEl.disabled).toBe(true);
  });

  it('should update disabled state through setDisabledState', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBe(true);

    component.setDisabledState(false);
    expect(component.disabled).toBe(false);
  });

  it('should render options with disabled attribute when provided', () => {
    component.options = [
      { value: '1', label: 'Option 1', disabled: true },
      { value: '2', label: 'Option 2' },
    ];
    fixture.detectChanges();

    const optionEls: HTMLOptionElement[] = fixture.debugElement.queryAll(By.css('option')).map(o => o.nativeElement);
    expect(optionEls[0].disabled).toBe(true);
    expect(optionEls[1].disabled).toBe(true);
  });

  it('should apply error class when error=true', () => {
    component.error = true;
    fixture.detectChanges();

    const wrapper = fixture.debugElement.query(By.css('.select-wrapper')).nativeElement;
    expect(wrapper.classList).toContain('error');
  });

  it('should not have error class when error=false', () => {
    component.error = false;
    fixture.detectChanges();

    const wrapper = fixture.debugElement.query(By.css('.select-wrapper')).nativeElement;
    expect(wrapper.classList).not.toContain('error');
  });

  it('should set value via writeValue', () => {
    component.writeValue('2');
    expect(component.value).toBe('2');
  });
});

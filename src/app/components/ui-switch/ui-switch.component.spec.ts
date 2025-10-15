import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiSwitchComponent } from './ui-switch.component';
import { By } from '@angular/platform-browser';

describe('UiSwitchComponent', () => {
  let component: UiSwitchComponent;
  let fixture: ComponentFixture<UiSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiSwitchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle value when clicked if not disabled', () => {
    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click');
    fixture.detectChanges();
    expect(component.value).toBe(true);

    btn.triggerEventHandler('click');
    fixture.detectChanges();
    expect(component.value).toBe(false);
  });

  it('should not toggle when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click');
    fixture.detectChanges();

    expect(component.value).toBe(false);
  });

  it('should write value from form control', () => {
    component.writeValue(true);
    expect(component.value).toBe(true);

    component.writeValue(false);
    expect(component.value).toBe(false);
  });

  it('should call onChange and onTouched when toggled', () => {
    const onChangeSpy = jest.fn();
    const onTouchedSpy = jest.fn();
    component.registerOnChange(onChangeSpy);
    component.registerOnTouched(onTouchedSpy);

    component.toggle();

    expect(onChangeSpy).toHaveBeenCalledWith(true);
    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should update disabled state from form control', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBe(true);

    component.setDisabledState(false);
    expect(component.disabled).toBe(false);
  });

  it('should toggle with Enter key', () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.handleKeydown(event);
    expect(component.value).toBe(true);
  });

  it('should toggle with Space key', () => {
    const event = new KeyboardEvent('keydown', { key: ' ' });
    component.handleKeydown(event);
    expect(component.value).toBe(true);
  });

  it('should not toggle with other keys', () => {
    component.value = false;
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    component.handleKeydown(event);
    expect(component.value).toBe(false);
  });

  it('should not toggle with keyboard if disabled', () => {
    component.disabled = true;
    component.value = false;

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.handleKeydown(event);

    expect(component.value).toBe(false);
  });
});

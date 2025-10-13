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

  it('should create', async () => {
    await fixture.whenStable();
    expect(component).toBeTruthy();
  });

  it('should be off by default', async () => {
    await fixture.whenStable();
    const buttonDe = fixture.debugElement.query(By.css('button[role="switch"]'));
    expect(buttonDe).toBeTruthy();

    const button = buttonDe.nativeElement as HTMLButtonElement;
    expect(component.value).toBe(false);
    expect(button.getAttribute('aria-checked')).toBe('false');
  });

  it('should toggle ON when clicked', async () => {
    await fixture.whenStable();
    const buttonDe = fixture.debugElement.query(By.css('button[role="switch"]'));
    const button = buttonDe.nativeElement as HTMLButtonElement;

    button.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.value).toBe(true);
    expect(button.getAttribute('aria-checked')).toBe('true');
  });

  it('should toggle OFF when clicked twice', async () => {
    await fixture.whenStable();
    const buttonDe = fixture.debugElement.query(By.css('button[role="switch"]'));
    const button = buttonDe.nativeElement as HTMLButtonElement;

    button.click();
    fixture.detectChanges();
    await fixture.whenStable();

    button.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.value).toBe(false);
    expect(button.getAttribute('aria-checked')).toBe('false');
  });

  it('should not toggle when disabled', async () => {
    component.disabled = true;
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonDe = fixture.debugElement.query(By.css('button[role="switch"]'));
    const button = buttonDe.nativeElement as HTMLButtonElement;

    button.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.value).toBe(false);
    expect(button.getAttribute('aria-checked')).toBe('false');
  });

  it('should not toggle when toggle() is called and component is disabled', () => {
    component.disabled = true;
    component.value = false;

    component.toggle();

    expect(component.value).toBe(false);
  });
});

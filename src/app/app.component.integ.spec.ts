import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser'; // This import is necessary for the By class
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent]  // Import the standalone AppComponent
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('My To Do List');
  });

  it('should add a new item when addItem is called', () => {
    const initialLength = component.allItems.length;
    component.addItem('work');
    fixture.detectChanges();
    expect(component.allItems.length).toBe(initialLength + 1);
    expect(component.allItems[0].description).toEqual('work');
  });

  it('should not add an empty item', () => {
    const initialLength = component.allItems.length;
    component.addItem('');
    fixture.detectChanges();
    expect(component.allItems.length).toBe(initialLength);
  });

  it('should filter items based on the "done" status', () => {
    component.filter = 'done';
    fixture.detectChanges();
    const doneItems = component.items.filter(item => item.done);
    expect(component.items.length).toEqual(doneItems.length);
  });

  it('should filter items to show only active tasks', () => {
    component.filter = 'active';
    fixture.detectChanges();
    const activeItems = component.items.filter(item => !item.done);
    expect(component.items.length).toEqual(activeItems.length);
  });

  it('should change filter when filter buttons are clicked', () => {
    const allButton = fixture.debugElement.query(By.css('.btn-wrapper button:first-child'));
    const activeButton = fixture.debugElement.query(By.css('.btn-wrapper button:nth-child(2)'));
    const doneButton = fixture.debugElement.query(By.css('.btn-wrapper button:nth-child(3)'));

    activeButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.filter).toBe('active');

    doneButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.filter).toBe('done');

    allButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.filter).toBe('all');
  });
});

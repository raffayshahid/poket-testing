import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AppComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new item correctly', () => {
    component.addItem('test');
    expect(component.allItems.length).toBe(5);
    expect(component.allItems[0].description).toBe('test');
    expect(component.allItems[0].done).toBeFalse();
  });

  it('should remove an item correctly', () => {
    const itemToRemove = component.allItems[1];
    component.remove(itemToRemove);
    expect(component.allItems.includes(itemToRemove)).toBeFalse();
  });

  it('should filter items correctly', () => {
    expect(component.items.length).toBe(3); // Active items
    component.filter = 'done';
    expect(component.items.length).toBe(1); // Done items
  });
});

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';

describe('AppComponent Integration', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, ItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should add a new item and display it', () => {
    const initialItemCount = app.items.length;
    app.addItem('New task');
    fixture.detectChanges();

    expect(app.items.length).toBe(initialItemCount + 1);

    const items = fixture.debugElement.queryAll(By.directive(ItemComponent));
    expect(items.length).toBe(initialItemCount + 1);
    expect(items[0].componentInstance.item.description).toEqual('New task'); // Check the first item added
  });

  it('should remove an item', () => {
    const initialItemCount = app.items.length;
    app.addItem('Task to remove');
    fixture.detectChanges();

    const removeIndex = app.items.findIndex(item => item.description === 'Task to remove');
    const itemComponent = fixture.debugElement.queryAll(By.directive(ItemComponent))[removeIndex];
    const removeButton = itemComponent.query(By.css('.btn-warn'));

    removeButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(app.items.length).toBe(initialItemCount);
  });
});

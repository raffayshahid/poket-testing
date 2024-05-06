import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ AppComponent, ItemComponent ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should have a default filter of "all"', () => {
    expect(app.filter).toEqual('all');
  });

  it('should add an item', () => {
    const initialItemCount = app.items.length;
    app.addItem('Test item');
    fixture.detectChanges();
    expect(app.allItems.length).toBe(initialItemCount + 1);
  });

  it('should not add an empty item', () => {
    const initialItemCount = app.items.length;
    app.addItem('');
    fixture.detectChanges();
    expect(app.allItems.length).toBe(initialItemCount);
  });

  it('should remove an item', () => {
    const itemToRemove = app.allItems[0];
    app.remove(itemToRemove);
    fixture.detectChanges();
    expect(app.allItems.includes(itemToRemove)).toBeFalse();
  });


  describe('items getter', () => {
    it('should return all items if filter is "all"', waitForAsync(() => {
      app.filter = 'all';
      fixture.detectChanges();
      expect(app.items.length).toBe(4);
    }));

    it('should return only done items if filter is "done"', waitForAsync(() => {
      app.filter = 'done';
      fixture.detectChanges();
      const doneItems = app.items.filter(item => item.done);
      expect(doneItems.length).toBe(1);
    }));

    it('should return only active items if filter is "active"', waitForAsync(() => {
      app.filter = 'active';
      fixture.detectChanges();
      const activeItems = app.items.filter(item => !item.done);
      expect(activeItems.length).toBe(3);
    }));
  });
});

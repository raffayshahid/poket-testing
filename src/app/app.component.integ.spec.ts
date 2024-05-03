import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';

describe('AppComponent Integration', () => {
  let appFixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, ItemComponent],
      imports: []
    }).compileComponents();

    appFixture = TestBed.createComponent(AppComponent);
    appComponent = appFixture.componentInstance;
    appFixture.detectChanges();
  });

  it('should add and remove an item correctly with child component interaction', () => {
    appComponent.addItem('integration test');
    appFixture.detectChanges();

    const itemCountPreRemove = appComponent.items.length;
    const removeButton = appFixture.nativeElement.querySelector('.btn-warn');
    removeButton.click();
    appFixture.detectChanges();

    expect(appComponent.items.length).toBe(itemCountPreRemove - 1);
  });
});

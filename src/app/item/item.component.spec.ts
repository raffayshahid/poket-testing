import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemComponent } from './item.component';
import { Item } from '../item';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let mockItem: Item;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;

    mockItem = { description: 'initial', done: false };
    component.item = mockItem;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit remove event when remove is called', () => {
    spyOn(component.remove, 'emit');
    component.remove.emit(mockItem);
    expect(component.remove.emit).toHaveBeenCalledWith(mockItem);
  });

  it('should save item and turn off editable mode', () => {
    component.saveItem('new description');
    expect(component.item.description).toBe('new description');
    expect(component.editable).toBeFalse();
  });
});

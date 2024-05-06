describe('Angular Todo App', () => {
    beforeEach(() => {
      browser.get('http://localhost:4200/'); // Adjust this URL to where your app is being served
    });
  
    it('should add a new todo', () => {
      let addInput = element(by.css('#newItem'));
      let addButton = element(by.css('.btn-primary'));
  
      addInput.sendKeys('New Todo Item');
      addButton.click();
  
      let todoList = element.all(by.css('ul li'));
      expect(todoList.last().getText()).toEqual('New Todo Item');
    });
  
    it('should display the correct number of todos', () => {
      let initialCount;
      let todoList = element.all(by.css('ul li'));
      todoList.count().then((count) => {
        initialCount = count;
      });
  
      let addInput = element(by.css('#newItem'));
      let addButton = element(by.css('.btn-primary'));
  
      addInput.sendKeys('Another Todo Item');
      addButton.click();
  
      expect(todoList.count()).toBe(initialCount + 1);
    });
  });
  
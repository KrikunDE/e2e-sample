describe('todo list', function() {

// ToDo locators
var remaining = element(by.xpath("/html/body/div/footer/div"));
var inputForm = element(by.css("#new-todo"));
var todoapp = element(by.css("#todoapp "));
var placeholder = element(by.css(":placeholder-shown"));
var loginURL = "https://twelfthman.co/interview-tests/qa/" ;

// 'mark all' element with checkbox
var markAll = element(by.css("#main div.mark-all label"));
var markAllOff = element(by.xpath("//div[@style='display: none;']"));
var markAllcheckbox = element(by.xpath("//*[@id='toggle-all']"));

// clear button
var clearButton = element(by.css("#clear-completed > span")); 
var clearButtonOff = element(by.xpath("//a[@style='display: none;']")); 

// Tasks locators
var task1Text = element(by.xpath("/html/body/div/section/ul/li/div/span"));
var task1TextOFF = element(by.xpath("//*[@class='done-true']"));

var task2Text = element(by.xpath("/html/body/div/section/ul/li[2]/div/span"));
var task2TextOFF = element(by.xpath("//li[2]/div/span[@class='done-true']"));

var task3Text = element(by.xpath("/html/body/div/section/ul/li[3]/div/span"));
var task3TextOFF = element(by.xpath("//li[3]/div/span[@class='done-true']"));

var task1Checkbox = element(by.xpath("//div/input [@ng-model='todo.done']"));
var task2Checkbox = element(by.xpath("//li[2]/div/input [@ng-model='todo.done']"));
var task3Checkbox = element(by.xpath("//li[3]/div/input [@ng-model='todo.done']"));

// some functions

function pressEnter () {
        browser.actions()
           .sendKeys(protractor.Key.ENTER )
             .perform();
}

  function verifyAllClean () {
        expect(task1Text.isPresent()).not.toBe(true);
        expect(task1Checkbox.isPresent()).not.toBe(true);
        expect(task2Checkbox.isPresent()).not.toBe(true);
        expect(task3Checkbox.isPresent()).not.toBe(true);        
        expect(clearButtonOff.isPresent()).toBe(true);
        expect(markAllOff.isPresent()).toBe(true);
        expect(remaining.getText()).toEqual("0 of 0 remaining");
}

function createThreeToDos () {
var i = 1
   while (i < 4) {
   	    inputForm.sendKeys("Test "+ i);
   	    pressEnter();
   	    expect(markAll.getText()).toEqual("Mark all as complete");
        expect(remaining.getText()).toEqual(i+ " of " +i + " remaining");
        expect(markAllcheckbox.isSelected()).not.toBe(true);
   i++;
   }
}


    it('should show the correct page heading', function()
    {
        browser.get('http://twelfthman.co/interview-tests/qa/');
        expect(element(by.css('h1')).getText()).toEqual('To Do List');

    });

    // Add more tests here

    it('should confirm that SSL certificate is active (HTTPS except HTTP) ', function()
    {
        expect(browser.getCurrentUrl()).toEqual(loginURL);
     });


 it('should show that title is verified, "0 of 0 remaining", inputform, todo app form and placeholder are on the screen', function()
    {
        expect(remaining.getText()).toEqual("0 of 0 remaining");
        expect(inputForm.isPresent()).toBe(true);
        expect(todoapp.isPresent()).toBe(true);
        expect(placeholder.isPresent()).toBe(true);
        expect(browser.getTitle()).toEqual('TM QA Test');
    });

 it('should add a single ToDo "Test 1", check elements and delete "Test 1" from ToDo list', function()
    {

// add new single task

        inputForm.sendKeys("Test 1");
        pressEnter();
        expect(markAll.getText()).toEqual("Mark all as complete");
        expect(remaining.getText()).toEqual("1 of 1 remaining");
        expect(task1Text.getText()).toEqual("Test 1");
        expect(task1Checkbox.isSelected()).not.toBe(true);

// mark element task as complete

        task1Checkbox.click();
        expect(remaining.getText()).toEqual("0 of 1 remaining");
        expect(clearButton.getText()).toEqual("1 item");
        expect(task1TextOFF.isPresent()).toBe(true);
        expect(task1Checkbox.isSelected()).toBe(true);

// delelte task and check elements

        clearButton.click();
        verifyAllClean();
    });


 it ('should add three new tasks, mark few, mark all, check elements and delete all tasks from ToDo list', function()
    {

// add three tasks

        createThreeToDos ();
        expect(task1Checkbox.isSelected()).not.toBe(true);
        expect(task2Checkbox.isSelected()).not.toBe(true);
        expect(task3Checkbox.isSelected()).not.toBe(true);


// mark 2,3 elelements

        task2Checkbox.click();
        task3Checkbox.click();

        expect(remaining.getText()).toEqual("1 of 3 remaining");
        expect(clearButton.getText()).toEqual("2 items");

        expect(task2TextOFF.isPresent()).toBe(true);
        expect(task3TextOFF.isPresent()).toBe(true);

        expect(task2Checkbox.isSelected()).toBe(true);
        expect(task3Checkbox.isSelected()).toBe(true);

// mark as done all task

        markAll.click();
        expect(markAllcheckbox.isSelected()).toBe(true);

// make sure all tesks were marked as done

        expect(task1TextOFF.isPresent()).toBe(true);
        expect(task2TextOFF.isPresent()).toBe(true);
        expect(task3TextOFF.isPresent()).toBe(true);

// delete all tasks and check all elements

        clearButton.click();
        verifyAllClean();

    });


    it('should check the "mark all" element checkbox behaviour', function()
    {
      createThreeToDos ();
      markAll.click(); // need to make it OFF first
      markAll.click();
      expect(markAllcheckbox.isSelected()).toBe(true);

      task2Checkbox.click(); //unmark task 2
      task3Checkbox.click(); //unmark task 3
      expect(task2Checkbox.isSelected()).toBe(true);
      expect(task3Checkbox.isSelected()).toBe(true);
      expect(markAllcheckbox.isSelected()).not.toBe(true); //the issued area, checkbox should be unmarked, we have a bug here.

    });

});

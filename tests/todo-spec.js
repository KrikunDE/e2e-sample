describe('todo list', function() {

    it('should show the correct page heading', function()
    {
        browser.get('http://twelfthman.co/interview-tests/qa/');

        expect(element(by.css('h1')).getText()).toEqual('To Do List');
    });

    // Add more tests here

});

describe('todo list header', function() { 

    it('should show the correct page title', function()
    {
        browser.get('http://twelfthman.co/interview-tests/qa/');
        expect(element(by.css('title')).getText()).toEqual('tTM QA Test');
    });





});


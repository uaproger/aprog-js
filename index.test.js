const myLibrary = require('./index');
const test = require("node:test");

test('should log "Hello, world!"', () => {
    console.log = jest.fn();
    myLibrary();
    expect(console.log).toHaveBeenCalledWith('Hello, world!');
});
const myLibrary = require('./index');

test('should log "Hello, world!"', () => {
    console.log = jest.fn();
    myLibrary();
    expect(console.log).toHaveBeenCalledWith('Hello, world!');
});
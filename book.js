const myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = false;
}

Book.prototype.info = function () {
  return `${this.title} | ${this.author} | ${this.pages} | ${this.read ? "Read" : "Not Read"}`;
};

const book = new Book("The Hobbit", "John Ronald Reuel Tolkien", "5166");

console.log(book.info());

const myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = false;
  this.uuid = crypto.randomUUID();
}

Book.prototype.info = function () {
  let info = [];
  for (property in this) {
    if (!(typeof this[property] === "function")) {
      info.push(this[property]);
    }
  }
  return info.join("\n");
};

function addBookToLibrary(title, author, pages) {
  const book = new Book(title, author, pages);
  myLibrary.append(book);
}

console.log(new Book("hobbit", "goblin", "3").info());

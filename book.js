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
  myLibrary.push(book);
  console.log(myLibrary);
}

const newBookBtn = document.querySelector("#new-book-btn");

const dialog = document.querySelector(".modal");
const dialogClose = document.querySelector(".modal-close");

const addBookBtn = document.getElementById("add-book-btn");

newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

dialogClose.addEventListener("click", () => {
  dialog.close();
});

// Form
const formTitle = document.getElementById("book-title");
const formAuthor = document.getElementById("book-author");
const formPages = document.getElementById("book-pages");

addBookBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const title = formTitle.value;
  const author = formAuthor.value;
  const pages = formPages.value;

  addBookToLibrary(title, author, pages);
});

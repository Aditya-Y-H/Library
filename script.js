// Library

const myLibrary = [];

function addBookToLibrary(book) {
  myLibrary.push(book);
}

// Book Implementation

function Book(title, synopsis, author, pages, read) {
  if (!new.target) {
    throw Error("Object must be constructed with 'new' keyword.");
  }

  this.title = title;
  this.synposis = synopsis;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.uuid = crypto.randomUUID();
}

Book.prototype.info = function () {
  const info = [];
  for (let property of this) {
    if (this[property] !== "function") {
      info.push(this[property]);
    }
  }
  return info;
};

// DOM Interaction

// Add Book Modal

const addBookBtn = document.getElementById("add-book-btn");
const addBookModal = document.getElementById("add-book-modal");
addBookBtn.addEventListener("click", (event) => {
  addBookModal.showModal();
});

// Add Book Form

const submitBookBtn = document.getElementById("submit-book-btn");

const form = {
  title: document.getElementById("title-input"),
  synposis: document.getElementById("synopsis-input"),
  author: document.getElementById("author-input"),
  pages: document.getElementById("pages-input"),
  read: document.getElementById("read-input"),
};

submitBookBtn.addEventListener("click", (event) => {
  for (let data in form) {
    if (!form[data].validity.valid) {
      return;
    }
  }

  const book = new Book(
    form.title.value,
    form.synposis.value,
    form.author.value,
    form.pages.value,
    form.read.value,
  );

  addBookToLibrary(book);
  addBookModal.close();
  event.preventDefault();
});

// Display Book Form

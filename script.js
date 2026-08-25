// Library

let myLibrary = [];

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function getBook(id) {
  for (let book of myLibrary) {
    if (book.uuid === id) {
      return book;
    }
  }
}

function deleteBook(id) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].uuid === id) {
      myLibrary = myLibrary.slice(0, i).concat(myLibrary.slice(i + 1));
      return;
    }
  }
}

// Book Implementation

function Book(title, synopsis, author, pages, read) {
  if (!new.target) {
    throw Error("Object must be constructed with 'new' keyword.");
  }

  this.title = title;
  this.synopsis = synopsis;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.uuid = crypto.randomUUID();
}

Book.prototype.info = function () {
  const info = [];
  for (let property in this) {
    // console.log(this, property, this[property]);
    if (typeof this[property] !== "function") {
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
  synopsis: document.getElementById("synopsis-input"),
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
    form.synopsis.value,
    form.author.value,
    form.pages.value,
    form.read.checked,
  );

  console.log(book.read);

  addBookToLibrary(book);
  addBookModal.close();
  event.preventDefault();
  displayLibrary();
});

// Display Book Form

const booksCardContianer = document.getElementById("books-card-container");

const svg =
  '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>';

function toggleRead(id, element, toggleClass) {
  const book = getBook(id);
  if (book !== null || !book !== undefined) {
    book.read = !book.read;
    element.textContent = book.read ? "Mark Unfinished" : "Mark Finished";
    element.classList.toggle(toggleClass);
  }
}

function displayLibrary() {
  booksCardContianer.innerHTML = "";
  for (let book of myLibrary) {
    let card = document.createElement("div");
    card.classList.add("books-card");

    let uuid = document.createElement("p");
    uuid.setAttribute("hidden", "hidden");
    uuid.classList.add("uuid");
    uuid.textContent = book.uuid;
    card.appendChild(uuid);

    let title = document.createElement("p");
    title.classList.add("title");
    title.textContent = book.title;
    card.appendChild(title);

    let deleteBtnContainer = document.createElement("div");
    deleteBtnContainer.classList.add("delete");
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = svg;
    deleteBtn.addEventListener("click", (event) => {
      deleteBook(book.uuid);
      displayLibrary();
    });
    deleteBtnContainer.appendChild(deleteBtn);
    card.appendChild(deleteBtnContainer);

    let synopsis = document.createElement("div");
    synopsis.classList.add("synopsis");
    let synopsisHeader = document.createElement("p");
    synopsisHeader.textContent = "Synopsis";
    synopsis.appendChild(synopsisHeader);
    let synopsisPara = document.createElement("p");
    synopsisPara.textContent = book.synopsis;
    synopsis.appendChild(synopsisPara);
    card.appendChild(synopsis);

    let read = document.createElement("div");
    read.classList.add("read");
    let readBtn = document.createElement("button");
    readBtn.textContent = book.read ? "Mark Unfinished" : "Mark Finished";
    book.read ? readBtn.classList.add("finished") : false;
    readBtn.addEventListener("click", (event) => {
      toggleRead(book.uuid, event.target, "finished");
    });
    read.appendChild(readBtn);
    card.appendChild(read);

    let author = document.createElement("p");
    author.classList.add("author");
    author.textContent = book.author;
    card.appendChild(author);

    let pages = document.createElement("p");
    pages.classList.add("pages");
    pages.textContent = book.pages;
    pages.setAttribute("title", "Number of Pages");
    card.appendChild(pages);

    booksCardContianer.appendChild(card);
  }
}

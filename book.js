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
  return info;
};

function addBookToLibrary(title, author, pages) {
  const book = new Book(title, author, pages);
  myLibrary.push(book);
  console.log(myLibrary);
}

const tableBody = document.querySelector("#library-table tbody");

function displayLibrary() {
  for (book of myLibrary) {
    let row = document.createElement("tr");
    for (data of book.info()) {
      let cell = document.createElement("td");
      cell.textContent = data;
      row.appendChild(cell);
    }
    tableBody.appendChild(row);
  }
}

const newBookBtn = document.querySelector("#new-book-btn");

const dialog = document.querySelector(".modal");
const dialogClose = document.querySelector(".modal-close");

const addBookBtn = document.getElementById("add-book-btn");

newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

dialogClose.addEventListener("click", () => {
  event.preventDefault();
  dialog.close();
});

// Form
const formTitle = document.getElementById("book-title");
const formAuthor = document.getElementById("book-author");
const formPages = document.getElementById("book-pages");

addBookBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  const title = formTitle.value;
  const author = formAuthor.value;
  const pages = formPages.value;

  for (value of [title, author, pages]) {
    if (!value || value === null || value === undefined) {
      showPopup(`Input cannot be empty.`, "error");
      return;
    }
  }
  if (pages <= 0) {
    showPopup(`Number of pages cannot be less than 1.`, "error");
    return;
  }

  const book = addBookToLibrary(title, author, pages);

  displayLibrary();

  showPopup(`${book} successfully add to library.`, "success");
});

const addBookBtn = document.getElementById("add-book-btn");
const submitBookBtn = document.getElementById("submit-book-btn");

const addBookModal = document.getElementById("add-book-modal");

addBookBtn.addEventListener("click", (event) => {
  addBookModal.showModal();
});

const form = {
  title: document.getElementById("title-input"),
  synposis: document.getElementById("synopsis-input"),
  author: document.getElementById("author-input"),
  pages: document.getElementById("pages-input"),
  read: document.getElementById("read-input"),
};

submitBookBtn.addEventListener("click", (event) => {});

const myLibrary = [];

function Book(name, author, numOfPages, read) {
  // the constructor...
  this.id = crypto.randomUUID();
  this.name = name;
  this.author = author;
  this.numOfPages = numOfPages;
  this.read = read;
}
const addBookBtn = document.querySelector(".add-book-btn");
const cancelBtn = document.querySelector(".cancel-book");
const form = document.querySelector(".form");

addBookBtn.addEventListener("click", displayBook);
function displayBook() {
  form.style.display = "flex";
}
cancelBtn.addEventListener("click", clearBook);
function clearBook() {
  form.style.display = "none";
}

function addBookToLibrary() {
  // take params, create a book then store it in the array
  let name = document.querySelector("#book-name").value;
  let author = document.querySelector("#author-name").value;
  let numOfPages = document.querySelector("#pages-number").value;
  let read = document.querySelector("#read").checked;
  const books = new Book(name, author, numOfPages, read);
  myLibrary.push(books);
  renderBooks(books);
}

function resetForm() {
  name = document.querySelector("#book-name").value = "";
  author = document.querySelector("#author-name").value = "";
  numOfPages = document.querySelector("#pages-number").value = "";
  read = document.querySelector("#read").checked = false;
}

const yourLibrary = document.querySelector(".your-library");

function displaySectionHeading() {
  yourLibrary.style.display = myLibrary.length === 0 ? "none" : "block";
}

const submitBookBtn = document.querySelector(".submit-book");

submitBookBtn.addEventListener("click", function (event) {
  event.preventDefault();
  displaySectionHeading();
  addBookToLibrary();
  resetForm();
});

const booksContainer = document.querySelector(".books-container");

function renderBooks(books) {
  const book = books;
  // myLibrary.forEach((book, id) => {
  const card = document.createElement("div");
  card.className = "book-card";
  card.dataset.id = book.id;

  let deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "X";
  deleteBtn.dataset.id = book.id;

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // avoid event bubbling surprises
    const id = deleteBtn.dataset.id;
    deleteBookById(id);

    const delCard = e.currentTarget.closest(".book-card");
    if (delCard) delCard.remove();

    displaySectionHeading();
  });

  function deleteBookById(id) {
    // 1) remove from array
    const index = myLibrary.findIndex((b) => b.id === id);
    if (index > -1) myLibrary.splice(index, 1);

    console.log(myLibrary);
  }

  let bookName = document.createElement("p");
  bookName.className = "book-name render";
  bookName.textContent = "Title:" + " " + " " + book.name;

  let bookAuthor = document.createElement("p");
  bookAuthor.className = "book-author render";
  bookAuthor.textContent = "Author:" + " " + " " + book.author;

  let bookPages = document.createElement("p");
  bookPages.className = "book-pages render";
  bookPages.textContent = "Page Number:" + " " + " " + book.numOfPages;

  const readContainer = document.createElement("div");
  readContainer.className = "read-container";

  const label = document.createElement("label");
  label.textContent = "Read";
  label.className = "render check";
  const readStatus = document.createElement("input");
  readStatus.className = "read-status check";
  readStatus.type = "checkbox";
  readContainer.append(label, readStatus);

  readStatus.checked = book.read;

  card.append(deleteBtn, bookName, bookAuthor, bookPages, readContainer);
  booksContainer.appendChild(card);

  // });
}

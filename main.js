let myLibrary = [{
    author: "George R. R. Martin",
    title: "A Game of Thrones",
    pages: 694,
    read: true
}];

// DOM Objects
const newButton = document.querySelector('#new');
const table = document.querySelector('#table');
const tbody = document.querySelector('#table tbody');

const form = document.querySelector('#book-form');
const authorInput = document.querySelector('#author');
const titleInput = document.querySelector('#title');
const pagesInput = document.querySelector('#pages');
const readInput = document.querySelector('#read');

class Book {
    constructor(author, title, pages, read) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
    }
}

const addBookToLibrary = () => {
    const author = authorInput.value;
    const title = titleInput.value;
    const pages = pagesInput.value;
    const read = readInput.checked;
    const newBook = new Book(author, title, pages, read);
    myLibrary.push(newBook);
}

const updateLocalStorage = () => {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

const checkLocalStorage = () => {
    if (localStorage.getItem('myLibrary')) {
        myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    }
}

const clearForm = () => {
    authorInput.value = '';
    titleInput.value = '';
    pagesInput.value = '';
    readInput.checked = '';
}

const createDeleteTd = (index) => {
    const deleteTd = document.createElement('td');
    const deleteButton = document.createElement('tr');
    deleteButton.innerHTML = `<td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>`
    deleteButton.addEventListener('click', () => {
        myLibrary.splice(index, 1);
        updateTable();
    });
    deleteTd.appendChild(deleteButton);
    return deleteTd;
}

const createReadTd = (index) => {
    const readTd = document.createElement('td');
    const readButton = document.createElement('tr');
    if (myLibrary[index].read === true) {
        readButton.innerHTML =
            `
        <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
        </div>
        `
    } else {
        readButton.innerHTML = `
        <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox">
        </div>
        `;
    }
    readButton.addEventListener('click', () => {
        myLibrary[index];
        updateTable();
    });
    readTd.appendChild(readButton);
    return readTd;
}

const updateTable = () => {
    tbody.textContent = '';
    myLibrary.forEach((book, index) => {
        const row = document.createElement('tr');
        row.innerHTML =
            `
                <td>${book.author}</td>
                <td>${book.title}</td>
                <td>${book.pages}</td>
                `
        row.appendChild(createReadTd(index));
        row.appendChild(createDeleteTd(index));
        tbody.appendChild(row);
    });

    updateLocalStorage();
}

document.addEventListener('DOMContentLoaded', () => {
    checkLocalStorage();
    newButton.addEventListener('click', (e) => {
        e.preventDefault();
        addBookToLibrary();
        updateTable();
        clearForm();
    });

    updateTable();
});
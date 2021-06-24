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
    // const read = readInput.checked;
    const read = readStatus();
    const newBook = new Book(author, title, pages, read);
    myLibrary.push(newBook);
}

const readStatus = () => {
    if (readInput.checked === true) {
        console.log('checked');
        return true;
    } else {
        console.log('not checked');
        return false;
    }
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

const updateTable = () => {
    tbody.textContent = '';

    myLibrary.forEach((book, index) => {
        const row = document.createElement('tr');
        Object.keys(book).forEach(property => {
            const newTd = document.createElement('td');
            newTd.textContent = book[property];
            row.appendChild(newTd);
        });
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
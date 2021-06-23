let myLibrary = [{
    author: "George R. R. Martin",
    title: "A Game of Thrones",
    pages: 694,
    // read: false
}];

// DOM Objects
const newButton = document.querySelector('#new');
const table = document.querySelector('#table');
const tbody = document.querySelector('#table tbody');

const form = document.querySelector('#book-form');
let authorInput = document.querySelector('#author');
let titleInput = document.querySelector('#title');
let pagesInput = document.querySelector('#pages');
// readInput = document.querySelector('#read');

class Book {
    constructor(author, title, pages) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        // this.read = read;
    }
}

const addBookToLibrary = () => {
    let author = authorInput.value;
    let title = titleInput.value;
    let pages = pagesInput.value;
    // let read = getReadValue();
    let newBook = new Book(author, title, pages);
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

const removeFromLibrary = (index) => {
    myLibrary.splice(index, 1)
    newButton.removeEventListener('click', removeFromLibrary);
    updateTable();
}

const clearForm = () => {
    authorInput.value = '';
    titleInput.value = '';
    pagesInput.value = '';
}

const createDeleteTd = (index) => {
    let deleteTd = document.createElement('td');
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
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
        let row = document.createElement('tr');
        Object.keys(book).forEach(property => {
            let newTd = document.createElement('td');
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
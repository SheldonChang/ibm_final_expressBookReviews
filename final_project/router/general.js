const express = require('express');
let { getBooksByTitlePromise, getBooksByAuthorPromise,
    getBooksByIsbnPromise, getBooksPromise, books }
    = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        if (!isValid(username)) {
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registred." });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    return res.status(404).json({ message: "username or password is not provided." });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    return res.status(200).json({ "books": books });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const book = books[req.params.isbn];
    if (book) {
        return res.status(200).json(book);
    } else {
        return res.status(404).json({ message: `Book with isbn ${req.params.isbn} not found!` });
    }
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    let _books = [];
    Object.keys(books).map((o) => {
        if (books[o].author === author) {
            _books.push(books[o]);
        }
    })
    if (_books.length >= 1)
        return res.status(200).json(_books);
    else {
        res.status(404).json({ message: `Book with author ${author} not found!` })
    }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    let _books = [];
    Object.keys(books).map((o) => {
        if (books[o].title === title) {
            _books.push(books[o]);
        }
    })
    if (_books.length >= 1)
        return res.status(200).json(_books);
    else {
        res.status(404).json({ message: `Book with title ${title} not found!` })
    }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const book = books[req.params.isbn];
    if (book) {
        return res.status(200).json(book.reviews);
    } else {
        return res.status(404).json({ message: `Book with isbn ${req.params.isbn} not found!` });
    }
});

public_users.get('/books', async (req, res) => {
    const _books = await getBooksPromise();
    return res.status(200).json({ books: _books });
})

public_users.get('/books/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    getBooksByIsbnPromise(isbn)
        .then((_book) => res.status(200).json({ book: _book }))
        .catch((err) => res.status(404).json({ message: err }));
})

public_users.get('/books/author/:author', async (req, res) => {
    const author = req.params.author;
    getBooksByAuthorPromise(author)
        .then((_books) => res.status(200).json({ book: _books }))
        .catch((err) => res.status(404).json({ message: err }));
})


public_users.get('/books/title/:title', async (req, res) => {
    const title = req.params.title;
    getBooksByTitlePromise(title)
        .then((_books) => res.status(200).json({ book: _books }))
        .catch((err) => res.status(404).json({ message: err }));
})

module.exports.general = public_users;

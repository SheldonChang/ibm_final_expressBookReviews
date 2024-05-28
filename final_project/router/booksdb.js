let books = {
    1: { "author": "Chinua Achebe", "title": "Things Fall Apart", "reviews": {} },
    2: { "author": "Hans Christian Andersen", "title": "Fairy tales", "reviews": {} },
    3: { "author": "Dante Alighieri", "title": "The Divine Comedy", "reviews": {} },
    4: { "author": "Unknown", "title": "The Epic Of Gilgamesh", "reviews": {} },
    5: { "author": "Unknown", "title": "The Book Of Job", "reviews": {} },
    6: { "author": "Unknown", "title": "One Thousand and One Nights", "reviews": {} },
    7: { "author": "Unknown", "title": "Nj\u00e1l's Saga", "reviews": {} },
    8: { "author": "Jane Austen", "title": "Pride and Prejudice", "reviews": {} },
    9: { "author": "Honor\u00e9 de Balzac", "title": "Le P\u00e8re Goriot", "reviews": {} },
    10: { "author": "Samuel Beckett", "title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
}


function getBooksPromise() {
    return new Promise((res, rej) => {
        res(books);
    })
}

function getBooksByIsbnPromise(isbn) {
    return new Promise((res, rej) => {
        if (!isbn) rej(`isbn is required `);
        const book = books[isbn]
        if (!book) rej(`book with isbn ${isbn} not found.`);
        res(book);
    })
}

function getBooksByAuthorPromise(author) {
    return new Promise((res, rej) => {
        if (!author) rej(`author is required `);
        let _books = [];
        Object.keys(books).map((o) => {
            if (books[o].author === author) {
                _books.push(books[o]);
            }
        })
        if (_books.length >= 1)
            res(_books);
        else {
            rej(`Book with author ${author} not found!`)
        }
    })
}


function getBooksByTitlePromise(title) {
    return new Promise((res, rej) => {
        if (!title) rej(`title is required `);
        let _books = [];
        Object.keys(books).map((o) => {
            if (books[o].title === title) {
                _books.push(books[o]);
            }
        })
        if (_books.length >= 1)
            res(_books);
        else {
            rej(`Book with title ${title} not found!`)
        }
    })
}

module.exports = {
    getBooksByTitlePromise,
    getBooksByAuthorPromise,
    getBooksByIsbnPromise,
    getBooksPromise,
    books
}

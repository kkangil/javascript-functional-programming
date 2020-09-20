import {curry} from "../currying";
import {pipe} from "../pipe";

export class Either {
    constructor (val) {
        this.value = val;
    }
    static nothing (value) {
        return new Nothing(value);
    }

    static some(value) {
        return new Some(value);
    }
}

class Nothing extends Either {
    get isNothing() {
        return true;
    }

    get isSome() {
        return false;
    }

    map(fn) {
        return this;
    }
}

class Some extends Either {
    get isNothing() {
        return false;
    }

    get isSome() {
        return true;
    }
    map(fn) {
        return Some.some(fn(this.value));
    }
}

Either.some("test").map(x => x.toUpperCase());
Either.nothing("test").map(x => x.toUpperCase());

console.log(Either.some("Super").map(x => `${x}star`));
console.log(Either.nothing("Super").map(x => `${x}star`));

// 저자가 Axel 이 아닐경우 console.error 출력
const books = [
    { id: 'book1', title: 'coding with javascript', author: 'Chris Minnick, Eva Holland' },
    { id: 'book2', title: 'speaking javaScript', author: 'Axel Rauschmayer' },
];

export const either = curry((n, s, e) => {
    return e.isNothing ? n(e.value) : s(e.value);
});

const findBookById = curry((id, books) => {
    return books.find((book) => book.id === id);
});

const validateBookAuthor = (book) => {
    return book.author.indexOf('Axel') === -1
        ? Either.nothing(book)
        : Either.some(book);
};

const logBookAuthor = (book) => {
    console.log(`Author: ${book.author}`)
};

const logErrorBookAuthor = (book) => {
    console.error(`Author: ${book.author}`);
};

const bookAuthor = (bookId, books) => {
    return pipe(
        findBookById(bookId),
        validateBookAuthor,
        either(logErrorBookAuthor, logBookAuthor)
    )(books)
};


bookAuthor('book1', books);
bookAuthor('book2', books);

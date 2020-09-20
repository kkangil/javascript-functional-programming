import {curry} from "../currying";
import {pipe} from "../pipe";
import {EitherMonad} from "../Either/monad";

export class MayBeMonad {
    constructor(val) {
        this.value = val;
    }

    static of(value) {
        return new MayBeMonad(value);
    }

    get isNothing() {
        return this.value === null || this.value === undefined;
    }

    map(fn) {
        return this.isNothing ? MayBeMonad.of(null) : MayBeMonad.of(fn(this.value));
    }

    join() {
        return this.isNothing ? MayBeMonad.of(null) : this.value;
    }

    chain(fn) {
        return this.map(fn).join();
    }
}

const monadDouble = (value) => {
    return MayBeMonad.of(value + 1);
};

console.log(
    MayBeMonad
        .of(1)
        .map(monadDouble)
        .join()
);

// MayBeMonad {value: 2 }

console.log(
    MayBeMonad
        .of(1)
        .chain(monadDouble)
        .join()
);

// MayBeMonad 2

const books = [
    { id: 'book1', title: 'coding with javascript', author: 'Chris Minnick, Eva Holland' },
    { id: 'book2', title: 'speaking javaScript', author: 'Axel Rauschmayer' },
    { id: 'book3', title: 'speaking javaScript', author: 'Axel Rauschmayer' },
];

const findBookById = curry((books, id) => {
    console.log('books', books);
    return books.find((book) => book.id === id);
});

const validateTitleLength = (title) => {
    console.log('title', title);
    return title.length > 20 ? MayBeMonad.of(null) : MayBeMonad.of(title);
};

const validateAuthor = book => {
    console.log('validateAuthor', book);
    return book.author.indexOf('Axel') > -1 ? EitherMonad.some(book) : EitherMonad.nothing(null);
};

const getTitle = book => {
    console.log('getTitle', book);
    return book.chain(b => b.title);
};

const toUpperCase = value => {
    console.log('toUpperCase', value);
    return value.chain(x => x.toUpperCase());
};


const printAxelBookTitle = pipe(
    findBookById(books),
    validateAuthor,
    getTitle,
    validateTitleLength,
    toUpperCase,
    console.log
);

printAxelBookTitle('book2'); // SPEAKING JAVASCRIPT

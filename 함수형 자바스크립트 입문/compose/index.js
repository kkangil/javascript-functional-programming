import {reduce} from "../arrayUtils/reduce";
import {map} from "../arrayUtils/map";
import {filter} from "../arrayUtils/filter";
import {partial} from "../partial";

export const compose = (...fns) => value => reduce(fns.reverse(), (acc, fn) => fn(acc), value);

let addressBooks = [
    {
        id: 111,
        title: "C# 6.0",
        author: "ANDREW TROELSEN",
        rating: [4.7],
        reviews: [{ good: 4, excellent: 12 }]
    },
    {
        id: 222,
        title: "Efficient Learning Machines",
        author: "Rahul Khanna",
        rating: [4.5],
        reviews: []
    },
    {
        id: 333,
        title: "Pro Angular JS",
        author: "Adam Freeman",
        rating: [4.0],
        reviews: []
    },
    {
        id: 444,
        title: "Pro ASP.NET",
        author: "Adam Freeman",
        rating: [4.2],
        reviews: [{ good: 14, excellent: 12 }]
    }
];

const result = map(
    filter(addressBooks, (book) => book.rating[0] > 4.5),
    (book) => {
        return { title: book.title, author: book.author };
    }
);

console.log(result);

let filterOutStandingBooks = (book) => book.rating[0] === 5;
let filterGoodBooks = (book) => book.rating[0] > 4.5;
let filterBadBooks = (book) => book.rating[0] < 3.5;

let projectTitleAndAuthor = (book) => ({
    title: book.title,
    author: book.author
});
let projectAuthor = (book) => ({ author: book.author });
let projectTitle = (book) => ({ title: book.title });

let queryGoodBooks = partial(filter, undefined, filterGoodBooks);
let mapTitleAndAuthor = partial(map, undefined, projectTitleAndAuthor);
let titleAndAuthorForGoodBooks = compose(mapTitleAndAuthor, queryGoodBooks);

const result2 = titleAndAuthorForGoodBooks(addressBooks);
console.log(result2);

let splitIntoSpaces = (str) => str.split(" ");
let count = (array) => array.length;
const countWords = compose(count, splitIntoSpaces);

console.log(countWords("hello your reading about composition"));

let oddOrEven = (ip) => (ip % 2 === 0 ? "even" : "odd");
const oddOrEvenWords = compose(oddOrEven, count, splitIntoSpaces);
console.log(oddOrEvenWords("hello your reading about composition"));

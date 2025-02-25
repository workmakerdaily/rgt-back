"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.addBook = exports.getBookById = exports.getAllBooks = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query('SELECT * FROM books');
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching books', error: err });
    }
});
exports.getAllBooks = getAllBooks;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield db_1.default.query('SELECT * FROM books WHERE id = $1', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({ message: 'Book not found' });
        res.json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching book', error: err });
    }
});
exports.getBookById = getBookById;
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, description, price, stock } = req.body;
    try {
        const result = yield db_1.default.query('INSERT INTO books (title, author, description, price, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *', [title, author, description, price, stock]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ message: 'Error adding book', error: err });
    }
});
exports.addBook = addBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, author, description, price, stock } = req.body;
    try {
        const result = yield db_1.default.query('UPDATE books SET title=$1, author=$2, description=$3, price=$4, stock=$5 WHERE id=$6 RETURNING *', [title, author, description, price, stock, id]);
        if (result.rows.length === 0)
            return res.status(404).json({ message: 'Book not found' });
        res.json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ message: 'Error updating book', error: err });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield db_1.default.query('DELETE FROM books WHERE id=$1 RETURNING *', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted' });
    }
    catch (err) {
        res.status(500).json({ message: 'Error deleting book', error: err });
    }
});
exports.deleteBook = deleteBook;

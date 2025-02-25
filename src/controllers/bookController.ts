import { Request, Response } from 'express';
import pool from '../config/db';

export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM books');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching books', error: err });
    }
};

export const getBookById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Book not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching book', error: err });
    }
};

export const addBook = async (req: Request, res: Response) => {
    const { title, author, description, price, stock } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO books (title, author, description, price, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, author, description, price, stock]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error adding book', error: err });
    }
};

export const updateBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, author, description, price, stock } = req.body;
    try {
        const result = await pool.query(
            'UPDATE books SET title=$1, author=$2, description=$3, price=$4, stock=$5 WHERE id=$6 RETURNING *',
            [title, author, description, price, stock, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: 'Book not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error updating book', error: err });
    }
};

export const deleteBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM books WHERE id=$1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting book', error: err });
    }
};

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db';

export const signupUser = async (req: Request, res: Response) => {
    const { username, password, email } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
            [username, hashedPassword, email]
        );

        res.status(201).json({ message: 'User signup', user: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: 'Error signup user', error: err });
    }
};

export const signinUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user) return res.status(404).json({ message: 'User not found' });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, is_admin: user.is_admin }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        res.json({ message: 'Sign in', token });
    } catch (err) {
        res.status(500).json({ message: 'Sign in error', error: err });
    }
};
